import { GetServerSidePropsContext, NextPageContext } from "next";
import Cookies, { parseCookies } from "nookies";
import axios from "axios";
import { UserApi } from "./user";
import { TicketApi } from "./ticket";

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  ticket: ReturnType<typeof TicketApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext) => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.sd_token;

  const instance = axios.create({
    baseURL: "http://localhost:7777",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const apis = {
    user: UserApi,
    ticket: TicketApi,
  };

  const result = Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);

  return result;
};
