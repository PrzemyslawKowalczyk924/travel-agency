export const promoPrice = (price, discount) => {
  const multiplier = 100;
  
  if(typeof priceToNumber(price) != 'number' || typeof discount != 'number') {
    return null;  
  } else if(priceToNumber(price) <= 0 || discount < 0) {
    return null;
  } else if(discount > 1) {
    return null;
  } else {
    const priceWithDiscount = priceToNumber(price) - priceToNumber(price) * discount;
    const promoPrice = Math.ceil(priceWithDiscount * multiplier) / multiplier;
    
    const usCurrencyFormat = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
    const promoPriceFormat = usCurrencyFormat.format(promoPrice);
    return promoPriceFormat;
  }
};

const priceToNumber = price => {
  if(typeof price == 'string') {

    if(price[0] == '$') {
      const priceNoDolars = price.slice(1);
      const priceNoSpace = priceNoDolars.replace(' ', '');
      const priceNoDot = priceNoSpace.replace(',', '');
      const priceParse = parseFloat(priceNoDot);
      return(priceParse);
    } else {
      const priceNoSpace = price.replace(' ', '');
      const priceNoDot = priceNoSpace.replace(',', '');
      const priceParse = parseFloat(priceNoDot);
      return(priceParse);
    }
  } else if(typeof price == 'number') {
    return price;
  }
};