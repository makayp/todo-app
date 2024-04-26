import { useState } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import User from "./User";

function Header() {
  return (
    <header id='header'>
      <User />
    </header>
  );
}

export default Header;
