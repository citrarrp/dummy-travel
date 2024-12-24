// import React from "react";
// import { useRouter } from "next/router";
// import QRCode from "react-qr-code";
// import { Button } from "@/components/ui/button";

// const TicketPage = ({ ticketData }) => {
//   const router = useRouter();

//   if (!ticketData) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-50 rounded-lg shadow-md w-full max-w-2xl mx-auto">
//         <h2 className="text-3xl font-bold mb-4 text-black">No Ticket Data Found</h2>
//         <Button onClick={() => router.push("/booking")} className="mt-4">
//           Back to Booking
//         </Button>
//       </div>
//     );
//   }

//   const {
//     bookingId,
//     passengerInfo,
//     destination,
//     route,
//     departureTime,
//     arrivalTime,
//     seatNumbers,
//     qrCodeUrl,
//   } = ticketData;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-50 rounded-lg shadow-md w-full max-w-2xl mx-auto">
//       <h1 className="text-4xl font-bold mb-6 text-black">Your Ticket</h1>
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full">
//         <div className="mb-4">
//           <h2 className="text-2xl font-semibold">Booking Details</h2>
//           <p><strong>Booking ID:</strong> {bookingId}</p>
//           <p><strong>Destination:</strong> {destination}</p>
//           <p><strong>Route:</strong> {route}</p>
//           <p><strong>Departure Time:</strong> {departureTime}</p>
//           <p><strong>Arrival Time:</strong> {arrivalTime}</p>
//           <p><strong>Seat Numbers:</strong> {seatNumbers.join(", ")}</p>
//         </div>

//         <div className="mb-4">
//           <h2 className="text-2xl font-semibold">Passenger Information</h2>
//           {passengerInfo.map((passenger, index) => (
//             <div key={index} className="mb-2">
//               <p><strong>Name:</strong> {passenger.name}</p>
//               <p><strong>ID:</strong> {passenger.id}</p>
//               <p><strong>Email:</strong> {passenger.email}</p>
//               <p><strong>Phone:</strong> {passenger.phone}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center mt-4">
//           <QRCode value={qrCodeUrl || "No QR Code Available"} size={128} />
//         </div>

//         <div className="flex justify-center mt-6">
//           <Button onClick={() => router.push("/booking")} className="mr-4">
//             Back to Booking
//           </Button>
//           <Button onClick={() => alert("Ticket saved successfully!")}>Save Ticket</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Example ticketData for testing
// export async function getServerSideProps() {
//   // Replace this with actual data fetching logic
//   const ticketData = {
//     bookingId: "12345678",
//     passengerInfo: [
//       {
//         name: "John Doe",
//         id: "1234567890",
//         email: "john.doe@example.com",
//         phone: "123-456-7890",
//       },
//     ],
//     destination: "Bali",
//     route: "Jakarta - Bali",
//     departureTime: "2024-12-20 08:00",
//     arrivalTime: "2024-12-20 12:00",
//     seatNumbers: ["A1", "A2"],
//     qrCodeUrl: "https://example.com/ticket/12345678",
//   };

//   return {
//     props: { ticketData },
//   };
// }

// export default TicketPage;
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQRCode } from "next-qrcode"; // Import useQRCode hook
import { getDestinationsById } from "@/actions/getDestinationsById";

const TicketDetails = () => {
  const router = useRouter();
  const [ticket, setTicket] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null); // State for destination data
  const { Canvas } = useQRCode();

  useEffect(() => {
    const storedTicketData = localStorage.getItem("bookingData");
    if (storedTicketData) {
      const ticketData = JSON.parse(storedTicketData);
      setTicket(ticketData);

      //   const destinationData = getDestinationsById(
      //     Number(ticketData.destination)
      //   );
      //   setDestination(destinationData);
    } else {
      // Redirect to home if no ticket is found
      router.push("/");
    }
  }, [router]);

  if (!ticket) return <div>Loading...</div>;

  const currentDate = new Date();
  const date = currentDate.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  //   const destinationName = destination?.nama_destinasi || "Unknown Destination";
  const qrCodeText =
    ticket.qrCodeUrl ||
    "https://media.istockphoto.com/id/518484289/photo/close-up-of-qr-code-example.webp?b=1&s=170667a&w=0&k=20&c=wcOxBbduA7iOsvKCXgNnBLvNjYGRY9rrOvdzawGZymc=";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-50 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Pesanan Anda</h2>
      <div className="bg-white p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">Informasi Tiket</h3>
        <div className="flex flex-col gap-4">
          {/* <p>
            <strong>Destinasi:</strong> {destinationName}
          </p> */}
          <p>
            <strong>Harga Total:</strong> Rp{" "}
            {ticket.totalPrice.toLocaleString()}
          </p>
          <p>
            <strong>Tanggal Pemesanan:</strong> {date}
          </p>
          <h4>
            <strong>User Information:</strong>
          </h4>
          <ul>
            {ticket.passengers.map((passenger: any, index: number) => (
              <li key={index}>
                {passenger.nama} - {passenger.email} - {passenger.nomor_telepon}
              </li>
            ))}
          </ul>

          <div>
            <h4 className="text-lg font-semibold">QR Code</h4>
            {/* Generate QR code based on the ticket's URL or other unique data */}
            <div>
              <Canvas
                text={qrCodeText}
                options={{
                  errorCorrectionLevel: "M",
                  margin: 3,
                  scale: 4,
                  width: 200,
                  //   color: {
                  //     dark: "#010599FF",
                  //     light: "#FFBF60FF",
                  //   },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
