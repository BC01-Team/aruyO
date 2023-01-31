import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/auth";
import QrImage from "../../../elements/QrImage"

type Props = { qrText: string };

const QrGenerator = ({ qrText }: Props) => {
  return (
    <>
      <QrImage qrText={qrText} />
    </>
  );
};

export default QrGenerator;
