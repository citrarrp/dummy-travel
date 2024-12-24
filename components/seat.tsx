"use client";

import { useState } from "react";

type Seat = {
  id_tempat: number;
  id_transportasi: number;
  no_seat: string;
  status: number; // 0 = belum dipesan, 1 = sudah dipesan
  harga: number;
  kelas: string;
};

type SeatItemProps = {
  seats: Seat[];
  onSeatSelect: (selectedSeat: Seat) => void; // Callback untuk POST seat
};

const SeatItem = ({ seats, onSeatSelect }: SeatItemProps) => {
  const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set());

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 1) return; // Kursi sudah dipesan

    setSelectedSeats((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(seat.id_tempat)) {
        newSelected.delete(seat.id_tempat);
      } else {
        newSelected.add(seat.id_tempat);
      }
      return newSelected;
    });

    onSeatSelect(seat); // Kirim kursi yang dipilih
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {seats.map((seat) => (
        <div
          key={seat.id_tempat}
          className={`p-2 border rounded cursor-pointer text-center ${
            seat.status === 1
              ? "bg-red-500 text-white"
              : selectedSeats.has(seat.id_tempat)
              ? "bg-blue-500 text-white"
              : "bg-gray-100"
          }`}
          onClick={() => handleSeatClick(seat)}
        >
          {seat.no_seat}
        </div>
      ))}
    </div>
  );
};

export default SeatItem;
