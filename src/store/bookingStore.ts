"use client";

import { create } from "zustand";
import type { Seat } from "@/data/seats";
import type { FoodItem } from "@/data/foods";

export interface CartFoodItem extends FoodItem {
  quantity: number;
}

interface BookingState {
  // Selected movie & showtime
  movieId: string | null;
  movieTitle: string | null;
  showtimeId: string | null;
  cinemaName: string | null;
  studioName: string | null;
  studioType: string | null;
  date: string | null;
  time: string | null;
  ticketPrice: number;

  // Selected seats
  selectedSeats: Seat[];

  // Food order
  foodCart: CartFoodItem[];

  // Totals
  totalTicketPrice: number;
  totalFoodPrice: number;
  totalPrice: number;

  // Actions
  setShowtime: (data: {
    movieId: string;
    movieTitle: string;
    showtimeId: string;
    cinemaName: string;
    studioName: string;
    studioType: string;
    date: string;
    time: string;
    ticketPrice: number;
  }) => void;

  toggleSeat: (seat: Seat) => void;
  addFoodItem: (item: FoodItem) => void;
  removeFoodItem: (itemId: string) => void;
  updateFoodQuantity: (itemId: string, quantity: number) => void;
  reset: () => void;
}

const initialState = {
  movieId: null,
  movieTitle: null,
  showtimeId: null,
  cinemaName: null,
  studioName: null,
  studioType: null,
  date: null,
  time: null,
  ticketPrice: 0,
  selectedSeats: [],
  foodCart: [],
  totalTicketPrice: 0,
  totalFoodPrice: 0,
  totalPrice: 0,
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,

  setShowtime: (data) =>
    set({
      movieId: data.movieId,
      movieTitle: data.movieTitle,
      showtimeId: data.showtimeId,
      cinemaName: data.cinemaName,
      studioName: data.studioName,
      studioType: data.studioType,
      date: data.date,
      time: data.time,
      ticketPrice: data.ticketPrice,
      selectedSeats: [],
      foodCart: [],
      totalTicketPrice: 0,
      totalFoodPrice: 0,
      totalPrice: 0,
    }),

  toggleSeat: (seat) =>
    set((state) => {
      const exists = state.selectedSeats.find((s) => s.id === seat.id);
      let newSeats: Seat[];
      if (exists) {
        newSeats = state.selectedSeats.filter((s) => s.id !== seat.id);
      } else {
        if (state.selectedSeats.length >= 6) return state; // Max 6 seats
        newSeats = [...state.selectedSeats, seat];
      }
      const totalTicket = newSeats.reduce((sum, s) => sum + s.price, 0);
      return {
        selectedSeats: newSeats,
        totalTicketPrice: totalTicket,
        totalPrice: totalTicket + state.totalFoodPrice,
      };
    }),

  addFoodItem: (item) =>
    set((state) => {
      const existing = state.foodCart.find((f) => f.id === item.id);
      let newCart: CartFoodItem[];
      if (existing) {
        newCart = state.foodCart.map((f) =>
          f.id === item.id ? { ...f, quantity: f.quantity + 1 } : f
        );
      } else {
        newCart = [...state.foodCart, { ...item, quantity: 1 }];
      }
      const totalFood = newCart.reduce(
        (sum, f) => sum + f.price * f.quantity,
        0
      );
      return {
        foodCart: newCart,
        totalFoodPrice: totalFood,
        totalPrice: state.totalTicketPrice + totalFood,
      };
    }),

  removeFoodItem: (itemId) =>
    set((state) => {
      const newCart = state.foodCart.filter((f) => f.id !== itemId);
      const totalFood = newCart.reduce(
        (sum, f) => sum + f.price * f.quantity,
        0
      );
      return {
        foodCart: newCart,
        totalFoodPrice: totalFood,
        totalPrice: state.totalTicketPrice + totalFood,
      };
    }),

  updateFoodQuantity: (itemId, quantity) =>
    set((state) => {
      let newCart: CartFoodItem[];
      if (quantity <= 0) {
        newCart = state.foodCart.filter((f) => f.id !== itemId);
      } else {
        newCart = state.foodCart.map((f) =>
          f.id === itemId ? { ...f, quantity } : f
        );
      }
      const totalFood = newCart.reduce(
        (sum, f) => sum + f.price * f.quantity,
        0
      );
      return {
        foodCart: newCart,
        totalFoodPrice: totalFood,
        totalPrice: state.totalTicketPrice + totalFood,
      };
    }),

  reset: () => set(initialState),
}));
