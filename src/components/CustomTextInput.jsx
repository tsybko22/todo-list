import { forwardRef } from 'react';

import { BsXLg } from 'react-icons/bs';

const CustomTextInput = forwardRef(
  (
    { width = 'default', isClearable = false, value, setValue, ...props },
    ref
  ) => {
    return (
      <label
        className={`relative
        ${width === 'default' && 'w-3/4'}
        ${width === 'lg' && 'w-full'}`}
      >
        <input
          type="text"
          className={`w-full input focus ${isClearable ? 'pr-10' : 'pr-3'}`}
          ref={ref}
          value={value}
          onChange={(evt) => {
            setValue(evt.target.value);
          }}
          {...props}
        />
        {value && isClearable ? (
          <button
            type="reset"
            aria-label="Reset"
            className="absolute right-4 top-[50%] translate-y-[-50%]  text-gray-400 active:text-gray-300"
            onClick={() => {
              setValue('');
            }}
          >
            <BsXLg size={18} />
          </button>
        ) : null}
      </label>
    );
  }
);

export default CustomTextInput;
