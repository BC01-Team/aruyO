import QrReader  from "./QrCamera";

type Props = {
  open: boolean;
  onRequestClose: () => void;
  setResult: React.Dispatch<React.SetStateAction<string>>
};


export default function ScanModal({ open, onRequestClose, setResult }:Props) {
  return (
    <>
      {open ? (
        <div>
          <QrReader setResult={setResult} onRequestClose={onRequestClose} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
