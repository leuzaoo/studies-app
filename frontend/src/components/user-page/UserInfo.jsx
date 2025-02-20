import { Eye, MessageCircle, NotebookPen, ThumbsUp } from "lucide-react";
import { Popover } from "antd";

const UserInfo = ({ userImage, name, username, about, studiesCount }) => {
  return (
    <section
      className="mx-auto flex max-w-[440px] flex-col items-center justify-center"
      aria-labelledby="user-info-title"
    >
      <figure>
        <img
          src={`${userImage || "./avatar2.png"}`}
          alt={`${name || "Avatar"}'s profile`}
          className="mx-auto w-[100px] rounded-full shadow-md"
        />
      </figure>

      <h1 className="mt-5 text-xl font-medium md:text-2xl md:font-semibold">
        {name}
      </h1>

      <p className="font-light text-primary-orange md:text-lg md:font-medium">
        @{username}
      </p>

      {about && (
        <p
          className="mt-5 w-full rounded-[20px] bg-light-grey p-3 text-sm md:text-lg"
          aria-label="About user"
        >
          {about}
        </p>
      )}

      <section
        className="mt-5 flex w-full justify-between gap-5"
        aria-label="User statistics"
      >
        <h1 className="hidden">Métricas do usuário</h1>
        <Popover
          content={
            <span className="text-xl font-semibold text-primary-orange">
              9876
            </span>
          }
          title="Curtidas"
        >
          <article
            className="flex min-h-[72px] w-full cursor-pointer flex-col items-center justify-center rounded-[20px] bg-light-grey"
            aria-label="User likes"
          >
            <h1 className="hidden">Curtidas</h1>
            <span className="mb-2 text-xl font-medium text-primary-orange">
              10K
            </span>
            <ThumbsUp color="grey" size={20} />
          </article>
        </Popover>

        <Popover
          title="Visualizações"
          content={
            <span className="text-xl font-semibold text-primary-orange">
              37690
            </span>
          }
        >
          <article
            className="flex min-h-[72px] w-full cursor-pointer flex-col items-center justify-center rounded-[20px] bg-light-grey"
            aria-label="User views"
          >
            <h1 className="hidden">Visualizações</h1>
            <span className="mb-2 text-xl font-medium text-primary-orange">
              38K
            </span>
            <Eye color="grey" size={20} />
          </article>
        </Popover>

        <Popover
          title="Estudos"
          content={
            <span className="text-xl font-semibold text-primary-orange">
              {studiesCount}
            </span>
          }
        >
          <article
            className="flex min-h-[72px] w-full cursor-pointer flex-col items-center justify-center rounded-[20px] bg-light-grey"
            aria-label="User studies"
          >
            <h1 className="hidden">Estudos</h1>
            <span className="mb-2 text-xl font-medium text-primary-orange">
              {studiesCount}
            </span>
            <NotebookPen color="grey" size={20} />
          </article>
        </Popover>

        <Popover
          title="Comentários"
          content={
            <span className="mb-2 text-xl font-medium text-primary-orange">
              59
            </span>
          }
        >
          <article
            className="flex min-h-[72px] w-full cursor-pointer flex-col items-center justify-center rounded-[20px] bg-light-grey"
            aria-label="User comments"
          >
            <h1 className="hidden">Comentários no perfil</h1>
            <span className="mb-2 text-xl font-medium text-primary-orange">
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
