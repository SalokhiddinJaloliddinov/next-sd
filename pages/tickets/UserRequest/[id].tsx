import React from "react";
import { GetServerSideProps } from "next";
import { Api } from "../../../utils/api";

function UserRequest({ ticketData }) {
  return <div>{JSON.stringify(ticketData)}</div>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.params;
    const ticketData = await Api(ctx).ticket.getOneRequest(id);
    if (!ticketData) {
      return {
        props: {},
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    return {
      props: {
        ticketData,
      },
    };
  } catch (err) {
    console.log(err);
  }
  return {
    props: {},
  };
};

export default UserRequest;
