import React from 'react'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import Login from './login'

const Header = () => {

return (
    <header>
      <h1>Finance</h1>
      <Login loginSuccess={function (response: GoogleLoginResponse | GoogleLoginResponseOffline): void {
      throw new Error('Function not implemented.')
    } } />
    </header>
  )
}

export default Header