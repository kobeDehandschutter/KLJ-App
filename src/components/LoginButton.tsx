
import { useNavigate } from 'react-router-dom';
import { Leiding } from '../pages/home';
import React from 'react';

const LoginButton = ({leiding, onclick}: {leiding: Leiding, onclick: (id:string) => void} ) => {
    const navigate = useNavigate();

    
    return (
            <div key={leiding.id} className='w-20 h-20  rounded bg-white flex justify-between' onClick={() => onclick(leiding.id)}>
            <div className="avatar">
              <div className="w-20 h-20 rounded">
                 <img  src={leiding.image} alt={leiding.firstname + " " + leiding.lastname} ></img>
              </div>
            </div>
            </div>
    );
};

export default LoginButton;
