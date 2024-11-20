import { Eye, MessageCircle, NotebookPen, ThumbsUp } from "lucide-react";
import { Popover } from "antd";

const UserInfo = ({ userImage, name, username, about }) => {
  return (
    <section
      className="flex flex-col items-center justify-center mx-auto max-w-[440px]"
      aria-labelledby="user-info-title"
    >
      <figure>
        <img
          src={`${userImage || "./avatar2.png"}`}
          alt={`${name || "Avatar"}'s profile`}
          className="w-[100px] shadow-md rounded-full mx-auto"
        />
      </figure>

      <h1 className="font-medium text-xl mt-5 md:text-2xl md:font-semibold">
        {name}
      </h1>

      <p className="font-light md:font-medium md:text-lg text-primary-orange">
        @{username}
      </p>

      {about && (
        <p
          className="text-sm p-3 md:text-lg bg-light-grey rounded-[20px] mt-5"
          aria-label="About user"
        >
          {about}
        </p>
      )}

      <section
        className="mt-5 w-full flex justify-between gap-5"
        aria-label="User statistics"
      >
        <h1 className="hidden">Métricas do usuário</h1>
        <Popover
          content={
            <span className="font-semibold text-primary-orange text-xl">
              9876
            </span>
          }
          title="Curtidas"
        >
          <article
            className="cursor-pointer bg-light-grey rounded-[20px] w-full min-h-[72px] flex flex-col items-center justify-center"
            aria-label="User likes"
          >
            <h1 className="hidden">Curtidas</h1>
            <span className="mb-2 font-medium text-xl text-primary-orange">
              10K
            </span>
            <ThumbsUp color="grey" size={20} />
          </article>
        </Popover>

        <Popover
          title="Visualizações"
          content={
            <span className="font-semibold text-primary-orange text-xl">
              37690
            </span>
          }
        >
          <article
            className="cursor-pointer bg-light-grey rounded-[20px] w-full min-h-[72px] flex flex-col items-center justify-center"
            aria-label="User views"
          >
            <h1 className="hidden">Visualizações</h1>
            <span className="mb-2 font-medium text-xl text-primary-orange">
              38K
            </span>
            <Eye color="grey" size={20} />
          </article>
        </Popover>

        <Popover
          title="Estudos"
          content={
            <span className="font-semibold text-primary-orange text-xl">
              88
            </span>
          }
        >
          <article
            className="cursor-pointer bg-light-grey rounded-[20px] w-full min-h-[72px] flex flex-col items-center justify-center"
            aria-label="User studies"
          >
            <h1 className="hidden">Estudos</h1>
            <span className="mb-2 font-medium text-xl text-primary-orange">
              88
            </span>
            <NotebookPen color="grey" size={20} />
          </article>
        </Popover>

        <Popover
          title="Comentários"
          content={
            <span className="mb-2 font-medium text-xl text-primary-orange">
              59
            </span>
          }
        >
          <article
            className="cursor-pointer bg-light-grey rounded-[20px] w-full min-h-[72px] flex flex-col items-center justify-center"
            aria-label="User comments"
          >
            <h1 className="hidden">Comentários no perfil</h1>
            <span className="mb-2 font-medium text-xl text-primary-orange">
              59
            </span>
            <MessageCircle color="grey" size={20} />
          </article>
        </Popover>
      </section>
    </section>
  );
};

export default UserInfo;
