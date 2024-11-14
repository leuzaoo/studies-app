import React from "react";
import Navbar from "../components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import TitlePage from "../components/TitlePage";

const Profile = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />

      <TitlePage text={"Perfil"} />
    </>
  );
};

export default Profile;
