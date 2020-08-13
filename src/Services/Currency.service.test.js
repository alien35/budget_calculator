import CurrencyService from './Currency.service';

describe('Currency Service', () => {
  let result = CurrencyService.convertToDollars(1000);
  it ('creates a pretty USD value', () => {
    expect(result).toEqual('$10.00');
  })

  
  it ('works with 0', () => {
    result = CurrencyService.convertToDollars(0);
    expect(result).toEqual('$0.00');
  })

  it ('can calculate pennies', () => {
    result = CurrencyService.convertToDollars(2);
    expect(result).toEqual('$0.02');
  })

  it ('can format large numbers', () => {
    result = CurrencyService.convertToDollars(200000000);
    expect(result).toEqual('$2,000,000.00');
  })

  it ('can handle negative numbers', () => {
    result = CurrencyService.convertToDollars(-2000);
    expect(result).toEqual('-$20.00');
  })

  it ('can handle non-numbers', () => {
    result = CurrencyService.convertToDollars('hello');
    expect(result).toEqual('hello');
  })
})