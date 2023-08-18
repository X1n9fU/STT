import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import DepartureLocation from "./components/DepartureLocation";
import SetArrivalLocation from './components/SetArrivalLocation';
import LoginPage from './components/LoginPage';
import CallingPage from './components/CallingPage';

function App() {
  
  return (
      <Routes>
        <Route path={"/"} element={<LoginPage />}></Route>
        <Route path={"/departureLocation"} element={<DepartureLocation />}></Route>
        <Route path={"/arrivalLocation"} element={<SetArrivalLocation />}></Route>
        <Route path={"/callingPage"} element={<CallingPage />}></Route>
      </Routes>
  );
}

export default App;