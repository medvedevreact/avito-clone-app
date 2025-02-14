import { Routes, Route, Navigate } from "react-router-dom";
import { List } from "./pages/List/List";
import { Form } from "./pages/Form/Form";
import { Item } from "./pages/Item/Item";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import "./index.css";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<List />} />
          <Route path="/form" element={<Form />} />
          <Route path="/item/:id" element={<Item />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
