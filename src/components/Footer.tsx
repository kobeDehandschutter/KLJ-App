/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { FaCog, FaHome } from 'react-icons/fa';
import { RiBeerFill } from 'react-icons/ri';
import { TbPigMoney } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = ({userId}: {userId: string}) => {
  const navigate = useNavigate();
  const { pathname  } = useLocation();

  const onclick = (url: string) => {
    navigate({pathname: url, search: `?id=${userId}`});
  };

  return (
    <div className="btm-nav">
      <button
        type="button"
        className={`bg-donkerblauw text-secondary-content border-lichtBlauw ${pathname === '/settings' && 'active'}`}
        onClick={() => onclick('/settings')}
      >
        <span className="btm-nav-label">
          <FaCog size={30} />
        </span>
      </button>
      <button
        type="button"
        className={`bg-donkerblauw text-secondary-content border-lichtBlauw ${pathname === '/rekening' && 'active'}`}
        onClick={() => onclick('/rekening')}
      >
        <span className="btm-nav-label">
          <TbPigMoney size={30} />
        </span>
      </button>
      <button
        type="button"
        className={`bg-donkerblauw text-secondary-content border-lichtBlauw ${pathname === '/' && 'active'}`}
        onClick={() => onclick('/')}
      >
        <span className="btm-nav-label">
          <FaHome size={30} />
        </span>
      </button>
      <button
        type="button"
        className={`bg-donkerblauw text-secondary-content border-lichtBlauw ${pathname === '/ikDrink' && 'active'}`}
        onClick={() => onclick('/ikDrink')}
      >
        <span className="btm-nav-label">
          <RiBeerFill size={30} />
        </span>
      </button>
      <button
        type="button"
        className={`bg-donkerblauw text-secondary-content border-lichtBlauw ${pathname === '/wijDrinken' && 'active'}`}
        onClick={() => onclick('/wijDrinken')}
      >
        <span className="btm-nav-label">
          <div className="grid grid-cols-2">
            <RiBeerFill />
            <RiBeerFill />
            <RiBeerFill />
            <RiBeerFill />
          </div>
        </span>
      </button>
    </div>
  );
};

export default Footer;
