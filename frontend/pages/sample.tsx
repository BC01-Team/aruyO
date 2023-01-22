// fastapiとのget接続確認用　接続ok 削除可です

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function sample(){
    const [message, setMessage] = useState<string>("")

    const onClickButton = async () => {
    await axios
      .get("http://localhost:8888")
      .then((res) => {
        console.log(res);
        setMessage(res.data.test);
      })
      .catch((error) => {
        console.log(error);
      });
  };


    return (
        <>
            <button onClick={onClickButton}>
                fastapi_get_ck用ボタン
            </button>
            <p>res.data: {message}</p>
        </>
    )
}

