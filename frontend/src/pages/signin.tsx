import React, { useState } from "react";
import { useAuth } from "../context/auth";


const Signin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-amber-700">
          ログイン
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-amber-700 bg-white border rounded-md focus:border-amber-400 focus:ring-amber-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-amber-700 bg-white border rounded-md focus:border-amber-400 focus:ring-amber-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a
            // href="#"
            className="text-xs text-amber-600 hover:underline"
          >
            パスワードを忘れた方
          </a>
          <div className="mt-6">
            <button
              onClick={onSignin}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-amber-700 rounded-md hover:bg-amber-600 focus:outline-none focus:bg-amber-600"
            >
              ログイン
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          会員登録は
          <a href="#" className="font-medium text-amber-600 hover:underline">
            こちら
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
