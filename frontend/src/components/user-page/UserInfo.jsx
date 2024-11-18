import { Eye, MessageCircle, NotebookPen, ThumbsUp } from "lucide-react";

const UserInfo = ({ userImage, name, username, about }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-[440px]">
      <img
        src={`${userImage || "./avatar2.png"}`}
        className="w-[100px] shadow-md rounded-full mx-auto"
      />
      <p className="font-medium text-xl mt-5 md:text-2xl md:font-semibold">
        {name}
      </p>
      <h1 className="font-light md:font-medium md:text-lg text-primary-orange">
        @{username}
      </h1>

      <p className="text-sm p-3 md:text-lg bg-light-grey rounded-[20px] mt-5">
        {about}
      </p>

      <div className="mt-5 w-full flex justify-between gap-5">
        <div className="bg-light-grey rounded-[20px] w-full min-h-[72px] flex flex-col items-center justify-center">
          <span className="mb-2 font-medium text-xl text-primary-orange">
            10K
          </span>
          <ThumbsUp color="grey" size={20} />
        </div>
        <div className="bg-light-grey rounded-[20px] w-full min-h-[72px] flex flex-col items-center justify-center">
          <span className="mb-2 font-medium text-xl text-primary-orange">
            38K
          </span>
          <Eye color="grey" size={20} />
        </div>
        <div className="bg-light-grey rounded-[20px] w-full min-h-[72px] flex flex-col items-center justify-center">
          <span className="mb-2 font-medium text-xl text-primary-orange">
            88
          </span>
          <NotebookPen color="grey" size={20} />
        </div>
        <div className="bg-light-grey rounded-[20px] w-full min-h-[72px] flex flex-col items-center justify-center">
          <span className="mb-2 font-medium text-xl text-primary-orange">
            59
          </span>
          <MessageCircle color="grey" size={20} />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
