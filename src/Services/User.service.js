import User from '../classes/User.class';
import UserBudget from '../classes/UserBudget.class';

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
  return new User(
    new UserBudget(
      data.budget.min,
      data.budget.max
    ),
    data.selectedItems
  );
}

function update(data) {

}

export default {
  serialize,
  deserialize
}
