import Weather from "./Weather";
import { useTheme } from "../context/ThemeContext";

function Container() {
  const { theme } = useTheme();
  return (
    <div>
      <div className="container">
        <Weather />
      </div>
      <footer>
        <div id="copyright">
          Made with <span style={{ color: "#e25555" }}>♥ </span>
          <b>Sinan Sarikaya</b>
        </div>
      </footer>
    </div>
  );
}

export default Container;
