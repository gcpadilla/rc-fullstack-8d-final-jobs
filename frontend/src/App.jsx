import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import home from "./pages/home";
import loginEmploye from "./pages/loginEmploye.jsx";
import registerEmploye from "./pages/registerEmploye";
import company from "./pages/company";
import offers from "./pages/offers";
import PerfilUser from "./pages/PerfilUser"
import FaqsCandidates from "./pages/faqsCandidates";
import FaqBusiness from "./pages/FaqsBusiness";
import FormJobPostulate from "./components/FormJobPostulate";
import Prices from "./pages/Prices";
import WeAre from './pages/Weare'
import Contacto from './pages/Contacto'
import FourZeroFour from './components/FourZeorFour'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/faqcandidates" exact component={FaqsCandidates} />
          <Route path="/loginEmploye" exact component={loginEmploye} />
          <Route path="/registerEmploye" exact component={registerEmploye} />
          <PrivateRoute path="/company" exact component={company} />
          <Route path="/PerfilUser" exact component={PerfilUser}/>
          <Route path="/offers" exact component={offers} />
          <Route path="/faqbusiness" exact component={FaqBusiness} />
          <Route path="/prices" exact component={Prices} />
          <PrivateRoute path="/publicJob" exact component={FormJobPostulate} />
          <Route path="/informacion" exact component={WeAre}/>
          <Route path="/contacto" exact component={Contacto} />
          <Route path="/" exact component={home} />
          <Route component={FourZeroFour} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
