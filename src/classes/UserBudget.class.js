import CurrencyService from "../Services/Currency.service";

export default class UserBudget {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  prettyMin() {
    return CurrencyService.convertToDollars(this.min);
  }

  prettyMax() {
    return CurrencyService.convertToDollars(this.max);
  }

}
