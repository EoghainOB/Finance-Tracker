import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { gapi } from 'gapi-script';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login';
import { AllContextType, userTypes } from '../types';
import { AllContext } from './context';

interface GoogleSignInComponentProps { 
    loginSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void; 
    } 

const Login: FunctionComponent<GoogleSignInComponentProps> = ({ loginSuccess }) => {

const [ profile, setProfile ] = useState<userTypes>()

// const { profile, setProfile } = useContext(AllContext) as AllContextType

const clientId = '229934398154-207ete67jlsqrk8f498asl49dg5h7jvl.apps.googleusercontent.com';

useEffect(() => {
    const initClient = () => {
        gapi.auth2.init({
        clientId: clientId,
        scope: ''
        });
    };
    gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res: any) => {
        setProfile(res.profileObj);
    };

    const onFailure = (err: any) => {
        console.log('failed:', err);
    };

    const logOut = () => {
        //@ts-ignore
        setProfile(null);
    };

  return (
    <div>
        {profile ?
        <div>
            <p>Name: {profile.name}</p>
            <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
        </div>
        :
        <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
        }
    </div>
  )
}

export default Login
