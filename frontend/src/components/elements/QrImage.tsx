import { ReactNode } from "react";
import { useQRCode } from "next-qrcode";


type Props = { qrText: string };

const QrImage = ({ qrText }: Props) => {
  const { Canvas } = useQRCode();
  return (
  <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
    <Canvas
      text={qrText}
      options={{
        level: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#010599FF",
          light: "#FFBF60FF",
        },
      }}
    />
  </div>
  )
};

export default QrImage;
