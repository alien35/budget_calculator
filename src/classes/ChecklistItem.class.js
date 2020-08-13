import ImageConstants from "../constants/Image.constants";

export default class ChecklistItem {
  constructor(id, type, name, lowPrice, highPrice) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.lowPrice = lowPrice;
    this.highPrice = highPrice;
  }

  image() {
    return ImageConstants.GROUND_COVER;
  }

  prettyPriceRange() {
    return `$${this.lowPrice.toFixed(2)} - $${this.highPrice.toFixed(2)}`;
  }
}
