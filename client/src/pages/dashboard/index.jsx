import { Navbar } from "@/components/Navbar";
import { ProductViews } from "@/components";
import React from "react";
import Head from "next/head";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar />
      <ProductViews />
    </>
  );
};

export default Dashboard;
