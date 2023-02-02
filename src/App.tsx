import React, { useContext } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/header";
import Home from "./components/home";
import Overview from "./components/overview";
import Footer from "./components/footer";
import { AllContext } from "./components/context";
import { AllContextType } from "./types";
import { Navigate } from "react-router-dom";
import Expensespage from "./components/expensespage";
import Incomepage from "./components/incomepage";
import "./App.css";

function App() {
  const { profile } = useContext(AllContext) as AllContextType;

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        {profile && <Route path="/overview" element={<Overview />} />}
        {profile && <Route path="/expenses" element={<Expensespage />} />}
        {profile && <Route path="/income" element={<Incomepage />} />}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
