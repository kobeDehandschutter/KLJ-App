import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { useSearchParams } from 'react-router-dom';
import Login from '../components/Login';


export type Leiding = {
  id: number,
  firstname: string,
  lastname: string
}


const Home = () => {
  const [pressed, setPressed] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('id');
    const [leiding, setLeiding] = useState<Leiding[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5009/api/leiding');
        const data = await response.json();
        setLeiding(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  function onClickLoginButton(id: string){
    setSearchParams({id: id})
  }

  if(!userId)
    return (
    <div className="min-h-screen w-screen bg-black flex justify-center overflow-x-hidden">
      <Login leiding={leiding} onclick={onClickLoginButton} />
    </div>
  )

  
  const unpress = () => {
    setPressed(false);
  };
  const onClickButton = () => {
    setPressed(true);
    setTimeout(unpress, 500); 
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
       {leiding.map((l) => (
        <div key={l.id}>
          <h1 className="text-white">{l.firstname}</h1>
        </div>
      ))}
      <button id="button" type="button" className={pressed ? 'pressed pb-2' : 'pb-2'} onClick={() => onClickButton()}>
        BIER
      </button>
      <Footer />
    </div>
  );
};

export default Home;
