const VALID_INPUT_REGEX = /[0-9]+\.{0,1}[0-9]{0,2}/;

const isValidInput = (input) => {
  return VALID_INPUT_REGEX.test(input)
}

function convertToDollars(input) {
  if (typeof input !== 'number') {
    // let's not handle this here. This will be handled
    // in the UI
    return input;
  }
  // Here we are adding the negative value to our prettified dollar amount
  return `${input < 0 ? '-' : ''}${(Math.abs(input) / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;

}

export default {
  convertToDollars,
  isValidInput
}
