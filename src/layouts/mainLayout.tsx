import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const { pathname  } = useLocation();
  const navigate = useNavigate();


  const minSwipeDistance = 170 

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    
    if(Math.abs(distance) < minSwipeDistance) return
    const isLeftSwipe = distance < 0
    let url = ""
    switch(pathname) {
      case '/settings':
        if(!isLeftSwipe) url = "/rekening"
        break;
      case '/rekening':
        if(isLeftSwipe) url = "/settings"
        if(!isLeftSwipe) url = "/"
        break;
      case '/':
        if(isLeftSwipe) url = "/rekening"
        if(!isLeftSwipe) url = "/ikDrink"
        break;
      case '/ikDrink':
        if(isLeftSwipe) url = "/"
        if(!isLeftSwipe) url = "/wijDrinken"
        break;
      case '/wijDrinken':
        if(isLeftSwipe) url = "/ikDrink"
        break;
    }

    navigate({pathname: url, search: `?id=${user?.id}`});
    // add your conditional logic here
  }

 
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
  
  if(loading || !user){
    return <p>loading...</p>
  }

  return (
    <div className="h-screen w-screen  flex flex-col overflow-hidden" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Header leiding={user} logout={logout} />
      <div className='overflow-hidden h-full w-full'>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
