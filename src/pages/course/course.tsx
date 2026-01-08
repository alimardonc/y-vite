import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import Centered from "@/components/ui/centered";
import { Spinner } from "@/components/ui/spinner";
import type { ICourse } from "@/types";
import { AvatarWrapper } from "@/components/ui/avatar";
import { Check, Cloud, Star, Timer } from "lucide-react";

const Course = () => {
  const params = useParams();
  const { data, isLoading } = useQuery<ICourse>({
    queryKey: ["course", params.id],
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

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <div className="mt-20 max-w-md text-center">
        <h1 className="text-4xl max-md:text-2xl font-bold">{data?.name}</h1>
        <p className="text-muted-foreground max-md:text-sm my-4">
          {data?.desc}
        </p>
      </div>
      <div className="flex max-xl:flex-col max-xl:gap-10 justify-around items-center w-full mt-5">
        <div className="bg-card flex justify-center gap-2 p-3 border rounded-md">
          <AvatarWrapper user={data.owner} className="size-20" />
          <div className="flex flex-col">
            <span>Author</span>
            <h2 className="text-xl font-bold">
              {data?.owner?.first_name} {data?.owner?.last_name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {data?.owner?.email}
            </p>
          </div>
        </div>
        <Button size="lg">Start the course</Button>
        <div className="bg-card grid grid-cols-2 p-4 gap-4 rounded-md border">
          <div className="[&>p]:text-xl [&>span]:text-muted-foreground flex flex-col gap-1">
            <Timer size={35} className="text-yellow-400" />
            <p>40 Hours</p>
            <span>of content</span>
          </div>
          <div className="[&>p]:text-xl [&>span]:text-muted-foreground flex flex-col gap-1">
            <Check size={35} className="text-yellow-400" />
            <p>75 Addicting</p>
            <span>lessons</span>
          </div>
          <div className="[&>p]:text-xl [&>span]:text-muted-foreground flex flex-col gap-1">
            <Star size={35} className="text-yellow-400" />
            <p>Earn a certificate</p>
            <span>of completion</span>
          </div>
          <div className="[&>p]:text-xl [&>span]:text-muted-foreground flex flex-col gap-1">
            <Cloud size={35} className="text-yellow-400" />
            <p>Learn online</p>
            <span>at your pace</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
