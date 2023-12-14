import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Login from '../components/Login';
import Header from '@/components/Header';
import { Leiding } from '@/pages/home';
import { userContext } from '@/contexts/userContext';


const MainLayout = ({children}: {children: React.ReactNode}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const context = React.useContext(userContext)
  const [userId, setUserId] = useState<string|null>(searchParams.get('id'));
  const [user, setUser] = useState<Leiding|undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false)
 
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
         if(!userId)return
        try {
          const response = await fetch('http://localhost:5009/api/leiding/'+ userId);
          const data: Leiding = await response.json();          
          setUser(data);
          context.setUser(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
  }, [userId])

  useEffect(() => {
    setLoading(false)
  }, [user])

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
    context.setUser(null)
    setUserId(null)
  }
  console.log(user);
  
  if(loading){
    return <p>loading...</p>
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      <Header leiding={user} logout={logout} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
