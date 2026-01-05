import ProfileContent from "@/components/profile-page/profile-content";
import ProfileHeader from "@/components/profile-page/profile-header";

const Profile = () => {
  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
};

export default Profile;
