
import { Leiding } from '../pages/home';
import React, {useState, useEffect} from 'react';
import LoginButton from './LoginButton';

const Login = ({onclick}: {onclick: (id:string) => void} ) => {

    const [leiding, setLeiding]= useState<Leiding[]>()
    useEffect(() => {
        const fetchData = async () => {
          
            try {
              const response = await fetch('http://localhost:5009/api/leiding');
              const data: Leiding[] = await response.json();
              setLeiding(data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
      }, [])

    return (
        
        <div className="flex gap-14 w-fit flex-wrap">
            {leiding?.map((l) => (
            <LoginButton leiding={l} onclick={onclick}/>
        ))}
        {leiding?.map((l) => (
            <LoginButton leiding={l} onclick={onclick}/>
        ))}
        {leiding?.map((l) => (
            <LoginButton leiding={l} onclick={onclick}/>
        ))}
        {leiding?.map((l) => (
            <LoginButton leiding={l} onclick={onclick}/>
        ))}
        {leiding?.map((l) => (
            <LoginButton leiding={l} onclick={onclick}/>
        ))}
        {leiding?.map((l) => (
            <LoginButton leiding={l} onclick={onclick}/>
        ))}
        {leiding?.map((l) => (
            <LoginButton leiding={l} onclick={onclick}/>
        ))}
        {leiding?.map((l) => (
            <LoginButton leiding={l} onclick={onclick}/>
        ))}
        </div>
    );
};

export default Login;
