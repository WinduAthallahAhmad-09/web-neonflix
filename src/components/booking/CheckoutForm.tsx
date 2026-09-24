"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import { useUserStore } from "@/store/userStore";
import { useWeb3Store } from "@/store/web3Store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { XP_PER_BOOKING, XP_PER_FOOD_ORDER } from "@/lib/constants";
import { NeonButton } from "@/components/ui/NeonButton";
import { soundFx } from "@/lib/soundFx";
import { CreditCard, Smartphone, ShieldCheck, Zap, Lock, QrCode } from "lucide-react";
import { BrowserProvider, Contract } from "ethers";
import { NEONFLIX_TICKETING_ABI, NEONFLIX_TICKETING_ADDRESS } from "@/lib/contracts";

interface CheckoutFormProps {
  showtimeId: string;
}

const PAYMENT_METHODS = [
  { id: "botchain", name: "BOT Chain Smart Contract", icon: <ShieldCheck size={18} />, badge: "WEB3" },
  { id: "gopay", name: "GoPay / QRIS Instant", icon: <Smartphone size={18} />, badge: "INSTANT" },
  { id: "cc", name: "Encrypted Credit / Debit", icon: <CreditCard size={18} />, badge: "SECURE" },
];

export function CheckoutForm({ showtimeId }: CheckoutFormProps) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("botchain");
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    movieTitle,
    cinemaName,
    date,
    time,
    studioName,
    studioType,
    selectedSeats,
    foodCart,
    totalTicketPrice,
    totalFoodPrice,
  } = useBookingStore();
  
  const { addXP, incrementBookings } = useUserStore();
  const { isConnected, connectWallet, chainId, switchToBotChain } = useWeb3Store();

  const serviceFee = 5000;
  const finalTotal = totalTicketPrice + totalFoodPrice + serviceFee;

  const handleSelectPayment = (id: string) => {
    soundFx.playClick();
    setPaymentMethod(id);
    setErrorMessage(null);
  };

  const handleConfirm = async () => {
    soundFx.playClick();
    setErrorMessage(null);

    // If Web3 payment is selected
    if (paymentMethod === "botchain") {
      if (!isConnected) {
        setErrorMessage("Please connect your wallet first via the Navbar or Web3 popup.");
        await connectWallet();
        return;
      }
      
      if (chainId !== 968) {
        setErrorMessage("Please switch to BOT Chain Testnet first.");
        await switchToBotChain();
        return;
      }

      try {
        setIsProcessing(true);
        if (typeof window === "undefined" || !window.ethereum) throw new Error("No crypto wallet found");
        
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(NEONFLIX_TICKETING_ADDRESS, NEONFLIX_TICKETING_ABI, signer);

        // Format data for contract
        const seatString = selectedSeats.map(s => s.id).join(", ");
        
        // Execute transaction (will popup MetaMask)
        const tx = await contract.bookTicket(movieTitle, `${date} ${time}`, seatString);
        
        setTxHash(tx.hash);
        
        // Wait for transaction to be mined
        await tx.wait();
        
        // Grant gamification rewards
        let earnedXP = XP_PER_BOOKING;
        if (foodCart.length > 0) {
          earnedXP += XP_PER_FOOD_ORDER * foodCart.length;
        }

        addXP(earnedXP);
        incrementBookings();
        soundFx.playSuccess();

        // Redirect to confirmation with txHash (optional query param)
        router.push(`/booking/${showtimeId}/confirmation?tx=${tx.hash}`);
      } catch (error: any) {
        console.error("Booking transaction failed:", error);
        setErrorMessage(error.reason || error.message || "Transaction failed or rejected.");
        setIsProcessing(false);
        return;
      }
    } else {
      // Simulate traditional payment processing
      setIsProcessing(true);
      setTimeout(() => {
        let earnedXP = XP_PER_BOOKING;
        if (foodCart.length > 0) {
          earnedXP += XP_PER_FOOD_ORDER * foodCart.length;
        }

        addXP(earnedXP);
        incrementBookings();
        soundFx.playSuccess();

        router.push(`/booking/${showtimeId}/confirmation`);
      }, 1800);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2 Cols - Order Review */}
      <div className="lg:col-span-2 space-y-6">
        {/* Error Message Display */}
        {errorMessage && (
          <div className="p-4 bg-red-900/40 border border-red-500 text-red-200 font-mono text-sm rounded flex justify-between items-center animate-pulse">
            <span>ERROR: {errorMessage}</span>
          </div>
        )}
        
        {/* Manifest Overview */}
        <div className="bg-dark-card border border-dark-border p-6 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between pb-3 border-b border-dark-border mb-4">
            <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck size={18} className="text-neon-cyan" />
              DEPLOYMENT REQUISITION LOG
            </h3>
            <span className="text-[10px] font-mono text-neon-green">
              VERIFIED // SECURE_SOCKET
            </span>
          </div>

          <div className="bg-dark-surface/90 border border-neon-red/30 p-4 mb-6">
            <div className="text-xl font-bold font-[family-name:var(--font-orbitron)] text-white mb-1">
              {movieTitle}
            </div>
            <div className="text-gray-400 text-xs font-mono mb-3">
              {cinemaName} • <span className="text-neon-cyan">{studioType || studioName}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-300">
              <div>
                <span className="text-neon-red font-bold">DATE:</span> {date ? formatDate(date) : "-"}
              </div>
              <div>
                <span className="text-neon-cyan font-bold">TIME:</span> {time || "-"}
              </div>
            </div>
          </div>

          {/* Seats locked */}
          <div className="mb-5">
            <div className="text-xs font-mono text-gray-400 mb-2">
              LOCKED COCKPIT PODS ({selectedSeats.length}):
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="bg-neon-red/15 border border-neon-red px-3 py-1 text-white font-mono text-xs font-bold shadow-[0_0_8px_rgba(255,0,51,0.4)]"
                >
                  {seat.id} {seat.status.includes("vip") && "(VIP)"}
                </div>
              ))}
            </div>
          </div>

          {/* Food order summary */}
          {foodCart.length > 0 && (
            <div className="border-t border-dark-border/60 pt-4">
              <div className="text-xs font-mono text-gray-400 mb-2">
                RATIONS & BIO-STIMS ({foodCart.length}):
              </div>
              <div className="space-y-1.5 font-mono text-xs">
                {foodCart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between p-2 bg-dark-surface/60 border border-dark-border"
                  >
                    <span className="text-gray-300">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-neon-cyan font-bold">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="bg-dark-card border border-dark-border p-6 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <h3 className="font-[family-name:var(--font-orbitron)] text-base font-bold text-white mb-4 flex items-center gap-2">
            <Lock size={16} className="text-neon-magenta" />
            SELECT PAYMENT GATEWAY
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => handleSelectPayment(method.id)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`flex items-center justify-between p-3.5 border transition-all cursor-pointer ${
                    isSelected
                      ? "border-neon-cyan bg-neon-cyan/15 text-white shadow-[0_0_15px_rgba(0,247,255,0.4)] font-bold"
                      : "border-dark-border bg-dark-surface text-gray-400 hover:border-gray-500 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isSelected ? "text-neon-cyan" : "text-gray-400"}>
                      {method.icon}
                    </span>
                    <span className="font-mono text-xs">{method.name}</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-dark-bg border border-white/20 text-gray-400">
                    {method.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Col - Checkout Total Panel */}
      <div>
        <div className="bg-dark-card border border-neon-red/50 p-6 shadow-[0_0_30px_rgba(0,0,0,0.9)] sticky top-28">
          <div className="pb-3 border-b border-dark-border mb-4">
            <h3 className="font-[family-name:var(--font-orbitron)] text-base font-bold text-white tracking-wider">
              SETTLEMENT SUMMARY
            </h3>
            <span className="text-[9px] font-mono text-gray-500">
              TRANSACTION PROTOCOL // 256-BIT
            </span>
          </div>

          <div className="space-y-2.5 mb-5 font-mono text-xs text-gray-400">
            <div className="flex justify-between">
              <span>POD SEATS TOTAL:</span>
              <span className="text-white">{formatCurrency(totalTicketPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>RATIONS SUBTOTAL:</span>
              <span className="text-white">{formatCurrency(totalFoodPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>CYBER-GRID PROTOCOL FEE:</span>
              <span className="text-white">{formatCurrency(serviceFee)}</span>
            </div>
          </div>

          {/* Gamification Reward Preview */}
          <div className="p-3 bg-neon-yellow/10 border border-neon-yellow/40 text-neon-yellow text-xs font-mono mb-5 flex items-center gap-2">
            <Zap size={16} className="animate-pulse flex-shrink-0" />
            <div>
              <div className="font-bold">XP REWARD UPON PAYMENT</div>
              <div className="text-[10px] text-gray-400">
                +{XP_PER_BOOKING + (foodCart.length > 0 ? XP_PER_FOOD_ORDER * foodCart.length : 0)} XP will be credited to operator
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-dark-border/80 pt-4 mb-6">
            <div className="flex justify-between items-end">
              <span className="text-xs font-mono text-gray-400 font-bold">TOTAL REQUIRED:</span>
              <span className="text-2xl font-bold font-mono text-white drop-shadow-[0_0_12px_rgba(255,0,51,0.6)]">
                {formatCurrency(finalTotal)}
              </span>
            </div>
          </div>

          <NeonButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                AUTHORIZING CREDITS...
              </span>
            ) : (
              "EXECUTE PAYMENT PROTOCOL"
            )}
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
