import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import type { IUser } from "@/types";
import { cva, type VariantProps } from "class-variance-authority";
import { S3_URL } from "@/lib/axios";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

const sizes = cva("", {
  variants: {
    size: {
      sm: "size-8",
      default: "size-10",
      lg: "size-12",
      extraLarge:
        "size-30 [&_[data-slot='avatar-fallback']]:text-4xl [&_[data-slot='avatar-fallback']]:font-bold",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const AvatarWrapper = ({
  user,
  className,
  size,
}: {
  user: IUser | null;
  className?: string;
} & VariantProps<typeof sizes>) => {
  return (
    <Avatar className={cn(sizes({ size }), className)}>
      <AvatarFallback>
        {user?.first_name?.slice(0, 1) + "" + user?.last_name?.slice(0, 1)}
      </AvatarFallback>
      <AvatarImage
        src={S3_URL + user?.avatar}
        alt={user?.first_name + "profile picture"}
      />
    </Avatar>
  );
};

export { Avatar, AvatarImage, AvatarFallback, AvatarWrapper };
