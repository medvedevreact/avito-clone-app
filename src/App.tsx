import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { routes } from "./routes";

import "./index.css";

function App() {
  return (
    <div className="app">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <div className="main">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
