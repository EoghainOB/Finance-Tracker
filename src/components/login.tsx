import React, { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { AllContextType } from "../types";
import { AllContext } from "./context";

interface GoogleSignInComponentProps {
  loginSuccess: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => void;
}

const Login: FunctionComponent<GoogleSignInComponentProps> = ({
  loginSuccess,
}) => {
  const { profile, setProfile } = useContext(AllContext) as AllContextType;

  const clientId =
    "229934398154-207ete67jlsqrk8f498asl49dg5h7jvl.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const navigate = useNavigate();

  const onSuccess = async (res: any) => {
    setProfile(res.profileObj.googleId);
    navigate("/overview");
    const data = res.profileObj;
    await fetch(`http://localhost:8080/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  const onFailure = (err: any) => {
    console.log("failed:", err);
  };

  const logOutSuccess = () => {
    //@ts-ignore
    setProfile(null);
    navigate("/");
  };

  return (
    <div>
      {profile ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Log out"
          onLogoutSuccess={logOutSuccess}
        />
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>
  );
};

export default Login;
