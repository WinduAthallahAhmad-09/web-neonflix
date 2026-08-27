import { mockUser } from '@/data/user';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CyberCard } from '@/components/ui/CyberCard';
import { NeonBadge } from '@/components/ui/NeonBadge';
import { Calendar, Clock, MapPin, Ticket, Zap } from 'lucide-react';

export default function BookingHistory() {
  const bookings = mockUser.bookingHistory || [];
  
  const upcoming = bookings.filter(b => b.status === 'upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const completed = bookings.filter(b => b.status === 'completed').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const cancelled = bookings.filter(b => b.status === 'cancelled').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const allSorted = [...upcoming, ...completed, ...cancelled];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6 border-b border-dark-border pb-4">
        <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-neon-red">/</span>
          BOOKING HISTORY
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {allSorted.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-dark-border rounded-lg bg-dark-card/50">
            <p className="font-[family-name:var(--font-jetbrains)] text-text-secondary">NO BOOKING HISTORY FOUND</p>
          </div>
        ) : (
          allSorted.map((booking) => (
            <CyberCard key={booking.id} className="p-0 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Left side */}
                <div className="bg-dark-surface p-4 border-b md:border-b-0 md:border-r border-dark-border flex flex-col justify-center items-center min-w-[140px]">
                  <div className="text-center">
                    <div className="font-[family-name:var(--font-jetbrains)] text-xs text-text-secondary mb-1">DATE</div>
                    <div className="font-[family-name:var(--font-orbitron)] font-bold text-lg text-white">
                      {formatDate(booking.date)}
                    </div>
                  </div>
                  
                  <div className="mt-3 w-full border-t border-dark-border/50 pt-3 text-center">
                    <NeonBadge 
                      variant={
                        booking.status === 'upcoming' ? 'cyan' : 
                        booking.status === 'completed' ? 'green' : 'red'
                      }
                      className="w-full justify-center py-1 text-xs"
                    >
                      {booking.status.toUpperCase()}
                    </NeonBadge>
                  </div>
                </div>
                
                {/* Details */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                    <h3 className="font-[family-name:var(--font-orbitron)] font-bold text-xl text-white tracking-wide uppercase">
                      {booking.movieTitle}
                    </h3>
                    <div className="font-[family-name:var(--font-jetbrains)] font-bold text-neon-cyan whitespace-nowrap">
                      {formatCurrency(booking.totalAmount)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary font-[family-name:var(--font-jetbrains)]">
                      <MapPin className="w-4 h-4 text-neon-magenta flex-shrink-0" />
                      <span className="truncate">{booking.cinemaName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary font-[family-name:var(--font-jetbrains)]">
                      <Clock className="w-4 h-4 text-neon-magenta flex-shrink-0" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary font-[family-name:var(--font-jetbrains)] sm:col-span-2">
                      <Ticket className="w-4 h-4 text-neon-magenta flex-shrink-0" />
                      <span>Seats: <span className="text-white">{booking.seats.join(', ')}</span></span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-auto pt-3 border-t border-dark-border/30">
                    <Zap className="w-4 h-4 text-neon-yellow" />
                    <span className="font-[family-name:var(--font-jetbrains)] text-xs font-bold text-neon-yellow tracking-widest uppercase">
                      Earned {booking.xpEarned} XP
                    </span>
                  </div>
                </div>
              </div>
            </CyberCard>
          ))
        )}
      </div>
    </div>
  );
}
