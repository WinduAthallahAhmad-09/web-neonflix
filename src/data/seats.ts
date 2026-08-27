export type SeatStatus = "available" | "occupied" | "selected" | "vip" | "vip-occupied";

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
  price: number;
}

export interface SeatLayout {
  rows: number;
  seatsPerRow: number;
  seats: Seat[];
}

export function generateSeatLayout(
  rows: number,
  seatsPerRow: number,
  basePrice: number,
  occupancyRate: number = 0.3
): SeatLayout {
  const seats: Seat[] = [];
  const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let r = 0; r < rows; r++) {
    const rowLabel = rowLabels[r];
    const isVipRow = r >= rows - 3 && r < rows - 1; // Last 2-3 rows are VIP (not last row)

    for (let s = 1; s <= seatsPerRow; s++) {
      const isOccupied = Math.random() < occupancyRate;
      let status: SeatStatus = "available";
      let price = basePrice;

      if (isVipRow) {
        price = basePrice * 1.5;
        status = isOccupied ? "vip-occupied" : "vip";
      } else if (isOccupied) {
        status = "occupied";
      }

      // Add aisle gaps (no seat at positions 4 and seatsPerRow-3 for visual spacing)
      seats.push({
        id: `${rowLabel}${s}`,
        row: rowLabel,
        number: s,
        status,
        price,
      });
    }
  }

  return { rows, seatsPerRow, seats };
}

export function getSeatsByRow(layout: SeatLayout): Record<string, Seat[]> {
  const byRow: Record<string, Seat[]> = {};
  layout.seats.forEach((seat) => {
    if (!byRow[seat.row]) byRow[seat.row] = [];
    byRow[seat.row].push(seat);
  });
  return byRow;
}
