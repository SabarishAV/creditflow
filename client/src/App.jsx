import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
