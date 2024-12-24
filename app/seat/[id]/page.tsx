"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useRouter,
  notFound,
} from "next/navigation";
import { Button } from "@/components/ui/button";

type Seat = {
  id_tempat: number;
  id_transportasi: number;
  no_seat: string;
  status: number; // 0 = belum dipesan, 1 = sudah dipesan
  harga: number;
  kelas: string;
};

const transportDetails: {
  [key: number]: {
    jenis_transportasi: string;
    kapasitas: number;
    fasilitas: string;
    harga: { [kelas: string]: number };
    rute: string;
  };
} = {
  101: {
    jenis_transportasi: "Pesawat",
    kapasitas: 40,
    fasilitas: "In-flight meal, WiFi, Entertainment",
    harga: { VIP: 1050000, Ekonomi: 550000 },
    rute: "Jakarta (CGK) - Yogyakarta (YIA)",
  },
  123: {
    jenis_transportasi: "Mobil",
    kapasitas: 12,
    fasilitas: "AC, Seatbelt",
    harga: { Reguler: 150000 },
    rute: "Stasiun Yogyakarta - Candi Borobudur",
  },
};

const groupedTransportations = {
  1: [
    { id_transportasi: 101, urutan_rute: 1 },
    { id_transportasi: 123, urutan_rute: 2 },
  ],
};

const Kapasitas = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Tambahkan state untuk menyimpan nomor kursi yang dipilih

  const id = useParams();
  const packageId = searchParams.get("package");
  const seatClass = searchParams.get("class") || "Ekonomi";
  const harga = searchParams.get("harga");
  const destinasi = searchParams.get("destinasi");
  const tanggal = searchParams.get("tanggal");
  const waktu_tiba = searchParams.get("waktuT");
  const waktu_berangkat = searchParams.get("waktuB");
  const rute = searchParams.get("rute");

  useEffect(() => {
    if (!id || !packageId) {
      setError("Missing required parameters");
      setLoading(false);
      return;
    }

    const fetchSeats = async () => {
      try {
        const transports = groupedTransportations[1];
        if (!transports || transports.length === 0) {
          setError("No transport data found for the package");
          return;
        }

        const seatsList: Seat[] = [];

        for (const transport of [transports[0]]) {
          // Hanya mengambil data pertama
          const transportData = transportDetails[transport.id_transportasi];
          if (!transportData) continue;

          const seatCount = transportData.kapasitas;
          let rowIndex = 1; // Mulai dari baris 1
          let columnIndex = 0; // Mulai dari kolom 'A'

          for (let i = 1; i <= seatCount; i++) {
            const randomStatus = Math.random() > 0.75 ? 1 : 0; // 10 random seats sold

            // Membuat nomor kursi berurutan berdasarkan baris (A, B, C, ...) dan nomor (1, 2, 3, ...)
            const column = String.fromCharCode(65 + columnIndex); // 'A', 'B', 'C', ...
            const row = rowIndex; // Nomor kursi berurutan 1, 2, 3, ...

            seatsList.push({
              id_tempat: i,
              id_transportasi: transport.id_transportasi,
              no_seat: `${column}${row}`,
              status: randomStatus,
              harga: transportData.harga[seatClass] || 0,
              kelas: seatClass,
            });

            columnIndex++; // Pindah ke kolom berikutnya
            if (columnIndex >= 26) {
              // Jika sudah sampai Z, reset ke A dan pindah ke baris berikutnya
              columnIndex = 0;
              rowIndex++; // Pindah ke baris berikutnya
            }
          }
        }

        setSeats(seatsList);
        setTotalCapacity(seatsList.length);
        setAvailableSeats(seatsList.filter((seat) => seat.status !== 1).length);
      } catch (error) {
        setError("Failed to fetch seats");
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [id, packageId, seatClass]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const validSeats = seats.filter((seat) => seat.id_transportasi !== null);

  if (!validSeats || validSeats.length === 0) {
    return notFound();
  }

  const handleSeatSelection = (seat: Seat) => {
    if (seat.status === 1) return; // Ignore already sold seats

    setSeats((prevSeats) =>
      prevSeats.map((s) =>
        s.id_tempat === seat.id_tempat &&
        s.id_transportasi === seat.id_transportasi
          ? { ...s, status: s.status === 0 ? 2 : 0 } // Toggle selected status
          : s
      )
    );

    setTotalPrice((prevPrice) =>
      seat.status === 0 ? prevPrice + seat.harga : prevPrice - seat.harga
    );

    setSelectedSeatsCount((prevCount) =>
      seat.status === 0 ? prevCount + 1 : prevCount - 1
    );

    setAvailableSeats((prevAvailableSeats) =>
      seat.status === 0 ? prevAvailableSeats - 1 : prevAvailableSeats + 1
    );

    // Update selectedSeats array with the selected seat's number
    setSelectedSeats((prevSelectedSeats) =>
      seat.status === 0
        ? [...prevSelectedSeats, seat.no_seat]
        : prevSelectedSeats.filter((no_seat) => no_seat !== seat.no_seat)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 bg-gray-50 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-black">Pilih Kursi</h2>
      <div className="grid grid-cols-2 gap-4 text-center mb-6 w-full">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <p className="text-lg font-medium text-gray-600">Total Kapasitas</p>
          <p className="text-xl font-bold text-blue-600">
            {totalCapacity} Kursi
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <p className="text-lg font-medium text-gray-600">Kursi Tersedia</p>
          <p className="text-xl font-bold text-green-600">
            {availableSeats} Kursi
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <p className="text-lg font-medium text-gray-600">Kursi Dipilih</p>
          <p className="text-xl font-bold text-yellow-600">
            {selectedSeatsCount} Kursi
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <p className="text-lg font-medium text-gray-600">Total Harga</p>
          <p className="text-xl font-bold text-red-600">
            Rp {totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {validSeats.map((seat) => (
          <label
            key={seat.id_tempat}
            className={`flex items-center justify-center gap-2 p-3 h-[50px] w-[50px] border rounded-md shadow-md transition-transform transform hover:scale-105 cursor-pointer ${
              seat.status === 1
                ? "bg-red-500 text-white"
                : seat.status === 2
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <input
              type="checkbox"
              disabled={seat.status === 1}
              checked={seat.status === 2}
              onChange={() => handleSeatSelection(seat)}
              className="hidden"
            />
            {seat.no_seat}
          </label>
        ))}
      </div>
      <Button
        onClick={() =>
          router.push(
            `/booking?total=${totalPrice}&harga=${harga}&kursi=${selectedSeats.join(
              ","
            )}&destinasi=${destinasi}&tanggal=${tanggal}&waktuB=${waktu_berangkat}&waktuT=${waktu_tiba}&rute=${rute}`
          )
        }
        className="px-6 py-3 bg-blue-300 text-black font-bold rounded-lg shadow-md hover:bg-blue-900 hover:text-white"
      >
        Lanjutkan Pemesanan
      </Button>
    </div>
  );
};

export default Kapasitas;
