import { useAuthStore } from "@/store/auth";
import EditCard from "./edit-card";
import { Navigate } from "react-router";
import { AvatarWrapper } from "@/components/ui/avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const [isEdit, setIsEdit] = useState(user?.first_name ? false : true);
  if (!user) return <Navigate to="/login" />;

  if (isEdit) return <EditCard user={user} />;

  return (
    <div className="flex gap-2 bg-card rounded-md p-3 w-max">
      <AvatarWrapper user={user} size="extraLarge" />
      <div className="flex gap-2">
        <h2 className="text-3xl font-bold">
          {user?.first_name} {user?.last_name}
        </h2>
        <Button onClick={() => setIsEdit(true)} variant="secondary">
          <Pencil />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default Profile;
