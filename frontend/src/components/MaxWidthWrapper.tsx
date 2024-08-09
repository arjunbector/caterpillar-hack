import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
type Props = {
  className?: string;
  children?: ReactNode;
};
const MaxWidthWrapper = ({ className, children }: Props) => {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl px-5", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
