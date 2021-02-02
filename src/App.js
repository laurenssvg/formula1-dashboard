import React from "react";
import "./styles/globals.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import DriverList from "./components/DriverList";
import CircuitList from "./components/CircuitList";
import SeasonList from "./components/SeasonList";

const App = () => {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/seasons" component={SeasonList}></Route>
          <Route exact path="/drivers" component={DriverList}></Route>
          <Route exact path="/circuits" component={CircuitList}></Route>
        </Switch>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
