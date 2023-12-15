import React, { useEffect, useRef, useState } from 'react';
import 'handsontable/dist/handsontable.full.css';
import Handsontable from 'handsontable';
import { userContext } from '@/contexts/userContext';

const Rekening = () => {
  const user = React.useContext(userContext).user;
  const [rekening, setRekening] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const rekeningRef = useRef<HTMLDivElement>(null);
  const width = document.documentElement.clientWidth;

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const response = await fetch(`http://localhost:5009/api/rekening/${user.lastname} ${user.firstname}`);
        const rawData: string[][] = await response.json();

        // Extract relevant rows and columns
        const data = rawData
          .filter(row => row.length > 2) // Filter out empty rows
          .map(row => {
            return {
              Datum: row[1] || '', 
              Beschrijving: row[3] || '',
              Bedrag: row[6] || '',
            };
          });

        setRekening(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (!rekening || !rekeningRef.current) return;

    const container = rekeningRef.current;

    const hot = new Handsontable(container, {
      data: rekening,
      colHeaders: [
        "Datum",
        "Beschrijving",
        "Bedrag",
      ],
      columns: [
        { data: 'Datum', width: 70 }, 
        { data: 'Beschrijving', width: width - 140 },
        { data: 'Bedrag', width: 70 },
      ],
      contextMenu: true,
      readOnly: true,
    });

    // Clean up Handsontable when the component is unmounted
    return () => {
      hot.destroy();
    };
  }, [rekening]);

  return (
    <div>
      <h1>Rekening Data</h1>
      {isLoading && <div>Loading...</div>}
      {!isLoading && rekening && (
        <div ref={rekeningRef} className='text-white'>
          {/* Render Handsontable here */}
        </div>
      )}
    </div>
  );
};

export default Rekening;
