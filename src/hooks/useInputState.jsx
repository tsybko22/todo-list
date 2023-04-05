import { useState } from 'react';

const useInputState = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleValueReset = (value) => {
    setValue(value);
  };

  return {
    value,
    onChange: handleChange,
    onReset: handleValueReset,
  };
};

export default useInputState;
