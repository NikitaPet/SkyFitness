import { Routes, Route } from "react-router-dom";
import Exercise from "./pages/exercise";
import Main from "./pages/main/index";
import LoginPage from "./pages/loginPage";
import SelectWorkout from "./components/selectWorkout/SelectWorkout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SelectWorkout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={"<Registration />"} />
      <Route path="/description" element={"<Description />"} />
      <Route path="/profile" element={"<Profile />"} />
      <Route path="/exercise" element={<Exercise />} />
    </Routes>
  );
}