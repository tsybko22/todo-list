import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todos/todos-actions';

import CustomTextInput from './CustomTextInput';

const NewTodoForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    if (!value.trim()) {
      alert('Please enter a task');
      return;
    }

    dispatch(addTodo(value));
    setValue('');
    inputRef.current.blur();
  };

  return (
    <form
      className="flex gap-5"
      onSubmit={handleFormSubmit}
    >
      <CustomTextInput
        width="lg"
        isClearable
        ref={inputRef}
        value={value}
        setValue={setValue}
        placeholder="Add a task"
        name="title"
      />
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
