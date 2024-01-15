import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';

const IkDrink = () => {
  const [drinkData, setDrinkData] = useState({});
  const [currentDate, setCurrentDate] = useState(getFormattedDate());

  useEffect(() => {
    // Load drink data from local storage
    const storedData = localStorage.getItem('drinkData');
    if (storedData) {
      setDrinkData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Save drink data to local storage whenever it changes
    localStorage.setItem('drinkData', JSON.stringify(drinkData));
  }, [drinkData]);

  const handleDrinkUpdate = (amount: number) => {
    // Update the drink count for the current date
    setDrinkData((prevData) => ({
      ...prevData,
      [currentDate]: (prevData[currentDate] || 0) + amount,
    }));
  };

  function getFormattedDate () {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container bg-gray-200 h-full w-full">
      <h1 className="text-center text-xl underline">Jouw streepjeslijst!</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Vandaag: {currentDate}</h5>
          <p className="card-text">Drinks consumed today: {drinkData[currentDate] || 0}</p>

          <div className="btn-group">
            <button className="btn btn-success" onClick={() => handleDrinkUpdate(1)}>
              +1 Drink
            </button>
            <button className="btn btn-danger" onClick={() => handleDrinkUpdate(-1)}>
              -1 Drink
            </button>
          </div>
        </div>
      </div>

      <h2 className="mb-3">Drink History</h2>
      <ul className="list-group">
        {Object.entries(drinkData).map(([date, count]) => (
          <li key={date} className="list-group-item">
            {date}: {count} drinks
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default IkDrink;
