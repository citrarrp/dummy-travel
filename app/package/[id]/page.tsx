"use client";
import React from "react";
import {
  FaBus,
  FaCar,
  FaTrain,
  FaPlane,
  FaUser,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
const transportationData = [
  {
    id_transportasi: 101,
    waktu_berangkat: "10:00",
    waktu_tiba: "11:30",
    tanggal: "2024-12-18",
  },
  {
    id_transportasi: 123,
    waktu_berangkat: "11:30",
    waktu_tiba: "12:15",
    tanggal: "2024-12-18",
  },
  {
    id_transportasi: 151,
    waktu_berangkat: "08:00",
    waktu_tiba: "14:00",
    tanggal: "2024-12-12",
  },
  {
    id_transportasi: 102,
    waktu_berangkat: "14:00",
    waktu_tiba: "14:50",
    tanggal: "2024-12-12",
  },
  {
    id_transportasi: 78,
    waktu_berangkat: "10:00",
    waktu_tiba: "13:00",
    tanggal: "2024-12-12",
  },
  {
    id_transportasi: 105,
    waktu_berangkat: "13:00",
    waktu_tiba: "14:00",
    tanggal: "2024-12-12",
  },
];

const transportDetails: Record<
  number,
  {
    jenis_transportasi: string;
    kapasitas: number;
    fasilitas: string;
    harga: number;
    rute: string;
  }
> = {
  78: {
    jenis_transportasi: "Kereta",
    kapasitas: 40,
    fasilitas: "In-seat meal, WiFi",
    harga: 300000,
    rute: "Stasiun Gambir - Stasiun Yogyakarta",
  },
  101: {
    jenis_transportasi: "Pesawat",
    kapasitas: 40,
    fasilitas: "In-flight meal, WiFi, Entertainment",
    harga: 650000,
    rute: "Jakarta (CGK) - Yogyakarta (YIA)",
  },
  102: {
    jenis_transportasi: "Mobil",
    kapasitas: 12,
    fasilitas: "AC, Seatbelt",
    harga: 40000,
    rute: "Yogyakarta - Candi Borobudur",
  },
  123: {
    jenis_transportasi: "Mobil",
    kapasitas: 12,
    fasilitas: "AC, Seatbelt",
    harga: 50000,
    rute: "Stasiun Yogyakarta - Candi Borobudur",
  },
  151: {
    jenis_transportasi: "Bus",
    kapasitas: 30,
    fasilitas: "AC, WiFi, Toilet",
    harga: 60000,
    rute: "Yogyakarta - Candi Borobudur",
  },
  105: {
    jenis_transportasi: "Mobil",
    kapasitas: 12,
    fasilitas: "AC, Seatbelt",
    harga: 185000,
    rute: "Yogyakarta (YIA) - Candi Borobudur",
  },
};

const groupedTransportations = {
  1: [
    { id_transportasi: 101, urutan_rute: 1 },
    { id_transportasi: 123, urutan_rute: 2 },
  ],
  2: [
    { id_transportasi: 151, urutan_rute: 1 },
    { id_transportasi: 102, urutan_rute: 2 },
  ],
  3: [
    { id_transportasi: 78, urutan_rute: 1 },
    { id_transportasi: 105, urutan_rute: 2 },
  ],
};

interface detailSeat {
  params: {
    id: number;
  };
}

const TransportationCards = () => {
  const searchParams = useSearchParams();
  const paramsId = useParams();
  const hargaTour = searchParams.get("harga");
  const destinasi = searchParams.get("destinasi");
  const tanggalBerangkat = searchParams.get("tanggal");
  const router = useRouter();
  // const pathname = usePathname();
  const [selectedClass, setSelectedClass] = useState("Ekonomi");
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
      {Object.entries(groupedTransportations).map(([idPackage, details]) => {
        const totalHarga = details.reduce(
          (sum, detail) => sum + transportDetails[detail.id_transportasi].harga,
          0
        );

        return (
          <div
            key={idPackage}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 transition-transform hover:scale-[1.02]"
          >
            {/* Header Paket */}
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Paket Perjalanan {idPackage}
              </h3>
              <p className="text-2xl font-semibold text-primary">
                Rp {totalHarga.toLocaleString()}
              </p>
            </div>

            {/* Detail Transportasi (Vertikal) */}
            <div className="mt-6 flex flex-col gap-4">
              {details.map((detail, idx) => {
                const jadwal = transportationData.find(
                  (data) => data.id_transportasi === detail.id_transportasi
                );
                const transport = transportDetails[detail.id_transportasi];

                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-gray-50 p-6 rounded-xl border border-gray-200"
                  >
                    {/* Icon Transportasi */}
                    <div className="text-4xl text-blue-500 text-center">
                      {transport.jenis_transportasi === "Bus" && <FaBus />}
                      {transport.jenis_transportasi === "Mobil" && <FaCar />}
                      {transport.jenis_transportasi === "Kereta" && <FaTrain />}
                      {transport.jenis_transportasi === "Pesawat" && (
                        <FaPlane />
                      )}
                    </div>

                    {/* Detail Info */}
                    <div className="flex-1 space-y-2">
                      <p className="text-lg font-medium text-gray-700">
                        {transport.rute}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <FaUser className="mr-2 text-gray-500" />
                        {transport.kapasitas} Penumpang
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Fasilitas:</span>{" "}
                        {transport.fasilitas}
                      </p>
                    </div>

                    {/* Jadwal */}
                    {jadwal && (
                      <div className="text-sm text-right text-gray-600">
                        {/* <p className="flex items-center justify-end">
                          <FaCalendarAlt className="mr-2 text-gray-500" />
                          {jadwal.tanggal}
                        </p> */}
                        <p className="flex items-center justify-end text-xl text-primary-600 semibold">
                          <FaClock className="mr-2 text-primary-900 semibold" />
                          {jadwal.waktu_berangkat} - {jadwal.waktu_tiba}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Class Selection and Pilih Paket Button */}
            <div className="mt-8 flex items-center justify-between">
              <select
                value={selectedClass}
                onChange={handleClassChange}
                className="border border-gray-300 p-2 rounded-lg"
              >
                <option value="Ekonomi">Ekonomi</option>
                <option value="VIP">VIP</option>
              </select>

              <Button
                onClick={() => {
                  const firstTransportId = details[0].id_transportasi;
                  const lastTransportId =
                    details[details.length - 1].id_transportasi;
                  const firstSchedule = transportationData.find(
                    (data) => data.id_transportasi === firstTransportId
                  );
                  const lastSchedule = transportationData.find(
                    (data) => data.id_transportasi === lastTransportId
                  );
                  const route =
                    transportDetails[firstTransportId]?.rute +
                    "\n Transit" +
                    transportDetails[lastTransportId].rute;

                  router.push(
                    `/seat/${paramsId.id}?package=${idPackage}&class=${selectedClass}&harga=${hargaTour}&destinasi=${destinasi}&tanggal=${tanggalBerangkat}&waktuB=${firstSchedule?.waktu_berangkat}&waktuT=${lastSchedule?.waktu_tiba}&rute=${route}`
                  );
                }}
                variant={"default"}
                className="ml-4 w-full text-white px-6 py-3 rounded-lg transition-all"
              >
                Pilih Paket
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransportationCards;
