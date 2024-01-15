
import { useNavigate } from 'react-router-dom';
import { Leiding } from '../pages/home';
import React from 'react';

const LoginButton = ({leiding, onclick}: {leiding: Leiding, onclick: (id:string) => void} ) => {
  const image = '../../public/profilePics/' + leiding.firstname  + leiding.lastname.replace(' ', '') +'.jpg';
  
  
    
    return (
            <div key={leiding.id} className='w-20 h-20 md:w-40 md:h-40  rounded bg-white flex justify-between' onClick={() => onclick(leiding.id)}>
            <div className="avatar">
              <div className="w-full h-full rounded">
                 <img  src={image} alt={leiding.firstname + " " + leiding.lastname} ></img>
              </div>
            </div>
            </div>
    );
};

export default LoginButton;
