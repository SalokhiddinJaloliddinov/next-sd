import React from "react";
import { GetServerSideProps } from "next";
import { Api } from "../../../utils/api";
import { Meta } from "../../../components/Meta";
import MainLayout from "../../../components/MainLayout";
import { PublicLog, SingleTicket } from "../../../utils/api/types";
import { DownloadIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { TicketPage } from "../../../components/TicketPage";

interface DeliveryRequestProps {
  ticketData: SingleTicket;
  publicLog: PublicLog[];
}

const DeliveryRequest: React.FC<DeliveryRequestProps> = ({
  ticketData,
  publicLog,
}) => {
  return (
    <MainLayout>
      <Meta
        title={ticketData.ref + " " + ticketData.finalclass}
        description={ticketData.ref}
      />
      <div className={"px-6 mt-4"}>
        <TicketPage ticketData={ticketData} publicLog={publicLog} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    // @ts-ignore
    const { id } = ctx.params;
    const ticketData = await Api(ctx).ticket.getOne(id, "delivery-request");
    if (!ticketData) {
      return {
        props: {},
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    const publicLog = await Api(ctx).ticket.getPublicLog(
      id,
      "delivery-request"
    );
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

export default DeliveryRequest;
