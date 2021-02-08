import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionNumber = ({currentValue, limits, setOptionValue, price}) => (
  <div className={styles.number}>
    <input 
      type="number"
      className={styles.inputSmall}
      value={currentValue}
      min={limits.min}
      max={limits.max}
      onChange={(event) => setOptionValue(event.currentTarget.value)}
    />
    {price}
  </div>
);

OrderOptionNumber.propTypes = {
  limits: PropTypes.object,
  price: PropTypes.string,
  setOptionValue: PropTypes.func,    
  currentValue: PropTypes.string,
};

export default OrderOptionNumber;