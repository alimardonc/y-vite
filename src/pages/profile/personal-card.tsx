import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { axiosClient } from "@/lib/axios";
import { cn } from "@/lib/utils";
import type { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface IProps {
  user: IUser;
}

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  profilePicture: z.file().or(z.string()),
});

const PersonalCard = ({ user }: IProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isEdit, setIsEdit] = useState(user.firstName ? false : true);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName ? user.firstName : "",
      lastName: user.lastName ? user.lastName : "",
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    try {
      const { data } = await axiosClient.post("/auth/me", formData);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mx-auto max-w-80 px-2.5 py-2.5">
      {isEdit ? (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2.5"
        >
          <div className="size-25 mx-auto relative rounded-full overflow-hidden group">
            <div
              className={cn(
                "transition-opacity w-full absolute top-0 h-full group-hover:opacity-100 flex items-center justify-center",
                user.avatar ? "bg-card/70 opacity-0" : "bg-card",
              )}
            >
              <Camera size={35} className="text-primary" />
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
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="firstname-input">Firstname</FieldLabel>
                <Input
                  {...field}
                  id="firstname-input"
                  placeholder="firstname"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            disabled={isPending}
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="lastname-input">Lastname</FieldLabel>
                <Input
                  {...field}
                  id="lastname-input"
                  placeholder="lastname"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
      ) : (
        <div>
          <Avatar>
            <AvatarFallback>{user?.firstName?.slice(0, 1)}</AvatarFallback>
            <AvatarImage
              src={user.avatar}
              alt={user.firstName + "profile picture"}
            />
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default PersonalCard;
