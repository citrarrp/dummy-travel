// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import PaymentModal from "../payment/page";

// const BookingForm = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Extract query parameters
//   const kursiString = searchParams.get("kursi");
//   const selectedSeats = kursiString
//     ? kursiString.split(",").filter(Boolean)
//     : [];
//   const selectedSeatsCount = selectedSeats.length;

//   const totalPrice = parseFloat(searchParams.get("total") || "0");
//   const destination = searchParams.get("destinasi");
//   const tourPrice = parseFloat(searchParams.get("harga") || "300000");
//   const route = searchParams.get("rute");
//   const waktu_berangkat = searchParams.get("waktuB");
//   const waktu_tiba = searchParams.get("waktuT");
//   const tanggal = searchParams.get("tanggal");

//   // State to handle passengers data and current step
//   const [formData, setFormData] = useState<any[]>(new Array(selectedSeatsCount).fill(null));
//   const [currentStep, setCurrentStep] = useState(0);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);

//   // Handle input change for each passenger
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const updatedFormData = [...formData];
//     if (!updatedFormData[currentStep]) {
//       updatedFormData[currentStep] = {}; // Initialize if it's the first time editing
//     }
//     updatedFormData[currentStep][name] = value;
//     setFormData(updatedFormData);
//   };

//   // Move to the next step
//   const handleNextStep = () => {
//     if (currentStep < selectedSeatsCount - 1) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   // Move to the previous step
//   const handlePrevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   // Handle payment success
//   const handlePaymentSuccess = async (bookingData: any) => {
//     console.log("ini yang dikirim", bookingData);

//     try {
//       setShowPaymentModal(false);

//       console.log(bookingData, "pembayaran sukses");
//       const response = await fetch("/api/send-ticket", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingData),
//       });

//       const responseData = await response.json();
//       console.log(responseData);
//       if (
//         response.ok &&
//         responseData.message === "Ticket email sent successfully."
//       ) {
//         alert("Pembayaran berhasil! Tiket Anda telah dikirim.");
//         router.push("/ticket-visualization");
//       } else {
//         const errorMessage =
//           responseData.error ||
//           "Gagal mengirim tiket melalui email. Silakan coba lagi.";
//         alert(errorMessage);
//       }
//     } catch (error) {
//       console.error("Error sending ticket email:", error);
//       alert("Terjadi kesalahan. Silakan coba lagi.");
//       console.log("Booking Data to Send:", bookingData);
//       console.log("Type of bookingData:", typeof bookingData);
//     }
//   };

//   const handleSubmit = () => {
//     // Final submission: prepare full data with seat assignments and other details
//     const updatedForm = formData.map((data, index) => ({
//       ...data,
//       seat: selectedSeats[index], // Assign the correct seat to each passenger
//       route, // Add route to each passenger
//       waktu_berangkat, // Add waktu_berangkat to each passenger
//       waktu_tiba, // Add waktu_tiba to each passenger
//       tanggal, // Add tanggal to each passenger
//     }));

//     // Store updated booking data in localStorage for later processing
//     const bookingData = {
//       passengers: updatedForm, // Store the updated form data with seats and route details
//       totalPrice,
//       destination,
//       qrCodeUrl: "https://example.com/qr-code", // Add QR Code URL here
//     };

//     localStorage.setItem("bookingData", JSON.stringify(bookingData));

//     // Show the payment modal with updated data
//     setShowPaymentModal(true);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-50 rounded-lg shadow-md w-full max-w-2xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4 text-black">Formulir Pemesanan</h2>
//       <form onSubmit={(e) => e.preventDefault()} className="w-full">
//         <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
//           <h3 className="text-xl font-semibold mb-2">
//             Penumpang {currentStep + 1}
//           </h3>
//           <div className="flex flex-col gap-4">
//             <input
//               type="text"
//               name="nik"
//               value={formData[currentStep]?.nik || ""}
//               onChange={handleInputChange}
//               placeholder="NIK"
//               className="p-2 border rounded-md"
//               required
//             />
//             <input
//               type="text"
//               name="nama"
//               value={formData[currentStep]?.nama || ""}
//               onChange={handleInputChange}
//               placeholder="Nama"
//               className="p-2 border rounded-md"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData[currentStep]?.email || ""}
//               onChange={handleInputChange}
//               placeholder="Email"
//               className="p-2 border rounded-md"
//             />
//             <input
//               type="text"
//               name="nomor_telepon"
//               value={formData[currentStep]?.nomor_telepon || ""}
//               onChange={handleInputChange}
//               placeholder="Nomor Telepon"
//               className="p-2 border rounded-md"
//               required
//             />
//             <input
//               type="text"
//               name="kota"
//               value={formData[currentStep]?.kota || ""}
//               onChange={handleInputChange}
//               placeholder="Kota"
//               className="p-2 border rounded-md"
//               required
//             />
//             <input
//               type="date"
//               name="tanggal_lahir"
//               value={formData[currentStep]?.tanggal_lahir || ""}
//               onChange={handleInputChange}
//               className="p-2 border rounded-md"
//               required
//             />
//           </div>
//         </div>

//         {/* Payment Information */}
//         <div className="bg-gray-100 rounded-lg shadow-lg p-4 mb-4">
//           <h3 className="text-xl font-semibold mb-2">Informasi Pembayaran</h3>
//           <div className="flex justify-between mb-2">
//             <span>Harga Tour</span>
//             <span>Rp {tourPrice.toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span>Harga Tiket Perjalanan</span>
//             <span>Rp {(totalPrice / selectedSeatsCount).toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between font-bold">
//             <span>Total Keseluruhan</span>
//             <span>
//               Rp{" "}
//               {(
//                 (totalPrice / selectedSeatsCount + tourPrice) *
//                 selectedSeatsCount
//               ).toLocaleString()}
//             </span>
//           </div>
//         </div>

//         {/* Step Navigation */}
//         <div className="flex justify-between">
//           {currentStep > 0 && (
//             <Button type="button" onClick={handlePrevStep} className="mb-4">
//               Langkah Sebelumnya
//             </Button>
//           )}
//           {currentStep < selectedSeatsCount - 1 ? (
//             <Button type="button" onClick={handleNextStep} className="mb-4">
//               Langkah Berikutnya
//             </Button>
//           ) : (
//             <Button type="button" onClick={handleSubmit} className="mb-4">
//               Lanjut ke Pembayaran
//             </Button>
//           )}
//         </div>
//       </form>

//       {showPaymentModal && (
//         <PaymentModal
//           onClose={() => setShowPaymentModal(false)}
//           onSuccess={handlePaymentSuccess}
//           bookingData={{
//             passengers: formData.map((data, index) => ({
//               ...data,
//               seat: selectedSeats[index], // Ensure each passenger gets the correct seat
//               route, // Pass route to each passenger
//               waktu_berangkat, // Pass waktu_berangkat to each passenger
//               waktu_tiba, // Pass waktu_tiba to each passenger
//               tanggal, // Pass tanggal to each passenger
//             })),
//             totalPrice,
//             destination,
//             qrCodeUrl:
//               "https://media.istockphoto.com/id/518484289/photo/close-up-of-qr-code-example.webp?b=1&s=170667a&w=0&k=20&c=wcOxBbduA7iOsvKCXgNnBLvNjYGRY9rrOvdzawGZymc=", // Add QR code URL
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default BookingForm;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PaymentModal from "@/components/payment";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    passengers: 1,
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (bookingData: any) => {
    setIsPaymentModalOpen(false);
    alert("Booking berhasil! Detail telah dikirim ke email Anda.");
    console.log("Booking data:", bookingData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Formulir Pemesanan</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nama
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Nama lengkap Anda"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Email Anda"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Nomor Telepon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Nomor telepon aktif"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Tanggal Keberangkatan
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Passengers */}
        <div className="mb-4">
          <label
            htmlFor="passengers"
            className="block text-sm font-medium text-gray-700"
          >
            Jumlah Penumpang
          </label>
          <select
            id="passengers"
            name="passengers"
            value={formData.passengers}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
            Lanjutkan ke Pembayaran
          </Button>
        </div>
      </form>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <PaymentModal
          onClose={() => setIsPaymentModalOpen(false)}
          onSuccess={handlePaymentSuccess}
          bookingData={formData}
        />
      )}
    </div>
  );
};

export default BookingForm;
