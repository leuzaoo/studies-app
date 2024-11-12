import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import { Edit3, Ellipsis, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";
import { useEffect } from "react";

import "react-confirm-alert/src/react-confirm-alert.css";
import "../assets/react-alert.css";

import MyStudiesStudyCard from "../components/MyStudiesStudyCard";
import { useStudyStore } from "../store/studyStore";
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/navbar/Navbar";
import TitlePage from "../components/TitlePage";
import Center from "../components/Center";

const MyStudies = () => {
  const { user } = useAuthStore();
  const { fetchUserStudies, deleteStudy, studies, error, isLoading } =
    useStudyStore();

  useEffect(() => {
    fetchUserStudies();
  }, [fetchUserStudies]);

  const handleDelete = (id) => {
    confirmAlert({
      title: "Você tem certeza que deseja excluir este conteúdo?",
      buttons: [
        {
          label: "Sim",
          onClick: () => deleteStudyById(id),
        },
        {
          label: "Não",
        },
      ],
    });
  };

  const deleteStudyById = async (id) => {
    if (typeof id !== "string") {
      console.error("ID inválido: ", id);
      return;
    }

    try {
      await deleteStudy(id);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      console.error("Erro ao excluir estudo:", err);
    }
  };

  const renderStudies = () => {
    if (isLoading) {
      return <p>Carregando estudos...</p>;
    }

    if (error) {
      return <p>Ocorreu um erro: {error}</p>;
    }

    if (studies.length === 0) {
      return <p>Você ainda não criou nenhum estudo.</p>;
    }

    return studies.map((study) => (
      <div key={study._id} className="flex items-start justify-between mb-10">
        <MyStudiesStudyCard
          _id={study._id}
          category={study.category}
          username={study.author.username}
          createdAt={study.createdAt}
          title={study.title}
          content={study.content}
        />

        <Dropdown
          overlay={
            <Menu className="flex flex-col space-y-1">
              <Menu.Item key="read">
                <Link to={`/study/${study._id}`}>Ler</Link>
              </Menu.Item>
              <Menu.Item key="edit">
                <Link to={`/study/edit/${study._id}`}>Editar</Link>
              </Menu.Item>
              <Menu.Item
                key="delete"
                onClick={() => handleDelete(study._id)}
                danger
              >
                Excluir
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Ellipsis className="cursor-pointer" />
            </Space>
          </a>
        </Dropdown>
      </div>
    ));
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Center>
        <TitlePage text="Meus estudos" className={"hidden"} />
        <div className="flex items-center justify-start gap-5">
          <img
            src={`${user?.userImage || "/user.jpg"}`}
            className="size-10 rounded-full"
            alt="User image"
          />
          <p className="text-2xl font-semibold">{user?.username}</p>
        </div>
        <div className="w-full h-[1px] bg-terciary-grey opacity-10 mt-5" />
        <div className="mt-5">{renderStudies()}</div>
      </Center>
    </>
  );
};

export default MyStudies;
