import { useParams, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Select, Switch } from "antd";

import InputNewStudy from "../components/InputNewStudy.jsx";
import LabelFormTitle from "../components/LabelFormTitle";
import { useStudyStore } from "../store/studyStore.js";
import { useAuthStore } from "../store/authStore.js";
import Navbar from "../components/navbar/Navbar.jsx";
import TextEditor from "../components/TextEditor";
import TitlePage from "../components/TitlePage";
import Center from "../components/Center.jsx";
import Button from "../components/Button";

const EditStudyPage = () => {
  const { fetchSingleStudy, updateStudy } = useStudyStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const userId = user._id;
  const { id } = useParams();

  const [loadedStudy, setLoadedStudy] = useState(null);
  const [description, setDescription] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

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

      if (file) {
        const options = {
          maxSizeMB: 4,
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
          console.error("Erro ao comprimir imagem:", error);
          toast.error(
            "Erro ao processar a imagem. Tente novamente mais tarde."
          );
        }
      }
    }
  };

  useEffect(() => {
    const getStudy = async () => {
      try {
        const fetchedStudy = await fetchSingleStudy(id);
        if (fetchedStudy.author._id === userId) {
          setDescription(fetchedStudy.description);
          setBannerImage(fetchedStudy.bannerImage);
          setCategory(fetchedStudy.category);
          setIsPublic(fetchedStudy.isPublic);
          setContent(fetchedStudy.content);
          setLoadedStudy(fetchedStudy);
          setTitle(fetchedStudy.title);
          setTags(fetchedStudy.tags);
        } else {
          navigate("/not-authorized");
        }
      } catch (error) {
        console.error("Erro ao buscar estudo:", error);
      }
    };

    getStudy();
  }, [id, fetchSingleStudy, userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("estado de Visibibilidade", isPublic);

    const updatedData = {
      title,
      description,
      content,
      category,
      tags,
      bannerImage,
      isPublic,
    };

    try {
      await updateStudy(id, updatedData);
      toast.success("Estudo atualizado com sucesso!");
      navigate(`/my-studies`);
    } catch (error) {
      toast.error("Erro ao atualizar estudo.");
    }
  };

  const handleChange = (value) => {
    setCategory(value);
  };

  const handleTagsChange = (value) => {
    setTags(value);
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Center>
        {loadedStudy ? (
          <>
            <TitlePage text={"Modo de edição"} />
            <form onSubmit={handleSubmit}>
              <div>
                <LabelFormTitle text="Banner" />
                <div className="flex items-center mt-2 gap-5 max-w-max">
                  {bannerImage ? (
                    <>
                      <img
                        src={bannerImage}
                        className="object-cover object-center w-[200px] h-[112px] rounded-xl shadow-lg"
                        alt="banner image"
                      />

                      <div className="flex flex-col">
                        <input
                          type="file"
                          id="bannerImage"
                          className="hidden"
                          onChange={handleBannerImageChange}
                        />
                        <label
                          className="text-sm md:text-base cursor-pointer bg-cyan-600 text-primary-bg px-2 py-2 rounded-lg hover:bg-cyan-500 transition-all duration-200"
                          htmlFor="bannerImage"
                        >
                          Alterar banner
                        </label>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>Estudo sem banner</p>
                      <div className="flex flex-col">
                        <input
                          type="file"
                          id="bannerImage"
                          className="hidden"
                          onChange={handleBannerImageChange}
                        />
                        <label
                          className="text-sm md:text-base cursor-pointer bg-cyan-600 text-primary-bg px-2 py-2 rounded-lg hover:bg-cyan-500 transition-all duration-200"
                          htmlFor="bannerImage"
                        >
                          Adicionar
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col my-5">
                <LabelFormTitle text={"Título"} />
                <InputNewStudy
                  className={"mb-3"}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <LabelFormTitle text={"Descrição"} />
                <InputNewStudy
                  className={"mb-3"}
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <LabelFormTitle text={"Categoria"} />
                <Select
                  value={category}
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
                  suffixIcon={null}
                  mode="tags"
                  style={{ width: "100%", marginBottom: 14 }}
                  placeholder="Guerra, Nazismo, Judeus"
                  onChange={handleTagsChange}
                  value={tags}
                  notFoundContent={null}
                />

                <LabelFormTitle text={"Visibibilidade"} />
                <Switch
                  checked={isPublic}
                  onChange={(checked) => setIsPublic(checked)}
                  checkedChildren="Público"
                  unCheckedChildren="Privado"
                  style={{ marginBottom: 12 }}
                />

                <TextEditor value={content} onChange={setContent} />

                <Button
                  className={"mt-5"}
                  type="submit"
                  primary
                  content={"Atualizar"}
                />
              </div>
            </form>
          </>
        ) : (
          <div>Sem autorização para acessar esta página.</div>
        )}
      </Center>
    </>
  );
};

export default EditStudyPage;
