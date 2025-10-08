import { useRoutes } from "react-router";
import { routes } from "./routes";

const Router = () => {
  return useRoutes(routes);
};

function App() {
  return <Router />;
}

export default App;
