import React from "react";
import Head from "next/head";

interface MyComponentProps {
  title: string;
  description: string;
}

export const Meta: React.FC<MyComponentProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={description} key="title" />
    </Head>
  );
};
