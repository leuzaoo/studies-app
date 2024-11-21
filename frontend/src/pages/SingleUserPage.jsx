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

  const { fetchUserStudiesCount } = useMetricsStore();
  const { fetchUserProfile } = useUserStore();
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await fetchUserProfile(username);
        setUser(fetchedUser);

        const userMetrics = await fetchUserStudiesCount();
        console.log(userMetrics);
        setMetrics(userMetrics);
      } catch (error) {
        console.error(error);
      }
    };

    if (username) {
      getUser();
    }
  }, [username, fetchUserProfile, fetchUserStudiesCount]);

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
