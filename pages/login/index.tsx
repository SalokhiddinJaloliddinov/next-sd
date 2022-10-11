import React from "react";
import "./login.module.css";

import sd_logo from "../../public/static/images/sd_logo.png";
import Image from "next/image";
import Link from "next/link";
import { Meta } from "../../components/Meta";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginDto } from "../../utils/api/types";
import { Api } from "../../utils/api";
import { setCookie } from "nookies";
import { selectUserData, setUserData } from "../../redux/slices/user";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

function LoginPage() {
  const router = useRouter();
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const form = useForm({
    mode: "onChange",
  });
  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await Api().user.login(dto);
      setCookie(null, "sd_token", data.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      dispatch(setUserData(data));
      console.log(dto);
    } catch (err) {
      console.warn("Register error", err);
      if (err.response) {
        console.log(err.response);
      }
    }
  };

  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <Meta title={"Войти в Service Desk"} description={"Login page"} />
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
          <Image src={sd_logo} height={166} width={166} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Войдите в свой аккаунт
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Введите данные для входа
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Логин
                </label>
                <div className="mt-1">
                  <input
                    {...form.register("login")}
                    id="login"
                    name="login"
                    autoComplete="login"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:pink-800 focus:border-pink-800 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Пароль
                </label>
                <div className="mt-1">
                  <input
                    {...form.register("password")}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-800 focus:border-pink-800 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-pink-800 focus:ring-pink-900 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Запомнить меня
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Забыли свой пароль?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-800 hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-800"
                >
                  Войти в ServiceDesk
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default LoginPage;
