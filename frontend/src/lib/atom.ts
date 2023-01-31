import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "user",
  default: undefined,
  // default: {
  //   id: null,
  //   name: null,
  //   location: null,
  //   staff_id: null,
  //   staff_name: null,
  // },
  effects_UNSTABLE: [persistAtom],
});


//componentで使用する際下記記載
// import { useRecoilState, useRecoilValue } from "recoil";
// import { userState }

// userのみ使用する場合は、25行目
//  const [user, setUser] = useRecoilState(userState);
//  const user = useRecoilValue(userState);


// 検索結果を入れるためのstate
export const searchState = atom({
  key:"search",
  default:undefined
  });