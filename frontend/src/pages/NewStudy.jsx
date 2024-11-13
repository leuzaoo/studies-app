import imageCompression from "browser-image-compression";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Select } from "antd";

import LabelFormTitle from "../components/LabelFormTitle";
import InputNewStudy from "../components/InputNewStudy";
import { useStudyStore } from "../store/studyStore";
import TextEditor from "../components/TextEditor";
import Navbar from "../components/navbar/Navbar";
import TitlePage from "../components/TitlePage";
import Button from "../components/Button";
import Center from "../components/Center";

const NewStudy = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [content, setContent] = useState();
  const [tags, setTags] = useState([]);

  const { createStudy } = useStudyStore();
  const navigate = useNavigate();

  const handleBannerImageChange = async (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 4 * 1024 * 1024;

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("O tamanho da imagem deve ser máximo de 4MB.");
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Formato da imagem inválido. Use JPEG, PNG ou WEBP.");
        return;
      }

      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerImage(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Erro ao comprimir a imagem: ", error);
        toast.error("Erro ao processar a imagem. Tente novamente mais tarde.");
      }
    }
  };

  const handleChange = (value) => {
    setCategory(value);
  };

  const handleTagsChange = (value) => {
    setTags(value);
  };

  const handleCreateStudy = async (e) => {
    e.preventDefault();

    try {
      await createStudy(
        title,
        description,
        content,
        category,
        tags,
        bannerImage
      );
      navigate("/my-studies");
    } catch (error) {
      console.log("Erro ao clicar no botão de criar estudo: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <Center>
          <TitlePage text={"Criar novo estudo"} />
          <form onSubmit={handleCreateStudy} className="mt-5 flex flex-col">
            <LabelFormTitle text={"Banner"} />
            <div className="flex items-center mb-3 gap-5 max-w-max">
              <img
                src={bannerImage || "./bannerImage.jpg"}
                className="w-[200px] h-[112px] shadow-lg rounded-xl object-cover object-center"
                alt="user profile image"
              />
              <div className="flex flex-col">
                <input
                  type="file"
                  id="bannerImage"
                  className="hidden"
                  onChange={handleBannerImageChange}
                />
                <label
                  className="text-sm cursor-pointer bg-cyan-600 text-primary-bg px-3 py-2 rounded-lg hover:bg-cyan-500 transition-all duration-200"
                  htmlFor="bannerImage"
                >
                  Mudar imagem
                </label>
              </div>
            </div>
            <LabelFormTitle text={"Título"} />
            <InputNewStudy
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className={"mb-3"}
              placeholder={"Escreva um título interessante"}
            />

            <LabelFormTitle text={"Descrição"} />
            <InputNewStudy
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              className={"mb-3"}
              placeholder={"Resuma o que você quer contar"}
            />

            <LabelFormTitle text={"Categoria"} />
            <Select
              defaultValue=""
              style={{
                width: 160,
                marginBottom: 12,
                fontSize: 20,
              }}
              onChange={handleChange}
              options={[
                { value: "Política", label: "Política" },
                { value: "Esportes", label: "Esportes" },
                { value: "Programação", label: "Programação" },
                { value: "Ciência", label: "Ciência" },
                { value: "História", label: "História" },
                { value: "Arte", label: "Arte" },
                { value: "Outros", label: "Outros" },
              ]}
            />

            <LabelFormTitle text={"Tags"} />
            <Select
              allowClear
              suffixIcon={null}
              mode="tags"
              style={{
                width: "100%",
                marginBottom: 14,
              }}
              placeholder="Termos para os usuários encontrarem o seu estudo"
              onChange={handleTagsChange}
              value={tags}
              notFoundContent={null}
            />

            <TextEditor value={content} onChange={setContent} />

            <Button className="mt-5" type="submit" content={"Finalizar"} />
          </form>
        </Center>
      </div>
    </>
  );
};

export default NewStudy;
