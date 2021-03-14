import React from 'react';
import PropTypes from 'prop-types';
import styles from './TripPrice.scss';
import Icon from '../../common/Icon/Icon';
import { promoPrice } from '../../../utils/promoPrice';

const TripPrice = ({icon, cost}) => {

  if((new Date).getUTCHours() >= 12) {
    return(
      <div className={styles.component}>
        <Icon name={icon} />
        <span>
          <strong className={styles.promo}>Price from: {promoPrice(cost, 0.5)} </strong>
          <div className={styles.small}>
            <small>Standard price: {cost}</small>
          </div>
        </span>    
      </div>    
    );
  } else {
    return (
      <div className={styles.component}>
        <Icon name={icon} />
        <span>
          <strong>Price from: {cost}</strong>
        </span>
      </div>  
    );
  }
};

TripPrice.propTypes = {
  icon: PropTypes.string,
  cost: PropTypes.string,
};
  
export default TripPrice;