import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

import { useUserStore } from "../store/userStore";

import Navbar from "../components/navbar/Navbar";
import Center from "../components/Center";
import { Eye, MessageCircle, NotebookPen, ThumbsUp } from "lucide-react";

const SingleUserPage = () => {
  const [user, setUser] = useState(null);

  const { fetchUserProfile } = useUserStore();

  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await fetchUserProfile(username);
        setUser(fetchedUser);
      } catch (error) {
        console.error(error);
      }
    };

    if (username) {
      getUser();
    }
  }, [username, fetchUserProfile]);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Center>
        {user === null ? (
          <p>Carregando...</p>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center mx-auto max-w-[440px]">
              <img
                src={`${user.userImage || "./avatar2.png"}`}
                className="w-[100px] shadow-md rounded-full mx-auto"
              />
              <p className="font-medium text-xl mt-5">{user.name}</p>
              <h1 className="font-light text-primary-orange">
                @{user.username}
              </h1>

              <p className="text-sm p-3 md:text-base bg-light-grey rounded-[20px] mt-5">
                {user.about}
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
          </>
        )}
      </Center>
    </>
  );
};

export default SingleUserPage;
