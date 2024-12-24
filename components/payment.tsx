// "use client"
// import { useEffect, useState } from "react";
// import { useQRCode } from "next-qrcode";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";

// const Payment = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const paymentData = JSON.parse(searchParams.get("paymentData") || "{}");
//   const [timer, setTimer] = useState(300); // 5-minute timer
//   const [otp, setOtp] = useState(""); // OTP state
//   const [isOtpVerified, setIsOtpVerified] = useState(false); // OTP verification flag

//   // Use useQRCode hook to generate QR code
//   const { Canvas } = useQRCode(); // Get the Canvas component from useQRCode

//   // Timer countdown effect
//   useEffect(() => {
//     const countdown = setInterval(() => {
//       setTimer((prev) => prev - 1);
//       if (timer <= 0) {
//         clearInterval(countdown);
//         alert("Payment time expired!");
//         router.push("/booking");
//       }
//     }, 1000);

//     return () => clearInterval(countdown); // Cleanup on component unmount
//   }, [timer]);

//   // Handle OTP input change
//   const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setOtp(e.target.value);
//   };

//   // Verify OTP (you can replace this with an actual API call for verification)
//   const handleVerifyOtp = () => {
//     if (otp === "123456") {
//       // Replace with your OTP validation logic
//       setIsOtpVerified(true);
//       alert("OTP Verified!");
//     } else {
//       alert("Invalid OTP!");
//     }
//   };

//   const handlePaymentSuccess = async () => {
//     if (!isOtpVerified) {
//       alert("Please verify your OTP before completing the payment.");
//       return;
//     }
//     const response = await fetch("/api/send-email", {
//       method: "POST",
//       body: JSON.stringify(paymentData),
//     });

//     if (response.ok) {
//       router.push("/confirmation");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-50 rounded-lg shadow-md w-full max-w-2xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4 text-black">Payment Page</h2>
//       <p className="mb-4">Time left: {timer}s</p>

//       {/* QR Code using useQRCode */}
//       <div className="mb-6">
//         <Canvas
//           text="https://leads.upnvj.ac.id/login/index.php" // The URL to encode in the QR code
//           options={{
//             width: 256, // Set the size of the QR code
//           }}
//         />
//       </div>

//       {/* OTP Input */}
//       {!isOtpVerified && (
//         <div className="mt-6">
//           <input
//             type="text"
//             value={otp}
//             onChange={handleOtpChange}
//             placeholder="Enter OTP"
//             className="p-2 border rounded-md"
//             maxLength={6} // Assuming OTP is a 6-digit code
//           />
//           <Button onClick={handleVerifyOtp} className="mt-4">
//             Verify OTP
//           </Button>
//         </div>
//       )}

//       {/* Complete Payment Button */}
//       {isOtpVerified && (
//         <Button onClick={handlePaymentSuccess} className="mt-6">
//           Complete Payment
//         </Button>
//       )}
//     </div>
//   );
// };

// export default Payment;

// "use client";

// import { useEffect, useState } from "react";
// import { useQRCode } from "next-qrcode";
// import { Button } from "@/components/ui/button";

// interface PaymentModalProps {
//   onClose: () => void;
//   onSuccess: (bookingData: any) => void;
//   bookingData: any;
//   // ticketData: any;
// }

// const PaymentModal = ({
//   onClose,
//   onSuccess,
//   bookingData,
// }: PaymentModalProps) => {
//   const [timer, setTimer] = useState(300);
//   const [otp, setOtp] = useState("");
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const { Canvas } = useQRCode();

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(countdown);
//           alert("Waktu pembayaran habis. Kembali ke halaman awal.");
//           onClose();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(countdown);
//   }, [onClose]);

//   const handleVerifyOtp = () => {
//     if (otp === "123456") {
//       setIsOtpVerified(true);
//       alert("Pembayaran berhasil!");
//       onSuccess(bookingData);
//     } else {
//       alert("Kode OTP salah. Silakan coba lagi.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Pembayaran</h2>
//         <p className="mb-4">Waktu tersisa: {timer}s</p>

//         {/* QR Code */}
//         <div className="flex justify-center items-center mb-6">
//           <Canvas
//             text={
//               bookingData.qrCodeUrl ||
//               "https://media.istockphoto.com/id/518484289/photo/close-up-of-qr-code-example.webp?b=1&s=170667a&w=0&k=20&c=wcOxBbduA7iOsvKCXgNnBLvNjYGRY9rrOvdzawGZymc="
//             } // URL to encode in QR code
//             options={{
//               width: 256,
//             }}
//           />
//         </div>

//         {/* OTP Input */}
//         {!isOtpVerified && (
//           <div className="mt-6">
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Masukkan OTP"
//               className="p-2 border rounded-md w-full"
//               maxLength={6}
//             />
//             <Button onClick={handleVerifyOtp} className="mt-4 w-full">
//               Verifikasi OTP
//             </Button>
//           </div>
//         )}

//         <Button onClick={onClose} variant={"outline"} className="mt-4 w-full">
//           Batalkan
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;

"use client";

import { useEffect, useState } from "react";
import { useQRCode } from "next-qrcode";
import { Button } from "@/components/ui/button";

interface PaymentModalProps {
  onClose: () => void;
  onSuccess: (bookingData: any) => void;
  bookingData: any;
}

const PaymentModal = ({
  onClose,
  onSuccess,
  bookingData,
}: PaymentModalProps) => {
  const [timer, setTimer] = useState(300); // Countdown timer, in seconds
  const [otp, setOtp] = useState(""); // OTP input state
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Verification state
  const { Canvas } = useQRCode();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          alert("Waktu pembayaran habis. Kembali ke halaman awal.");
          onClose();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup the timer on unmount
  }, [onClose]);

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      setIsOtpVerified(true);
      alert("Pembayaran berhasil!");
      onSuccess(bookingData);
    } else {
      alert("Kode OTP salah. Silakan coba lagi.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Pembayaran</h2>
        <p className="mb-4 text-gray-700">Waktu tersisa: {timer} detik</p>

        {/* QR Code */}
        <div className="flex justify-center items-center mb-6">
          <Canvas
            text={JSON.stringify(bookingData)}
            options={{
              margin: 3,
              scale: 4,
              width: 200,
              color: {
                dark: "#000000",
                light: "#FFFFFF",
              },
            }}
          />
        </div>

        {/* OTP Input */}
        <div className="mb-4">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700"
          >
            Masukkan OTP:
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Masukkan kode OTP"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-700">
            Batal
          </Button>
          <Button
            onClick={handleVerifyOtp}
            className="bg-blue-500 hover:bg-blue-700"
          >
            Verifikasi OTP
          </Button>
        </div>

        {isOtpVerified && (
          <div className="mt-4 bg-green-100 p-4 rounded-md">
            <p className="text-green-700 font-medium">
              Pembayaran berhasil! Tiket akan dikirim ke email Anda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
