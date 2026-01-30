import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("dark") === "true";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark", dark);
  }, [dark]);

  return [dark, setDark];
}
