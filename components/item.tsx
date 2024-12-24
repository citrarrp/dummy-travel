import { Destinasi } from "@prisma/client";
import Link from "next/link";
import Image from "next/image"; // Pastikan untuk mengimpor komponen Image dari Next.js

interface TripProps {
  trip: Destinasi;
}

const TripItem = ({ trip }: TripProps) => {
  return (
    <div className="border border-gray-300 rounded-lg">
      <div className="flex flex-col gap-3 p-5">
        <div className="relative h-[280px] w-[280px]">
          {/* Menampilkan satu gambar saja */}
          <Image
            src={trip?.link_gambar || "/default-image.jpg"} // fallback ke gambar default jika link_gambar null
            alt={trip?.nama_destinasi || "Destinasi Tidak Ditemukan"} // fallback ke teks jika nama_destinasi null
            className="object-cover w-full h-full rounded-lg"
            width={280} // Tentukan lebar dan tinggi untuk gambar
            height={280}
          />
        </div>
        <Link href={`/trip/${trip.id_destinasi}`}>
          <div>
            <h3 className="text-primaryDarker font-medium text-sm ">
              {trip?.nama_destinasi || "Nama Destinasi Tidak Ditemukan"}
            </h3>
            <div className="flex items-center gap-1">
              <p className="text-xs font-normal text-secondaryGray">
                {trip?.lokasi || "Lokasi Tidak Ditemukan"}{" "}
                {/* Fallback untuk lokasi */}
              </p>
            </div>
            <p className="text-xs font-normal text-secondaryGray">
              <span className="text-primary font-medium">
                Rp {trip?.harga?.toString() || "0"} {/* Fallback untuk harga */}
              </span>{" "}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TripItem;
