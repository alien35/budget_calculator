import ChecklistItem from '../classes/ChecklistItem.class';

// Serializing is an important approach
// to transfer data to the store
function serialize(data) {
  return {
    budget: {
      min: data.budget.min,
      max: data.budget.max
    },
    selectedItems: data.selectedItems
  }
}


// Deserializing is a good approach
// to convert raw JSON from the server
// into an object that can both store the data and
// have its own functions
function deserialize(data) {
  return new ChecklistItem(
    data.id,
    data.type,
    data.name,
    data.lowPrice,
    data.highPrice
  );
}

export default {
  serialize,
  deserialize
}
