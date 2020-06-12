import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import home from "./pages/home"
import employee from "./pages/employee"
import employee2 from "./pages/employee2"
import company from "./pages/company"
import company2 from "./pages/company2.jsx"
import offers from "./pages/offers"

function App() {
  return <div>
 <Router>
      <Switch>
        <Route path="/employee" component={employee}/>
        <Route path="/employee2" component={employee2}/>
        <Route path="/company" component={company}/>
        <Route path="/company2" component={company2}/>
        <Route path="/offers" component={offers}/>
        <Route path="/" component={home} />
      </Switch>
    </Router>
  </div>;
}

export default App;
