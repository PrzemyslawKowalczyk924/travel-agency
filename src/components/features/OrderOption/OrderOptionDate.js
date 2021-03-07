import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import DatePicker from 'react-datepicker';

const OrderOptionDate = ({currentValue, setOptionValue, name}) => (
  <div className={styles.component}>
    <DatePicker 
      type="date"
      className={styles.input}
      selected={currentValue}
      onChange={(date) => setOptionValue(date)}
      isClearable
      name={name}
      placeholderText={'chose day'}
      minDate={new Date()}
      showDisabledMonthNavigation
    />
  </div>
);

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  name: PropTypes.string,
  currentValue: PropTypes.string,    
};
  
export default OrderOptionDate;