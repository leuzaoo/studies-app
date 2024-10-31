import { ToastContainer } from "react-toastify";

import { MenuDropdown, MenuItem } from "../components/MenuDropdown";
import TextEditor from "../components/TextEditor";
import TitlePage from "../components/TitlePage";
import Navbar from "../components/Navbar";
import Center from "../components/Center";
import Input from "../components/Input";
import { useState } from "react";

const menu = {
  closed: {
    scale: 0,
    transition: {
      delay: 0.15,
    },
  },

  open: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.4,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const item = {
  variants: {
    closed: { x: -16, opacity: 0 },
    open: { x: 0, opacity: 1 },
  },

  transition: { opacity: { duration: 0.2 } },
};

const NewStudy = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="max-w-4xl mx-auto ">
        <Center>
          <TitlePage text={"Criar novo estudo"} />
          <div className="mt-5">
            <Input placeholder={"Título"} />
            <MenuDropdown
              label="Options"
              open={open}
              setOpen={setOpen}
              animate={open ? "open" : "closed"}
              initial="closed"
              exit="closed"
              variants={menu}
            >
              <MenuItem {...item}>Edit</MenuItem>
              <MenuItem {...item}>Share</MenuItem>
              <MenuItem {...item}>Delete</MenuItem>
              <MenuItem {...item}>Report</MenuItem>
            </MenuDropdown>
          </div>
          <section className="mt-5">
            <TextEditor
              label="Options"
              open={open}
              setOpen={setOpen}
              animate={open ? "open" : "closed"}
              initial="closed"
              exit="closed"
              variants={menu}
            />
          </section>
        </Center>
      </div>
    </>
  );
};

export default NewStudy;
