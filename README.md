# 🎬 NEONFLIX — Cyberpunk Web3 Cinema DApp

**NEONFLIX** is a modern, Web3-integrated cinema ticketing platform with a **Cyberpunk Gamification** theme. Built for the **Build Week Hackathon Vol.2**, it brings real-world utility (RWA/Ticketing) on-chain using the BOT Chain.

---

## 🌟 What This Project Does
Neonflix allows users to browse cinema schedules, pick specific movie seats interactively, and order food. The core feature is the **Web3 Checkout**: users can pay and mint their cinema ticket directly on the blockchain using the `BOT Chain Smart Contract`.

### How Someone Uses It:
1. **Connect Wallet:** The user clicks the "Connect Wallet" button on the navbar. If they don't have the BOT Chain Testnet, the app prompts MetaMask to add and switch to it automatically.
2. **Select Movie & Seats:** The user navigates to a movie detail page, selects an available showtime, picks their seats on the interactive 2D map, and proceeds to checkout.
3. **Web3 Payment:** In the checkout page, they select "BOT Chain Smart Contract" as the payment method.
4. **On-Chain Booking:** When clicking "EXECUTE PAYMENT", MetaMask prompts them to sign the transaction. The smart contract (`NeonflixTicketing.sol`) hashes their movie, showtime, and seat combination and records it securely on the BOT Chain, preventing double-booking.
5. **E-Ticket:** After the transaction is mined, the user receives an E-Ticket along with Gamification XP.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4
- **Web3**: ethers.js v6, MetaMask API
- **Smart Contract**: Solidity (`NeonflixTicketing.sol`)
- **State Management**: Zustand
- **Animations**: Framer Motion, GSAP, Three.js WebGL

---

## 🔗 Deployment

**BOT Chain Testnet Contract Address:** 
`0x171531E18Dcca8968799Cd2c7a2EFaF0651EA144`

**BOT Chain Mainnet Contract Address:**
`0xE4f8483fD454b52E98F8797c08Ac1714Bb54ea06`

*(The smart contract code can be found in the root directory: `NeonflixTicketing.sol`)*

---

## 🚀 How to Run Locally

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
