import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionText = ({name, currentValue, setOptionValue}) => (
  <div className={styles.component}>
    <input 
      type="text"
      className={styles.input}
      value={currentValue}
      name={name}
      placeholder={'Text'}
      onChange={(event) => setOptionValue(event.currentTarget.value)}
    />
  </div>
);

OrderOptionText.propTypes = {
  setOptionValue: PropTypes.func,
  name: PropTypes.string,
  currentValue: PropTypes.string,    
};
  
export default OrderOptionText;