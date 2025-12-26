import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldLabel,
  // FieldSeparator,
} from "@/components/ui/field";
import { axiosClient } from "@/lib/axios";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth";
import { AxiosError } from "axios";
// import { FaGithub, FaGoogle } from "react-icons/fa";

const formSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(50, { message: "Password must be at most 50 characters" }),
});

const LoginClient = () => {
  const [exists, setExists] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      const reqUrl = exists ? "/auth/login/" : "/auth/register/";
      const { data } = await axiosClient.post(reqUrl, formData);
      login(data);
      toast.success(exists ? "Login successful!" : "Registration successful!");
      navigate("/dashboard");
    } catch (error: typeof AxiosError | unknown) {
      if (error instanceof AxiosError) {
        if (error?.status === 401) {
          toast.error("Unauthorized");
        }
      } else {
        console.error("Something went wrong");
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-dvh">
      <form
        key={exists ? "login" : "register"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card rounded-md p-5 flex flex-col justify-center items-center max-w-80 w-full gap-3"
      >
        <h3 className="text-xl font-bold">
          {exists ? "Welcome back" : "Sign Up"}
        </h3>
        {/*<Field>
          <Button variant="outline">
            <FaGoogle />
            {exists ? "Login with Google" : "Sign up with Google"}
          </Button>
          <Button variant="outline">
            <FaGithub />
            {exists ? "Login with Github" : "Sign up with Github"}
          </Button>
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-1.5">
            Or continue with
          </FieldSeparator>
        </Field>*/}
        <Controller
          disabled={isPending}
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-email"
                placeholder="john@example.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          disabled={isPending}
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-password">Password</FieldLabel>
              <Input type="password" placeholder="password" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              Loading...
              <Spinner />{" "}
            </>
          ) : exists ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <div className="flex justify-center w-full text-sm text-muted-foreground gap-2">
          {exists ? "Don't have an account?" : "Have an account?"}
          <span
            className="underline cursor-pointer"
            onClick={() => setExists((prev) => !prev)}
          >
            {exists ? "Sign up" : "Login"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginClient;
