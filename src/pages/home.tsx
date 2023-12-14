import React, { useState, useEffect } from 'react';

export type Leiding = {
  id: number,
  firstname: string,
  lastname: string
}


const Home = () => {
  const [pressed, setPressed] = useState<boolean>(false);
  
  const unpress = () => {
    setPressed(false);
  };
  const onClickButton = () => {
    setPressed(true);
    setTimeout(unpress, 500); 
  };

  return (
    <div className="flex items-center justify-center h-full">
    <button id="button" type="button" className={pressed ? 'pressed pb-2' : 'pb-2'} onClick={() => onClickButton()}>
        BIER
    </button>
    </div>
  );
};

export default Home;
