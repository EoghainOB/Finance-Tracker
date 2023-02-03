import React from "react";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import Login from "./login";

const Header = () => {
  return (
    <header>
      <div className="loginButton">
        <Login
          loginSuccess={function (
            response: GoogleLoginResponse | GoogleLoginResponseOffline
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <h1>Mynance</h1>
      <h2>PERSONAL FINANCE TRACKER</h2>
    </header>
  );
};

export default Header;
