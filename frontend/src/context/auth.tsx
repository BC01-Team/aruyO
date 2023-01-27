import {
  createContext,
  ReactNode,
  useState,
  useContext,
} from "react";
import axios from "axios";

export type UserType = any | null;

export type AuthProps = {
  children: ReactNode;
}

export type AuthContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  login: any,
  logout: any
};


const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props:any) => {
  const { children } = props;
  const [user, setUser] = useState(null);

  const login = (email: string, password: string) => {
    const data = {
      email: email,
      password: password,
    };
      axios
        .post("http://localhost:8888/login", data, { withCredentials: true })
        .then((res) => {
          console.log(res.data.user);
          setUser(res.data.user);
        })
        .catch((e) => {
          console.log(e);
          alert("メールアドレスまたはパスワードを確認してください");
        });
  }  

  console.log("auth.tsx,user",user)

  const logout = () => {
    axios
      .post("http://localhost:8888/logout", { withCredentials: true })
      .then((res) =>
      {
        console.log(res.data.user);
        setUser(null);
      })
  } 
  
  const value = {
    user,
    setUser,
    login,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};