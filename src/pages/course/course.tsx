import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import type { ICourse } from "@/types";
import Loading from "@/components/ui/loading";

const Course = () => {
  const params = useParams();
  const { data, isLoading } = useQuery<ICourse>({
    queryKey: ["COURSE", params.id],
    queryFn: async () => {
      const res = await axiosClient.get("/courses/" + params.id);
      return res.data;
    },
  });

  if (isLoading || !data) return <Loading />;

  console.log(data);
  return <>{data.name}</>;
};

export default Course;
