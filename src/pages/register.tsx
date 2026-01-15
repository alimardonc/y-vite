import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { axiosClient } from "@/lib/axios";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth";
import { AxiosError } from "axios";

const formSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(50, { message: "Password must be at most 50 characters" }),
  })
  .extend({
    confirmPassword: z.string({ error: "Passwords do not match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      const reqUrl = "/auth/register/";
      const { data } = await axiosClient.post(reqUrl, formData);
      login(data);
      toast.success("Registration successful!");
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
        key={"register"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card rounded-md p-5 flex flex-col justify-center items-center max-w-80 w-full gap-3"
      >
        <h3 className="text-xl font-bold">Sign Up</h3>
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
              <Input type="password" placeholder="********" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input type="password" {...field} placeholder="********" />
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
          ) : (
            "Sign Up"
          )}
        </Button>
        <div className="flex justify-center w-full text-sm text-muted-foreground gap-2">
          Have an account?
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
