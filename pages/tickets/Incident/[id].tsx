import React from "react";
import { GetServerSideProps } from "next";
import { Api } from "../../../utils/api";
import { useRouter } from "next/router";
import MainLayout from "../../../components/MainLayout";
import { Meta } from "../../../components/Meta";
import { PublicLog, SingleTicket, UserData } from "../../../utils/api/types";
import { TicketPage } from "../../../components/TicketPage";
import { store, wrapper } from "../../../redux/store";

interface IncidentProps {
  ticketData: SingleTicket;
  userData: UserData;
}

const Incident: React.FC<IncidentProps> = ({ ticketData, userData }) => {
  return (
    <MainLayout>
      <Meta
        title={ticketData.ref + " " + ticketData.finalclass}
        description={ticketData.ref}
      />
      <div className={"px-6 mt-4"}>
        <TicketPage ticketData={ticketData} userData={userData} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      // @ts-ignore
      const { id } = ctx.params;
      const ticketData = await Api(ctx).ticket.getOne(id, "incident");

      if (!ticketData) {
        return {
          props: {},
          redirect: {
            destination: "/404",
            permanent: false,
          },
        };
      }

      const userData = store.getState().user.data;
      return {
        props: {
          ticketData,
          userData,
        },
      };
    } catch (err) {
      console.log(err);
    }
    return {
      props: {},
    };
  });

export default Incident;
