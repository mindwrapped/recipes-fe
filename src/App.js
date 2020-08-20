import React from 'react';
import './App.css';
import ToolBar from './components/ToolBar';
import Home from './containers/Home';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './containers/Login';
import FAQ from './containers/FAQ';
import About from './containers/About';
import Explore from './containers/Explore';
import NotFound from './containers/NotFound';
import AppContext from "./libs/contextLib";
import { Auth } from 'aws-amplify';
import { onError } from './libs/errorLib';
import SignUp from './containers/SignUp';
import Create from './containers/Create';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isAuthenticated: false,
      isAuthenticating: true
    };

    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    this.onLoad();
  }

  async onLoad() {
    try {
      // Check if the user is currently logged in
      await Auth.currentSession();
      this.setState({isAuthenticated: true});
    } catch (e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }

    this.setState({isAuthenticating: false});
  }

  render() {
    return (!this.state.isAuthenticating &&
      <>
        <AppContext.Provider value={{ state: this.state, userHasAuthenticated: (bool) => this.setState({ isAuthenticated: bool }) }}>
          <ToolBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/explore" component={Explore} />
            <Route path="/faq" component={FAQ} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create" component={Create} />
            <Route path='/404' component={NotFound} />
            <Redirect to='/404' />
          </Switch>
        </AppContext.Provider>
      </>);
  }
}
