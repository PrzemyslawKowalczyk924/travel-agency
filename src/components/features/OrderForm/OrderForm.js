import React from 'react';
import styles from './OrderForm.scss';
import PropTypes from 'prop-types';
import { Row, Col} from 'react-flexbox-grid';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';
import Button from '../../common/Button/Button';

import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

const sendOrder = (options, tripCost, tripId, tripName, tripCountry) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripId,
    tripName,
    countryCode: tripCountry.alpha3Code,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  if(options.name !== '' && options.contact !== '' && options['start-date']){
    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  } else {
    return alert('Fields: "Name", "Contact" and "Preffered trip start are necessary!');
  }
    
};

const OrderForm = ({tripCost, options, setOrderOption, tripId, tripName, tripCountry}) => (
  <Row>
    {pricing.map((option) => (
      <Col md={4} key={option.id}>
        <OrderOption 
          currentValue={options[option.id]}
          title={option.id} 
          {...option} 
          setOrderOption={setOrderOption}
        />  
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options}/>
    </Col>
    <div className={styles.component}>
      <Button onClick={() => sendOrder(options, tripCost, tripId, tripName, tripCountry)}>Order now!</Button>
    </div>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  tripName: PropTypes.string,
  tripCountry: PropTypes.string,
};

export default OrderForm;