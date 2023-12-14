import { Leiding } from '@/pages/home';
import React from 'react';

const Header = ( {leiding, logout}: {leiding: Leiding|undefined, logout: ()=>void}) => {

    return ( 
    <>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Welkom {leiding?.firstname?? "????"} {leiding?.lastname?? "????"}</a>
                </div>
            
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box">
                        <li onClick={() => logout()}><a>Logout</a></li>
                    </ul>
                </div>
                </div>
        </>
    );
};

export default Header;
