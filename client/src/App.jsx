import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Balance from "./pages/Balance";
import TransactionsForAccountRecord from "./pages/TransactionsForAccountRecord";
import Logout from "./components/Logout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* implemented route protection in Layout component */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/transactions" element={<Transactions/>}/>
          <Route path="/balance" element={<Balance/>}/>
          <Route path="/balance/:accountRecordId" element={<TransactionsForAccountRecord/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
