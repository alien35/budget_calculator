import CurrencyService from "../Services/Currency.service";

export default class User {
  constructor(budget, selectedItems) {
    this.budget = budget;
    this.selectedItems = selectedItems;
  }

  selectedItemsMinPrice(items) {
    return this.selectedItems.map((itemID) => items.find((item) => item.id === itemID)).reduce((sum, each) => sum + each.lowPrice, 0);
  }

  selectedItemsMaxPrice(items) {
    return this.selectedItems.map((itemID) => items.find((item) => item.id === itemID)).reduce((sum, each) => sum + each.highPrice, 0);
  }

  prettySelectedItemsPriceRange(items) {
    return `${CurrencyService.convertToDollars(this.selectedItemsMinPrice(items))} - ${CurrencyService.convertToDollars(this.selectedItemsMaxPrice(items))}`;
  }

}
