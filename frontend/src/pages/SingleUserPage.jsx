import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import userCategories from "../components/user-page/userCategories";
import { useUserStore } from "../store/userStore";

import UserInfo from "../components/user-page/UserInfo";
import CategoryMenu from "../components/CategoryMenu";
import Navbar from "../components/navbar/Navbar";
import Center from "../components/Center";

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
          <div className="w-full mx-auto text-center">
            <p className="text-xl font-medium">
              Carregando... se demorar muito, avise-nos.
            </p>
          </div>
        ) : (
          <>
            <div className="max-w-[440px] mx-auto">
              <UserInfo
                userImage={user.userImage}
                name={user.name}
                username={user.username}
                about={user.about}
              />

              <CategoryMenu categories={userCategories} />
            </div>
          </>
        )}
      </Center>
    </>
  );
};

export default SingleUserPage;
