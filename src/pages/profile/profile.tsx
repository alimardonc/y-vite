import { useAuthStore } from "@/store/auth";
import PersonalCard from "./personal-card";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) return;
  return (
    <div className="">
      <PersonalCard user={user} />
      {/*<div></div>*/}
    </div>
  );
};

export default Profile;
