import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "user",
  default: {
    id: "",
    name: "",
    location: [],
    staff_id: "",
    staff_name: ""
  },
  effects_UNSTABLE: [persistAtom],
});


//componentで使用する際下記記載
// import { useRecoilState, useRecoilValue } from "recoil";
// import { userState }

// userのみ使用する場合は、25行目
//  const [user, setUser] = useRecoilState(userState);
//  const user = useRecoilValue(userState);