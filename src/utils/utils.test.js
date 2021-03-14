import { formatTime } from './formatTime';
import { promoPrice } from './promoPrice';

describe('utils', () => {
  describe('formatTime', () => {

    it('should return null if there is no arg', () => {
      expect(formatTime()).toBe(null);
    });
    it('should return null if arg is not a number', () => {
      expect(formatTime('abc')).toBe(null);
      expect(formatTime(() => {})).toBe(null);
    });
    it('should return null if arg is lower than zero', () => {
      expect(formatTime(-1)).toBe(null);
      expect(formatTime(-2)).toBe(null);
    });
    it('should return time in hh:mm:ss if arg is proper', () => {
      expect(formatTime(122)).toBe('00:02:02');
      expect(formatTime(120)).toBe('00:02:00');
      expect(formatTime(3793)).toBe('01:03:13');
      expect(formatTime(3604)).toBe('01:00:04');
    });

    describe('promoPrice', () => {
      it('should return null if there is no arg', () => {
        expect(promoPrice()).toBe(null);
      });
  
      it('should return null if arguments are not a number', () => {
        expect(promoPrice('abc', 'xyz')).toBe(null);
        expect(promoPrice(() => {})).toBe(null);
      });
  
      it('should parse correct price', () => {
        expect(promoPrice('$10,000', 0.5)).toBe('$5,000.00');
        expect(promoPrice('$10000.25', 0.5)).toBe('$5,000.13');
        expect(promoPrice('$10 000', 0.5)).toBe('$5,000.00');
      });
  
      it('should return null if arguments are lower than zero', () => {
        expect(promoPrice(-1, -0.5)).toBe(null);
        expect(promoPrice(-2, 20/100)).toBe(null);
        expect(promoPrice(10, -20/100)).toBe(null);
        expect(promoPrice(10, 0)).toBe('$10.00');
        expect(promoPrice(0, 0.2)).toBe(null);
      });
  
      it('should return null if discount is higher than 1', () => {
        expect(promoPrice(10, 0.01)).toBe('$9.90');
        expect(promoPrice('$1,000.34', 1)).toBe('$0.00');
        expect(promoPrice('$900.34', 1.001)).toBe(null);
        expect(promoPrice(10, 2)).toBe(null);
        expect(promoPrice(-2, 0.5)).toBe(null);
      });
  
      it('renders correct value', () => {
        expect(promoPrice(100, 0.2)).toBe('$80.00');
        expect(promoPrice('$139,100.25', 0)).toBe('$139,100.25');
        expect(promoPrice(100, 1)).toBe('$0.00');
      });
    });
  });
});