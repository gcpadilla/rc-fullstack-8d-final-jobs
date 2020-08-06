import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import home from "./pages/home";
import login_employe from "./pages/login_employe.jsx";
import register_employe from "./pages/register_employe";
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
          <Route exact path="/faqcandidates" component={FaqsCandidates} />
          <Route exact path="/login_employe" component={login_employe} />
          <Route exact path="/register_employe" component={register_employe} />
          <PrivateRoute exact path="/company" component={company} />
          <Route exact path="/PerfilUser" component={PerfilUser}/>
          <Route exact path="/offers" component={offers} />
          <Route exact path="/faqbusiness" exact component={FaqBusiness} />
          <Route exact path="/prices" component={Prices} />
          <PrivateRoute exact path="/publicJob" component={FormJobPostulate} />
          <Route exact path="/informacion" component={WeAre}/>
          <Route exact path="/contacto" component={Contacto} />
          <Route exact path="/" component={home} />
          <Route component={FourZeroFour} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
