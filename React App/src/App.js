import React from "react";
import "./App.css";
import Home from "./containers/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarZubi from './components/NavbarZubi/NavbarZubi'
import { Navbar } from "reactstrap";

function App() {
  return (
    <div className="App">
    <NavbarZubi/>
      <Home />
    </div>
  );
}

export default App;
