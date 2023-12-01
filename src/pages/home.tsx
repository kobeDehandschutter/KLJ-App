import React, { useState } from 'react';
import Footer from '../components/Footer';

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
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <button id="button" type="button" className={pressed ? 'pressed pb-2' : 'pb-2'} onClick={() => onClickButton()}>
        BIER
      </button>
      <Footer />
    </div>
  );
};

export default Home;
