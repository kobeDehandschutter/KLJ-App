
import { useNavigate } from 'react-router-dom';
import { Leiding } from '../pages/home';
import React from 'react';

const Toast = ({text}: {text:string}) => {
  
  function closeToast() {
    document.getElementById('toast')?.classList.add('hidden');
  }
    
    return (
        <div className="toast-container fixed top-20 left-1/2 transform -translate-x-1/2  z-50 w-full px-10">
        <div id="toast" className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <button onClick={closeToast} className="float-right text-white focus:outline-none">&times;</button>
          <p className="font-bold text-lg">{text}</p>
        </div>
      </div>
    );
};

export default Toast;

