import "./App.css";
import Container from "./components/Container";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <div className="App">
      <WeatherProvider>
        <Container />
      </WeatherProvider>
    </div>
  );
}

export default App;
