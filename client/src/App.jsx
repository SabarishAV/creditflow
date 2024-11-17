import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import AccountRecordTransactions from "./pages/AccountRecordTransactions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/transactions/:id" element={<AccountRecordTransactions/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
