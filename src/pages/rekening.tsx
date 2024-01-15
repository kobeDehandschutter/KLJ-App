import React, { useEffect, useRef, useState } from 'react';
import 'handsontable/dist/handsontable.full.css';
import Handsontable from 'handsontable';
import { userContext } from '@/contexts/userContext';
import Core from 'handsontable/core';
import { CellProperties } from 'handsontable/settings';

const Rekening = () => {
  const user = React.useContext(userContext).user;
  const [rekening, setRekening] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const rekeningRef = useRef<HTMLDivElement>(null);
  const width = document.documentElement.clientWidth
  const hotRef = useRef<Handsontable | null>(null);


  
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const response = await fetch(`http://localhost:5009/api/rekening/${user.lastname} ${user.firstname}`);
        const rawData: string[][] = await response.json();

        // Extract relevant rows and columns
        const length = rawData.length
        const total = rawData[length-1][5]
        rawData[length-1][6] = total

        const data = rawData
          .map(row => {
            return {
              Datum: row[1] || '', 
              Beschrijving: row[3] || '',
              Bedrag: row[6] || '',
            };
          }).slice(3);
          

        setRekening(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);
  
  const lastRowRenderer = (...args: any[]) => {
    Handsontable.renderers.TextRenderer.apply(this, args as [Core, HTMLTableCellElement, number, number, string | number, any, CellProperties]);
    const [instance, td, row, col, prop, value, cellProperties] = args;
    td.style.fontWeight = 'bold';
    td.style.color = 'red';
    td.style.background = '#CEC';
  };
  
Handsontable.renderers.registerRenderer('lastRowRenderer', lastRowRenderer);

  useEffect(() => {
    if (!rekening || !rekeningRef.current) return;

    const container = rekeningRef.current;

    const hot = new Handsontable(container, {
      data: rekening,
      licenseKey: 'non-commercial-and-evaluation',
      colHeaders: [
        "Datum",
        "Beschrijving",
        "Bedrag",
      ],
      columns: [
        { data: 'Datum', width: 70 }, 
        { data: 'Beschrijving', width: width - (width<800?140:157) },
        { data: 'Bedrag', width: 70 },
      ],
      contextMenu: true, readOnly: true,
      cells: (row: number, col: number, prop: string | number): Handsontable.CellMeta => {
        const isLastRow = row === rekening.length - 1;
  
        if (isLastRow) {
          return {
            renderer: 'lastRowRenderer',
          };
        }
        return {}
      },
    });
    hotRef.current = hot; 
    hot.scrollViewportTo(rekening.length - 1, 0);

    return () => {
      if (hotRef.current) {
        hotRef.current.destroy();
      }
    };
  }, [rekening]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && rekening && (
        <div className='bg-white'>
          <div ref={rekeningRef} className='text-white z-40 scroll-smooth'>
         
          </div>
        </div>
      )}
    </div>
  );
};

export default Rekening;
