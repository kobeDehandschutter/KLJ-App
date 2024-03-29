import { Leiding } from '@/pages/home';
import React from 'react';

const Header = ( {leiding, logout}: {leiding: Leiding, logout: ()=>void}) => {
    
  const image = '../../public/profilePics/' + leiding.firstname  + leiding.lastname.replace(' ', '') +'.jpg';
  

    return ( 
    <>
        <div className="navbar bg-lichtBlauw">
            <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Welkom {leiding.firstname?? "????"}</a>
                </div>
            
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img alt={leiding.firstname + " " + leiding.lastname} src={image} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box">
                        <li onClick={() => logout()}><a>Logout</a></li>
                    </ul>
                </div>
                </div>
        </>
    );
};

export default Header;
