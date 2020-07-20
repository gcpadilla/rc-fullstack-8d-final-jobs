import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import home from "./pages/home";
import login_employe from "./pages/login_employe.jsx";
import register_employe from "./pages/register_employe";
import company from "./pages/company";
import company2 from "./pages/company2.jsx";
import offers from "./pages/offers";
// import OffersId from "./pages/OffersId"
import FaqsCandidates from "./pages/faqsCandidates";
import FaqBusiness from "./pages/FaqsBusiness";
import FormJobPostulate from "./components/FormJobPostulate";
import Prices from "./pages/Prices";
import WeAre from './pages/Weare'
import Contacto from './pages/Contacto'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/faqcandidates" component={FaqsCandidates} />
          <Route path="/login_employe" component={login_employe} />
          <Route path="/register_employe" component={register_employe} />
          <PrivateRoute path="/company" component={company} />
          <PrivateRoute path="/profile" component={company2} />
          {/* <Route path="/offers/:id" component={OffersId}/> */}
          <Route path="/offers" component={offers} />
          <Route path="/faqbusiness" exact component={FaqBusiness} />
          <Route path="/prices" component={Prices} />
          <PrivateRoute path="/publicJob" component={FormJobPostulate} />
          <Route path="/informacion" component={WeAre}/>
          <Route path="/prensa" />
          <Route path="/contacto" component={Contacto} />
          <Route path="/" component={home} />
          <Route exact path="/">
            <Redirect from="/" to="/home" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
