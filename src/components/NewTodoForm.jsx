import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todos/todos-actions';

import { BsXLg } from 'react-icons/bs';

const NewTodoForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleFormReset = () => {
    setInputValue('');
    inputRef.current.blur();
  };

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    if (!inputValue.trim()) {
      alert('Please enter a task');
      return;
    }

    dispatch(addTodo(inputValue));
    handleFormReset();
  };

  return (
    <form
      className="flex gap-5"
      onSubmit={handleFormSubmit}
    >
      <div className="relative w-full">
        <input
          type="text"
          className="w-full input focus"
          placeholder="Add a task"
          name="title"
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
        />
        {!!inputValue && (
          <button
            type="reset"
            aria-label="Reset"
            className="absolute right-4 top-[50%] translate-y-[-50%] text-gray-400 active:text-gray-300"
            onClick={handleFormReset}
          >
            <BsXLg size={18} />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-5 py-2.5  text-gray-200 bg-blue-600 active:bg-blue-700 font-bold rounded-md text-sm focus"
      >
        Add
      </button>
    </form>
  );
};

export default NewTodoForm;
