"use client";
import Image from "next/image";
import { FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface DestinasiProps {
  destinasi: {
    id_destinasi: number;
    nama_destinasi: string | null;
    deskripsi: string | null;
    harga: number | null;
    lokasi: string | null;
    link_gambar: string | null;
  };
}

const DestinasiDetail = ({ destinasi }: DestinasiProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tanggal: "",
    jumlahTiket: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  console.log(destinasi.harga);
  const totalHarga = destinasi.harga || 400000;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Destinasi Info Section (Left Side) */}
        <div className="w-full bg-white p-6 border rounded-md shadow-md">
          {destinasi.link_gambar && (
            <Image
              src={destinasi.link_gambar}
              alt={destinasi.nama_destinasi || "Destinasi image"}
              width={800}
              height={400}
              className="w-full h-60 object-cover rounded-md"
            />
          )}
          <div className="mt-6">
            <h2 className="text-3xl font-semibold text-gray-800">
              {destinasi.nama_destinasi || "Unknown Destination"}
            </h2>
            <p className="text-gray-600 text-sm mt-3">
              {destinasi.deskripsi || "No description available."}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-xl text-primary-500" />
                <span>{destinasi.lokasi || "Location not available"}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-gray-600">
                <FaDollarSign className="text-xl text-primary-500" />
                <span className="font-semibold text-primary-600">
                  {destinasi.harga
                    ? `${destinasi.harga}`
                    : "Price not available"}
                </span>
                <span className="text-sm text-gray-500"> / per person</span>
              </div>
            </div>
          </div>
        </div>

        {/* Book This Tour Form Section (Right Side) */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 border rounded-md shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Book This Tour
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="tanggal"
                className="block text-sm font-medium text-gray-600"
              >
                Tanggal Keberangkatan
              </label>
              <input
                type="date"
                id="tanggal"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md border-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="jumlahTiket"
                className="block text-sm font-medium text-gray-600"
              >
                Jumlah Tiket
              </label>
              <input
                type="number"
                id="jumlahTiket"
                name="jumlahTiket"
                min="1"
                value={formData.jumlahTiket}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md border-gray-300"
              />
            </div>
            <Button
              onClick={() =>
                router.push(
                  `/package/${formData.jumlahTiket}?harga=${totalHarga}&destinasi=${destinasi.id_destinasi}&tanggal=${formData.tanggal}`
                )
              }
              variant={"default"}
              className="w-full h-12 text-lg"
              disabled={!formData.tanggal}
            >
              Book This Tour
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DestinasiDetail;
