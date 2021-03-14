import { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import ThemeSelector from "./ThemeSelector";
import Wikipedia from "./Wikipedia";
import classNames from "classnames";

import "./../css/App.css";

const App = () => {
  const [theme, setTheme] = useState("theme-white");

  useEffect(() => {
    document.body.className = theme;

    return () => (document.body.className = "");
  }, [theme]);

  return (
    <Container
      className={classNames({
        "theme-white": theme === "theme-white",
        "theme-green": theme === "theme-green",
        "theme-blue": theme === "theme-blue",
        "theme-red": theme === "theme-red",
        "theme-orange": theme === "theme-orange",
      })}
    >
      <ThemeSelector setTheme={setTheme} />
      <Wikipedia></Wikipedia>
    </Container>
  );
};

export default App;
