import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" exact component={Dashboard} />
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;