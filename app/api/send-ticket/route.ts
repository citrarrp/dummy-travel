// const nodemailer = require("nodemailer");

// // Define the types for the request body and passenger data
// interface Passenger {
//   nama: string;
//   email: string;
//   nomor_telepon: string;
//   seat: string;  // Added the seat property to the Passenger interface
// }

// interface TicketData {
//   selectedSeats: string[];
//   totalPrice: number;
//   destination: string;
//   qrCodeUrl: string;
//   passengers: Passenger[];
// }

// // The function to handle the API request
// async function sendTicketEmail(req: { body: TicketData }, res: any) {
//   const { selectedSeats, totalPrice, destination, qrCodeUrl, passengers } =
//     req.body;

//   // Ensure each passenger gets the correct seat (from selectedSeats)
//   const passengersWithSeats = passengers.map((passenger, index) => ({
//     ...passenger,
//     seat: selectedSeats[index] || "No seat assigned", // Assign seat to each passenger
//   }));

//   // Generate the email content
//   const ticketDetails = `
//     <h1>Ticket Confirmation</h1>
//     <p>Destination: ${destination}</p>
//     <p>Total Price: Rp ${totalPrice.toLocaleString()}</p>
//     <p>Seats: ${selectedSeats.join(", ")}</p>
//     <p>Passenger Information:</p>
//     <ul>
//       ${passengersWithSeats
//         .map(
//           (passenger) =>
//             `<li>${passenger.nama} - ${passenger.email} - ${passenger.nomor_telepon} - Seat: ${passenger.seat}</li>`
//         )
//         .join("")}
//     </ul>
//     <img src="${qrCodeUrl}" alt="QR Code" />
//   `;

//   // Set up the email transporter using Gmail's SMTP
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "your-email@gmail.com",
//       pass: "your-email-password",
//     },
//   });

//   // Prepare the email options
//   const mailOptions = {
//     from: "your-email@gmail.com",
//     to: passengers.map((p) => p.email).join(", "), // Send to all passenger emails
//     subject: "Ticket Confirmation",
//     html: ticketDetails,
//   };

//   try {
//     // Send the email
//     await transporter.sendMail(mailOptions);
//     res.status(200).send({ message: "Ticket email sent successfully." });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).send({ error: "Failed to send email." });
//   }
// }

// // Default export for the API route
// export default sendTicketEmail;
import { getDestinationsById } from "@/actions/getDestinationsById";
const nodemailer = require("nodemailer");
// import QRCodeGenerator from "@/components/qrcode";

interface Passenger {
  nama: string;
  email: string;
  nomor_telepon: string;
  seat: string;
  nik: string;
  route: string;
  tanggal: string;
  waktu_berangkat: string;
  waktu_tiba: string;
}

interface BookingData {
  totalPrice: number;
  destination: number;
  qrCodeUrl: string;
  passengers: Passenger[];
}

export async function POST(req: Request) {
  try {
    const body: BookingData = await req.json();
    console.log(body, "iya");

    if (!body || Object.keys(body).length === 0) {
      return new Response(
        JSON.stringify({ error: "Request body is empty or invalid." }),
        { status: 400 }
      );
    }

    const { passengers, totalPrice, destination, qrCodeUrl } = body;

    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Passengers data is required and must be an array.",
        }),
        { status: 400 }
      );
    }

    if (!destination) {
      return new Response(
        JSON.stringify({ error: "Valid destination ID is required." }),
        { status: 400 }
      );
    }

    if (!qrCodeUrl || !qrCodeUrl.startsWith("http")) {
      return new Response(
        JSON.stringify({ error: "Valid QR code URL is required." }),
        { status: 400 }
      );
    }

    const destinations = await getDestinationsById(Number(destination));
    const destinationName =
      destinations?.nama_destinasi || "Unknown Destination";

    // const qrCodeImageData = QRCodeGenerator({ text: qrCodeUrl });

    const ticketDetails = `
      <h1>Ticket Confirmation</h1>
      <p><strong>Total Price:</strong> Rp ${totalPrice.toLocaleString()}</p>
      <p><strong>Destinasi:</strong> ${destinationName}</p>
      <p><strong>Passenger Information:</strong></p>
      <ul>
      ${passengers
        .map((passenger) => {
          return `
            <li>
              <strong>${passenger.nama}</strong><br>
              <strong>Email:</strong> ${passenger.email}<br>
              <strong>Phone:</strong> ${passenger.nomor_telepon}<br>
              <strong>Seat:</strong> ${passenger.seat}<br>
              <strong>NIK:</strong> ${passenger.nik}<br>
              <strong>Route:</strong> ${passenger.route}<br>
              <strong>Departure Date:</strong> ${passenger.tanggal}<br>
              <strong>Departure Time:</strong> ${passenger.waktu_berangkat}<br>
              <strong>Arrival Time:</strong> ${passenger.waktu_tiba}
            </li>
          `;
        })
        .join("")}
      </ul>
      <img src="${qrCodeUrl}" alt="QR Code" />
    `;

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "citraratup2004@gmail.com", // Ganti dengan email Anda
        pass: "xdbe mndk zhiv gijp", // Ganti dengan App Password dari Google
      },
    });

    // Configure email options
    const mailOptions = {
      from: "citraratup2004@gmail.com",
      to: passengers.map((p) => p.email).join(", "),
      subject: "Ticket Confirmation",
      html: ticketDetails,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Ticket email sent successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sendTicketEmail:", error);
    return new Response(JSON.stringify({ error: "Failed to send email." }), {
      status: 500,
    });
  }
}
