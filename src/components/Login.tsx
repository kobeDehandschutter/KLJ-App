
import { Leiding } from '../pages/home';
import React from 'react';
import LoginButton from './LoginButton';

const Login = ({leiding, onclick}: {leiding: Leiding[], onclick: (id:string) => void} ) => {

  return (
    
    <div className="flex gap-14 w-fit flex-wrap">
        {leiding.map((l) => (
        <LoginButton leiding={l} onclick={onclick}/>
      ))}
      {leiding.map((l) => (
        <LoginButton leiding={l} onclick={onclick}/>
      ))}
      {leiding.map((l) => (
        <LoginButton leiding={l} onclick={onclick}/>
      ))}
      {leiding.map((l) => (
        <LoginButton leiding={l} onclick={onclick}/>
      ))}
      {leiding.map((l) => (
        <LoginButton leiding={l} onclick={onclick}/>
      ))}
      {leiding.map((l) => (
        <LoginButton leiding={l} onclick={onclick}/>
      ))}
      {leiding.map((l) => (
        <LoginButton leiding={l} onclick={onclick}/>
      ))}
      {leiding.map((l) => (
        <LoginButton leiding={l} onclick={onclick}/>
      ))}
    </div>
  );
};

export default Login;
