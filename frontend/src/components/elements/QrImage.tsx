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
        width: 200,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      }}
    />
  );
};

export default QrImage;
