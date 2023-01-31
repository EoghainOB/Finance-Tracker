import React from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/header';
import Home from './components/home';
import Overview from './components/overview';
import Expenses from './components/expenses';
import Income from './components/income';
import Footer from './components/footer';
import './App.css';

function App() {

  return (
    <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/income" element={<Income />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
