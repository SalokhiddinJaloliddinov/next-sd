import React from "react";
import { NextPage } from "next";
import MainLayout from "../../components/MainLayout";
import { useForm } from "react-hook-form";
import { CreateTicketDto } from "../../utils/api/types";
import { Api } from "../../utils/api";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { parseCookies } from "nookies";
import { Meta } from "../../components/Meta";

interface MyComponentProps {}

const CreateTicketPage: NextPage = () => {
  const form = useForm({
    mode: "onChange",
  });
  const userData = useAppSelector(selectUserData);
  const onSubmit = async (dto: CreateTicketDto) => {
    try {
      const data = await Api().ticket.create(dto);
      console.log(data);
      console.log(Object.values(data.objects)[0].key);
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
