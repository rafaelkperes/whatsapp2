import type { NextPage } from "next";
import Header from "../components/header";
import Main from "../layouts/Main";

const Home: NextPage = () => {
  return (
    <Main pageTitle="Home">
      <Header />
      <h1>WhatsApp2</h1>
    </Main>
  );
};

export default Home;
