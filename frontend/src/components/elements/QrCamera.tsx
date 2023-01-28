import { useZxing } from "react-zxing";

type Props = {
  setResult: React.Dispatch<React.SetStateAction<string>>;
  onRequestClose: () => void;
};

const QrCamera = ({ setResult, onRequestClose }: Props) => {
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
      onRequestClose();
    },
  });

  return <video ref={ref} />;
};

export default QrCamera;
