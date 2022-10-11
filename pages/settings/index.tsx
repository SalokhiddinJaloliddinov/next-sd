import React from "react";
import MainLayout from "../../components/MainLayout";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function SettingsPage(props) {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const form = useForm({
    defaultValues: {
      name: "",
      hame: "",
      test: "",
      test2: "",
      mest: "",
      mest2: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const testPush = () => {
    router.push({
      pathname: "/tickets",
      query: { caller_name: "Mamarayim" },
    });
  };
  return (
    <MainLayout>
      <Head>
        <title>Настройки</title>
      </Head>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete={false}>
        {step === 0 ? (
          <div className={"bg-amber-50 py-2"}>
            <input
              {...form.register("name")}
              placeholder={"name"}
              name={"name"}
            />
            <input
              {...form.register("hame")}
              placeholder={"hame"}
              name={"hame"}
            />
            <button
              onClick={() => setStep(1)}
              className={"p-2 bg-black text-white rounded"}
              type={"button"}
            >
              Next
            </button>
          </div>
        ) : step === 1 ? (
          <div
            className={"bg-red-300 py-2 transition-all duration-500 ease-out"}
          >
            <input
              {...form.register("test")}
              placeholder={"test"}
              name={"test"}
            />
            <input
              {...form.register("test2")}
              placeholder={"test2"}
              name={"test2"}
            />
            <button
              onClick={() => setStep(0)}
              className={"p-2 bg-black text-white rounded"}
              type={"button"}
            >
              Previous
            </button>
            <button
              onClick={() => setStep(2)}
              className={"p-2 bg-black text-white rounded"}
              type={"button"}
            >
              Next
            </button>
          </div>
        ) : step === 2 ? (
          <>
            <div className={"bg-cyan-200 py-2"}>
              <input
                {...form.register("mest")}
                placeholder={"mest"}
                name={"mest"}
              />
              <input
                {...form.register("mest2")}
                placeholder={"mest2"}
                name={"mest2"}
              />
            </div>
            <button
              onClick={() => setStep(1)}
              className={"p-2 bg-black text-white rounded"}
              type={"button"}
            >
              Previous
            </button>
            <button type={"submit"} className={"bg-green-200 py-2 px-5"}>
              Go!
            </button>
          </>
        ) : (
          ""
        )}
      </form>
      <button onClick={() => testPush()}>Test Push</button>
    </MainLayout>
  );
}

export default SettingsPage;
