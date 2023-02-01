import React, { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
import ScanModal from "@/components/elements/ScanModal";
import QrCamera from "@/components/elements/QrCamera";
import axios from "axios";
import Button from "@/components/elements/Button";
type Props = {
  result: string,
  setResult: React.Dispatch<React.SetStateAction<string>>;
  status:string
};

const QrReader = ({ 
  result,
  setResult,
  status
}:Props) => {
  
  // Modal の開閉
  const [open, setOpen] = useState<boolean>(false);
  const onClickToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      {status === "予約確定" ? (
        <Button onClick={onClickToggle}>チェックインの手続き</Button>
      ) : (
        <Button onClick={onClickToggle}>チェックアウトをする</Button>
      )}
      <ScanModal
        open={open}
        onRequestClose={() => setOpen(false)}
        setResult={setResult}
      />
    </div>
  );
}

export default QrReader;
