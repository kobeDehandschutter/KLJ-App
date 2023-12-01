import React from 'react';

const Footer = () => {
  const a = 1;
  const isActivated = true;
  const isNotAzctivated = false;

  return (
    <div className="btm-nav">
      <button type="button" className="bg-donkerblauw text-secondary-content">
        <span className="btm-nav-label">Instellingen</span>
      </button>
      <button type="button" className="bg-donkerblauw text-secondary-content">
        <span className="btm-nav-label">Rekening</span>
      </button>
      <button type="button" className="bg-donkerblauw text-secondary-content">
        <span className="btm-nav-label">Home</span>
      </button>
      <button type="button" className="active bg-donkerblauw text-secondary-content border-lichtBlauw">
        <span className="btm-nav-label">ik drink</span>
      </button>
      <button type="button" className="bg-donkerblauw text-secondary-content">
        <span className="btm-nav-label">wij drinken</span>
      </button>
    </div>
  );
};

export default Footer;
