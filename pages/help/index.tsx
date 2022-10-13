import React from "react";
import MainLayout from "../../components/MainLayout";

interface MyComponentProps {}

const HelpPage: React.FC<MyComponentProps> = () => {
  return (
    <MainLayout>
      <h1>FAQ</h1>
    </MainLayout>
  );
};

export default HelpPage;
