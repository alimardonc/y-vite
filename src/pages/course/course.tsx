import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import Centered from "@/components/ui/centered";
import { Spinner } from "@/components/ui/spinner";
import type { ICourse } from "@/types";

const Course = () => {
  const params = useParams();
  const { data, isLoading } = useQuery<ICourse>({
    queryKey: ["COURSE", params.id],
    queryFn: async () => {
      const res = await axiosClient.get("/courses/" + params.id);
      return res.data;
    },
  });

  if (isLoading || !data)
    return (
      <Centered>
        <Spinner className="size-15" />
      </Centered>
    );

  console.log(data);
  return <>{data.name}</>;
};

export default Course;
