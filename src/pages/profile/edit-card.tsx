import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { axiosClient } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import type { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";

interface IProps {
  user: IUser;
}

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { error: "First name must be at least 2 characters" })
    .max(100, { error: "First name must be at most 100 characters" }),
  last_name: z
    .string()
    .min(2, { error: "Last name must be at least 2 characters" })
    .max(100, { error: "Last name must be at most 100 characters" }),
  profilePicture: z.file().or(z.string()).optional(),
});

const PersonalCard = ({ user }: IProps) => {
  const [isPending, setIsPending] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user.first_name ? user.first_name : "",
      last_name: user.last_name ? user.last_name : "",
    },
  });
  const navigate = useNavigate();

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      const { data } = await axiosClient.patch("/auth/me/", {
        ...user,
        ...formData,
      });
      setUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-dvh px-2.5 py-2.5">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2.5 max-w-80 w-full"
      >
        <div className="size-25 mx-auto relative rounded-full overflow-hidden group">
          <div
            className={cn(
              "group",
              "transition-opacity w-full absolute top-0 h-full group-hover:opacity-100 flex items-center justify-center",
              user.avatar ? "bg-card/70 opacity-0" : "bg-card",
            )}
          >
            <Camera
              size={35}
              className="text-primary group-hover:scale-125 transition-all"
            />
          </div>
          {user.avatar && <img src={user.avatar} />}
          <input
            type="file"
            className="w-full h-full absolute opacity-0 cursor-pointer"
            accept="image/*"
          />
        </div>

        <Controller
          disabled={isPending}
          name="first_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="first_name-input">Firstname</FieldLabel>
              <Input
                {...field}
                id="first_name-input"
                placeholder="Firstname"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          disabled={isPending}
          name="last_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="last_name-input">Lastname</FieldLabel>
              <Input
                {...field}
                id="last_name-input"
                placeholder="Lastname"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default PersonalCard;
