import Weather from "./Weather";
import { useTheme } from "../context/ThemeContext";

function Container() {
  const { theme } = useTheme();
  return (
    <main className={`${theme}`}>
      <div className={`container ${theme}`}>
        <Weather />
      </div>
      <footer>
        <div id="copyright">
          Made with <span style={{ color: "#e25555" }}>♥ </span>
          <b>Sinan Sarıkaya</b>
        </div>
      </footer>
    </main>
  );
}

export default Container;
