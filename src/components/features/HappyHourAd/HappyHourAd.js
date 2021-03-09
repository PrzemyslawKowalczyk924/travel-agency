import React from 'react';
import PropTypes from 'prop-types';
import styles from './HappyHourAd.scss';

class HappyHourAd extends React.Component {
  select = {
    title:  'Happy Hour!',
    promoDescription: 'Take your chanse, and grab promotion!',    
  }

  render() {
    const { title, promoDescription } = this.props;
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.countdown}></div>
        <p className={styles.promoDescription}>{promoDescription}</p>
      </div>
    );  
  }
}

HappyHourAd.propTypes = {
  title: PropTypes.string,
  promoDescription: PropTypes.string,
};

export default HappyHourAd;