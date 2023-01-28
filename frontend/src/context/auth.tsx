import {
  createContext,
  ReactNode,
  useState,
  useContext,
} from "react";
import { axiosInstance } from "../lib/axiosInstance";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../lib/atom"

type User = {
  id: string;
  name: string;
  location: [];
  staff_id: string;
  staff_name: string;
};

type UserType = User | null;

type AuthProps = {
  children: ReactNode;
}

type AuthContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  login: any
  logout: () => void;
};


const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props: AuthProps) => {
  const router = useRouter();
  const { children } = props;
  const [user, setUser] = useRecoilState(userState);

  const login = (email: string, password: string) => {
    const data = {
      email: email,
      password: password,
    };
    axiosInstance
      .post("/login", data, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        router.push(`/mypage`);
      })
      .catch((e) => {
        console.log(e);
        alert("メールアドレスまたはパスワードを確認してください");
      });
  };

  console.log("auth.tsx,user", user);

  const logout = () => {
    axiosInstance
      .post("/logout", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(null);
        router.push("/");
      })
      .catch((e) => console.log(e));
  };

  const value = {
    user,
    setUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

