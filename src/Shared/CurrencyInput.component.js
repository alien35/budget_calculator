import React from 'react';
import TextField from '@material-ui/core/TextField';
import CurrencyService from '../Services/Currency.service';

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8;

const CurrencyInput = ({
  label,
  className = '',
  max = Number.MAX_SAFE_INTEGER,
  onValueChange,
  style = {},
  value,
}) => {
  const valueAbsTrunc = Math.trunc(Math.abs(value));
  if (value !== valueAbsTrunc || !Number.isFinite(value) || Number.isNaN(value)) {
    throw new Error(`invalid value property`);
  }
  const handleKeyDown = React.useCallback(
    (e) => {
      const { key, keyCode } = e;
      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
      ) {
        return;
      }
      const valueString = value.toString();
      let nextValue;
      if (keyCode !== DELETE_KEY_CODE) {
        const nextValueString = value === 0 ? key : `${valueString}${key}`;
        nextValue = Number.parseInt(nextValueString, 10);
      } else {
        const nextValueString = valueString.slice(0, -1);
        nextValue = nextValueString === '' ? 0 : Number.parseInt(nextValueString, 10);
      }
      if (nextValue > max) {
        return;
      }
      onValueChange(nextValue);
    },
    [max, onValueChange, value]
  );
  const handleChange = React.useCallback(() => {
    // DUMMY TO AVOID REACT WARNING
  }, []);

  // Format the result into US currency
  const valueDisplay = CurrencyService.convertToDollars(value);

  return (
    <TextField
      label={label}
      variant="outlined"
      className={className}
      inputMode="numeric"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      style={style}
      value={valueDisplay}
    />
  );
};

export default CurrencyInput;