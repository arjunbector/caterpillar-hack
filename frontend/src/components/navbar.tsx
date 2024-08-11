import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  return (
    <nav className="flex bg-primary py-5">
      <MaxWidthWrapper>
        <h1 className="font-bold text-3xl uppercase">Inspect.AI</h1>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
