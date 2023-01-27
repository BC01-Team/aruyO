import QrReader  from "./QrCamera";


export default function ScanModal({ open, onRequestClose, setResult }) {
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
