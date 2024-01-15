import Toast from '@/components/Toast';
import { userContext } from '@/contexts/userContext';
import axios from 'axios';
import React, { useState } from 'react';

export type Leiding = {
  id: string,
  firstname: string,
  lastname: string,
  image: string,
}


const Home = () => {
  const [pressed, setPressed] = useState<boolean>(false);
  const user = React.useContext(userContext).user;
  const [showToast, setShowToast] = useState<boolean>(false);
  const textPossibilities = ['Geniet ervan!', 'Drinkt gij ni wa te veel ;)', 'Schol!'];
  const [toastText, setToastText] = useState<string>(textPossibilities[0]);
  
  
  const unpress = () => {
    setPressed(false);
  };
  const onClickButton = async () => {
    if(pressed){return}
    setPressed(true);
    setToastText(textPossibilities[Math.floor(Math.random()*textPossibilities.length)])
    
    try {
      const postResult = await axios.post(`http://localhost:5009/api/streepjes/${user?.id}`);
      
      // If the post was successful, show the Toast and set a timer to hide it
      if (postResult.status === 200) {
        setShowToast(true);

        // Set the duration for which Toast will be visible (e.g., 3000 milliseconds = 3 seconds)
        const toastDuration = 2000;
        
        setTimeout(() => {
          setShowToast(false);
        }, toastDuration);
      }
    } catch (error) {
      console.error('Error during axios.post:', error);
    } finally {
      // Regardless of success or failure, unpress the button after a delay
      setTimeout(unpress, 1000);
    }
  };

  return (
    <>
      {showToast && <Toast text={toastText} />}
      <div className="flex items-center justify-center h-full">
      <button id="button" type="button" className={pressed ? 'pressed pb-2' : 'pb-2'} onClick={() => onClickButton()}>
          BIER
      </button>
      </div>
    </>
  );
};

export default Home;
