import { ToastContainer } from "react-toastify";

import TextEditor from "../components/TextEditor";
import TitlePage from "../components/TitlePage";
import Navbar from "../components/Navbar";
import Center from "../components/Center";

const NewStudy = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="max-w-4xl mx-auto ">
        <Center>
          <TitlePage text={"Criar novo estudo"} />

          <section className="mt-5">
            <TextEditor />
          </section>
        </Center>
      </div>
    </>
  );
};

export default NewStudy;
