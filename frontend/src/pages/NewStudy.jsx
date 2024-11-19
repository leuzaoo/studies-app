import imageCompression from "browser-image-compression";
import { ToastContainer, toast } from "react-toastify";
import { useState, useCallback } from "react";
import { Select, Switch } from "antd";

import LabelFormTitle from "../components/LabelFormTitle";
import InputNewStudy from "../components/InputNewStudy";
import { useStudyStore } from "../store/studyStore";
import TextEditor from "../components/TextEditor";
import Navbar from "../components/navbar/Navbar";
import TitlePage from "../components/TitlePage";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Center from "../components/Center";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DEFAULT_BANNER_IMAGE = "./bannerImage.jpg";

const compressImage = async (file) => {
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};

const NewStudy = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
    tags: [],
    bannerImage: "",
    isPublic: false,
  });

  const { createStudy } = useStudyStore();
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (field) => (e) => {
      const value = e.target ? e.target.value : e;
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("O tamanho da imagem deve ser máximo de 4MB.");
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Formato da imagem inválido. Use JPEG, PNG ou WEBP.");
      return;
    }

    try {
      const compressedFile = await compressImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, bannerImage: reader.result }));
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Erro ao comprimir a imagem: ", error);
      toast.error("Erro ao processar a imagem. Tente novamente mais tarde.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title,
      description,
      content,
      category,
      tags,
      bannerImage,
      isPublic,
    } = formData;

    try {
      const res = await createStudy(
        title,
        description,
        content,
        category,
        tags,
        bannerImage,
        isPublic
      );

      if (res?.startsWith("2")) {
        setTimeout(() => {
          navigate("/my-studies");
        }, 1500);
      }
    } catch (error) {
      console.error("Erro ao criar estudo: ", error);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <Center>
          <TitlePage text="Criar novo estudo" />
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col">
            <LabelFormTitle text="Banner" />
            <div className="flex items-center mb-3 gap-5 max-w-max">
              <img
                src={formData.bannerImage || DEFAULT_BANNER_IMAGE}
                className="w-[200px] h-[112px] shadow-lg rounded-xl object-cover object-center"
                alt="Banner preview"
              />
              <div className="flex flex-col">
                <input
                  type="file"
                  id="bannerImage"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  className="text-sm cursor-pointer bg-cyan-600 text-primary-bg px-3 py-2 rounded-lg hover:bg-cyan-500 transition-all duration-200"
                  htmlFor="bannerImage"
                >
                  Mudar imagem
                </label>
              </div>
            </div>

            <LabelFormTitle text="Título" />
            <InputNewStudy
              onChange={handleInputChange("title")}
              value={formData.title}
              placeholder="Escreva um título interessante"
              className="mb-3"
            />

            <LabelFormTitle text="Descrição" />
            <InputNewStudy
              onChange={handleInputChange("description")}
              value={formData.description}
              placeholder="Resuma o que você quer contar"
              className="mb-3"
            />

            <LabelFormTitle text="Categoria" />
            <Select
              defaultValue=""
              style={{ width: 160, marginBottom: 12, fontSize: 20 }}
              onChange={handleInputChange("category")}
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

            <LabelFormTitle text="Tags" />
            <Select
              mode="tags"
              allowClear
              suffixIcon={null}
              notFoundContent={null}
              style={{ width: "100%", marginBottom: 14 }}
              placeholder="Termos para os usuários encontrarem o seu estudo"
              onChange={handleInputChange("tags")}
              value={formData.tags}
            />

            <LabelFormTitle text="Visibilidade" />
            <div className="flex flex-col items-start gap-3 mb-5">
              <Switch
                checked={formData.isPublic}
                onChange={(checked) => {
                  setFormData((prev) => ({ ...prev, isPublic: checked }));
                }}
                style={{ width: "100%", marginTop: "4px" }}
                checkedChildren="Público"
                unCheckedChildren="Privado"
              />
            </div>

            <LabelFormTitle text="Conteúdo" />
            <TextEditor
              value={formData.content}
              onChange={handleInputChange("content")}
            />

            <Button className="mt-5" type="submit" content="Finalizar" />
          </form>
        </Center>
      </div>
    </>
  );
};

export default NewStudy;
