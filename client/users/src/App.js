import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RegisterForm } from "./components/RegisterForm";
import { Route, Link } from "react-router-dom";
import { UserList } from "./components/UserList";
import {LoginForm} from './components/LoginForm'
function App() {
  return (
    <div className="App">
      <div>
        <Link to ="/login">
          Login
        </Link>
        <Link to="/">
          Signup
        </Link>
      </div>
      <Route exact path="/">
        <RegisterForm />
      </Route>
      <Route exact path="/users">
        <UserList />
      </Route>
      <Route exact path="/login">
        <LoginForm/>
      </Route>
    </div>
  );
}

export default App;
