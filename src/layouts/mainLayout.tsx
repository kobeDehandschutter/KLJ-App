import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { useSearchParams } from 'react-router-dom';
import Login from '../components/Login';
import Header from '@/components/Header';
import { Leiding } from '@/pages/home';


const MainLayout = ({children}: {children: React.ReactNode}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [userId, setUserId] = useState<string|null>(searchParams.get('id'));
  const [user, setuser] = useState<Leiding|undefined>(undefined);
  const [loading, setloading] = useState<boolean>(true);
 
  useEffect(() => {
    const fetchData = async () => {
      
        try {
          const response = await fetch('http://localhost:5009/api/leiding');
          const data: Leiding[] = await response.json();
          const user = data.find(l => l.id.toString() === userId)
          setuser(user);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
      setloading(false)
  }, [userId])

  function onClickLoginButton(id: string){
    setSearchParams({id: id})
    setUserId(id)
  }

  if(!userId)
    return (
    <div className="min-h-screen w-screen bg-black flex justify-center overflow-x-hidden">
      <Login onclick={onClickLoginButton} />
    </div>
  )

  const logout = () => {
    setSearchParams({})
  }
  

  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      <Header leiding={user} logout={logout} />
      {children}
      <Footer userId={userId}/>
    </div>
  );
};

export default MainLayout;
