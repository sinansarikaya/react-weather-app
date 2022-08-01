import Weather from "./Weather";
import { useTheme } from "../context/ThemeContext";

function Container() {
  const { theme } = useTheme();
  return (
    <div className={`App ${theme}`}>
      <Weather />
    </div>
  );
}

export default Container;
