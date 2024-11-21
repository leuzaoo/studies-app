import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import userCategories from "../components/user-page/userCategories";
import { useUserStore } from "../store/userStore";

import UserCategoryMenu from "../components/user-page/UserCategoryMenu";
import { useMetricsStore } from "../store/metricsStore";
import UserInfo from "../components/user-page/UserInfo";
import Navbar from "../components/navbar/Navbar";
import Center from "../components/Center";

const SingleUserPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [user, setUser] = useState(null);

  const { fetchSingleUserStudiesCount } = useMetricsStore();
  const { fetchUserProfile } = useUserStore();
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await fetchUserProfile(username);
        setUser(fetchedUser);

        if (fetchedUser && fetchedUser._id) {
          const userMetrics = await fetchSingleUserStudiesCount(
            fetchedUser._id
          );
          setMetrics(userMetrics);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário ou métricas:", error);
      }
    };

    if (username) {
      getUser();
    }
  }, [username, fetchUserProfile, fetchSingleUserStudiesCount]);

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
                studiesCount={metrics?.totalStudies}
              />

              <UserCategoryMenu categories={userCategories} />
            </div>
          </>
        )}
      </Center>
    </>
  );
};

export default SingleUserPage;
