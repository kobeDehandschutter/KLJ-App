
import { useNavigate } from 'react-router-dom';
import { Leiding } from '../pages/home';
import React from 'react';

const LoginButton = ({leiding, onclick}: {leiding: Leiding, onclick: (id:string) => void} ) => {
    const navigate = useNavigate();

    
    return (
            <div key={leiding.id} className='h-16 w-40 rounded bg-white' onClick={() => onclick(leiding.id.toString())}>
            <h1 className="">{leiding.firstname} {leiding.lastname}</h1>
            </div>
    );
};

export default LoginButton;
