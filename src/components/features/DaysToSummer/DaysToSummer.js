import React from 'react';
import styles from './DaysToSummer.scss';

class DaysToSummer extends React.Component {
  getCountDownDays() {
    const today = new Date();
    const summerBegin = new Date(Date.UTC(today.getUTCFullYear(), 5, 21));
    const summerEnd = new Date(Date.UTC(today.getUTCFullYear(), 8, 23));

    if(today.getUTCMonth() == summerEnd.getUTCMonth() && today.getUTCDate() > summerEnd.getUTCDate()) {
      summerBegin.setUTCFullYear(summerBegin.getUTCFullYear() + 1);
    }
    
    const one_day = 1000 * 60 * 60 * 24;
      
    const daysToSummer = Math.round(
      (summerBegin.getTime() - today.getTime()) / one_day
    );
      
    if(daysToSummer === 1) {
      return '1 day to summer';    
    } else if (daysToSummer <= 0) {
      return '';
    } else {
      return daysToSummer + ' days to summer!';
    }
  }

  render() {
    const daysToSummer = this.getCountDownDays(); 
    return (
      <div className={styles.component}>
        <h3 className={styles.description}>{daysToSummer}</h3>
      </div>
    );  
  }
}

export default DaysToSummer;