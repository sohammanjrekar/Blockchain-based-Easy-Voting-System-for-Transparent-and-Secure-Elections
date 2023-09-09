import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Web3 from "web3";

// Import your custom components
import Home from "./components/Home";
import VoterRegistration from "./components/VoterRegistration";
import CandidateRegistration from "./components/CandidateRegistration";
import Voting from "./components/Voting";
import ElectionResults from "./components/ElectionResults";
import AuthorityPage from "./components/AuthorityPage";

function App() {
  return (
    <div className="App">
      <Router>
        {/* Navigation menu */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/voter-registration">Voter Registration</Link>
            </li>
            <li>
              <Link to="/candidate-registration">Candidate Registration</Link>
            </li>
            <li>
              <Link to="/voting">Voting</Link>
            </li>
            <li>
              <Link to="/election-results">Election Results</Link>
            </li>
            <li>
              <Link to="/authority">Authority Page</Link>
            </li>
          </ul>
        </nav>

        {/* Define routes for your pages */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/voter-registration" component={VoterRegistration} />
          <Route
            path="/candidate-registration"
            component={CandidateRegistration}
          />
          <Route path="/voting" component={Voting} />
          <Route path="/election-results" component={ElectionResults} />
          <Route path="/authority" component={AuthorityPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
