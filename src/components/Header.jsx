import { useEffect, useState } from "react";
import Button from "./Button";
import User from "./User";

const body = document.body.classList;
function Header() {
  const [theme, setTheme] = useState(function () {
    return localStorage.getItem("Theme") === "pink" ? "pink" : "blue";
  });
  useEffect(
    function () {
      if (theme === "pink") body.add("pink-theme");
      else body.add("blue-theme");
      localStorage.setItem("Theme", theme);
    },
    [theme]
  );

  function handleChangeTheme() {
    setTheme(theme => (theme === "pink" ? "blue" : "pink"));
    body.toggle("pink-theme");
    body.toggle("blue-theme");
  }

  return (
    <header id='header'>
      <Button type={`btn-theme ${theme}`} onClick={handleChangeTheme}>
        <span>Blue</span> <span>Pink</span>
      </Button>
      <User />
    </header>
  );
}

export default Header;
