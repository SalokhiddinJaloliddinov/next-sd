import React from "react";
import { NextPage } from "next";
import MainLayout from "../../components/MainLayout";
import { useForm } from "react-hook-form";
import { CreateTicketDto } from "../../utils/api/types";
import { Api } from "../../utils/api";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { Meta } from "../../components/Meta";
import { useRouter } from "next/router";

interface MyComponentProps {}

const CreateTicketPage: NextPage = () => {
  const router = useRouter();
  const form = useForm({
    mode: "onChange",
  });
  const userData = useAppSelector(selectUserData);
  const onSubmit = async (dto: CreateTicketDto) => {
    try {
      const data = await Api().ticket.create(dto);
      const ticket = Object.values(data.objects)[0];
      console.log(ticket);
      await router.push(`/tickets/${ticket.fields.finalclass}/${ticket.key}`);
      // console.log(data);
    } catch (err) {
      console.warn("Register error", err);
      if (err.response) {
        console.log(err.response);
      }
    }
  };
  return (
    <MainLayout>
      <Meta title={"Создание Заявки"} description={"Создание Заявки"} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input
          {...form.register("title")}
          type={"text"}
          placeholder={"title"}
        />
        <input
          {...form.register("description")}
          type={"text"}
          placeholder={"description"}
        />
        <input
          {...form.register("caller_id")}
          type={"number"}
          placeholder={"caller_id"}
        />
        <input
          {...form.register("class")}
          type={"text"}
          placeholder={"class"}
        />
        <button type={"submit"}>Push</button>
      </form>
    </MainLayout>
  );
};

export default CreateTicketPage;
