'use client'

import axios from 'axios';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import "../../mock"
import InputDate from '@/app/pages/date-calculator/component/InputDate';

const fetchInitialDate = async () => {
    try {
      const response = await axios.get('/api/date');
      return response.data.startDate;
    } catch (error) {
      console.error('Erreur lors du chargement de la date initiale :', error);
    }
  };

const DateCalculator: NextPage = () => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [valResult, setValResult] = useState<number | null>(null);
    const [emptyEndDate, setEmptyEndDate] = useState<boolean>(false);

    useEffect(() => {
       
        const getStartDate = async () => {
            try {
              const result = await fetchInitialDate();
              const formattedDate = result.replace(/\//g, '-');
            setStartDate(formattedDate);
            } catch (error) {
            }
          };
          getStartDate();
        }, []);
    
        const calculateDifference = () => {
            if (startDate && endDate) {
              const firstDate = new Date(startDate);
              const secondDate = new Date(endDate);
              if (firstDate <= secondDate) {
                const daysGap = Math.floor((secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
                setValResult(daysGap);
              }
            }else{
                setEmptyEndDate(true);
            }
          };

      
    const onChangeStartDate = (value: any) => {
        setStartDate(value);
    };

    const onChangeEndDate = (value: any) => {
        setEmptyEndDate(false);
        setEndDate(value);
    };

    return (<div className='calculator-block'>
        <h1 className=''>Calculateur de différence de dates</h1>
        <div className='flex flex-row items-end justify-start gap-10 mt-6'>
            <InputDate label="Date de début" value={startDate} onChange={onChangeStartDate} />
            <InputDate label="Date de fin" value={endDate} onChange={onChangeEndDate} />
            <button onClick={calculateDifference} >Calculer la différence</button>
        </div>
        {emptyEndDate && <p className='error-message'>Veuillez saisir la date fin</p>}
        {valResult !== null && valResult >= 0 && <p>Nombre de jours entre les deux dates : {valResult}</p>}
    </div>)
};




export default DateCalculator;