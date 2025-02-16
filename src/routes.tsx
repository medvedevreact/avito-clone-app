import { Navigate } from "react-router-dom";
import { List } from "./pages/List/List";
import { Item } from "./pages/Item/Item";
import { Form } from "./pages/Form/Form";

export const routes = [
  { path: "/", element: <Navigate to="/list" replace /> },
  { path: "/list", element: <List /> },
  { path: "/form", element: <Form /> },
  { path: "/item/:id", element: <Item /> },
];
