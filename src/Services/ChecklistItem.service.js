import UserBudget from '../classes/UserBudget.class';
import ChecklistItem from '../classes/ChecklistItem.class';

function serialize(data) {
  return {
    budget: {
      min: data.budget.min,
      max: data.budget.max
    },
    selectedItems: data.selectedItems
  }
}

function deserialize(data) {
  return new ChecklistItem(
    data.id,
    data.type,
    data.name,
    data.lowPrice,
    data.highPrice
  );
}

function update(data) {

}

export default {
  serialize,
  deserialize
}
