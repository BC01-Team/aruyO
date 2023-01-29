import { ReactNode } from "react";
import { useQRCode } from "next-qrcode";


type Props = { qrText: string };

const QrImage = ({ qrText }: Props) => {
  const { Canvas } = useQRCode();
  return (
    <Canvas
      text={qrText}
      options={{
        level: "M",
        margin: 3,
        scale: 4,
        width: 120,
        color: {
          dark: "#010599FF",
          light: "#FFBF60FF",
        },
      }}
    />
  )
};

export default QrImage;
