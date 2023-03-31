import { BsCheck } from 'react-icons/bs';

const Checkbox = ({ isChecked, onChangeCallback, isDisabled = false }) => {
  return (
    <label>
      <span
        className={`block border-2 border-emerald-400 text-white rounded-sm w-5 h-5 cursor-pointer ${
          isChecked ? 'bg-emerald-400' : ''
        }`}
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

export default Checkbox;
