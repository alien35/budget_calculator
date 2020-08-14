import ImageConstants from "../constants/Image.constants";
import CurrencyService from "../Services/Currency.service";

export default class ChecklistItem {
  constructor(id, type, name, lowPrice, highPrice) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.lowPrice = lowPrice;
    this.highPrice = highPrice;
  }

  prettyPriceRange() {
    return `${CurrencyService.convertToDollars(this.lowPrice)} - ${CurrencyService.convertToDollars(this.highPrice)}`;
  }
}
