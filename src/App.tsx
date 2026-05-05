import { Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<h1 className="text-3xl font-bold underline">Party Pulse</h1>}
      />
      <Route path="/login" element={<LoginScreen />} />
    </Routes>
  );
}

export default App;
