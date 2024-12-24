// import { useQRCode } from "next-qrcode";
// import { useMemo } from "react";

// interface QRCodeProps {
//   text: string;
// }

// const QRCodeGenerator: React.FC<QRCodeProps> = ({ text }) => {
//   const { Canvas } = useQRCode();

//   // Mengenerate QR code sebagai base64 image
//   const qrCodeImage = useMemo(() => {
//     return Canvas({ text, options: { margin: 2, width: 200 } });
//   }, [text]);

//   return <img src={`data:image/png;base64,${qrCodeImage}`} alt="QR Code" />;
// };

// export default QRCodeGenerator;
