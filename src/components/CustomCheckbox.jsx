import { BsCheck } from 'react-icons/bs';

const CustomCheckbox = ({ isChecked, onChangeCallback, isDisabled }) => {
  return (
    <label>
      <span
        className={`block border-2 border-emerald-400 text-white rounded-sm w-5 h-5 cursor-pointe
        ${isChecked && 'bg-emerald-400'}
        ${isDisabled && 'opacity-50'}
        `}
      >
        {isChecked && <BsCheck />}
      </span>
      <input
        type="checkbox"
        name="toggle"
        className="absolute appearance-none"
        value={isChecked}
        onChange={onChangeCallback}
        disabled={isDisabled}
      />
    </label>
  );
};

export default CustomCheckbox;
