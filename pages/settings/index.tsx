import React from "react";
import MainLayout from "../../components/MainLayout";
import Head from "next/head";

function SettingsPage(props) {
  return (
    <MainLayout>
      <Head>
        <title>Настройки</title>
      </Head>
      Settings
    </MainLayout>
  );
}

export default SettingsPage;
