import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../store/todos/todos-actions';

import { BsTrashFill, BsXLg } from 'react-icons/bs';

import UncontrolledCheckbox from './Checkbox';
import CustomTextInput from './CustomTextInput';

const TodoItem = ({ id, title, isCompleted }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(title);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputReset = () => {
    setIsEditMode(false);
    setValue(title);
  };

  const handleTodoDelete = () => {
    dispatch(removeTodo(id));
  };

  const handleTodoToggle = () => {
    dispatch(updateTodo({ id, title, isCompleted: !isCompleted }));
  };

  const handleTodoRename = (evt) => {
    if (evt.key === 'Enter') {
      if (title !== value) {
        setIsEditMode(false);
        dispatch(updateTodo({ id, title: value, isCompleted }));
        return;
      }

      setIsEditMode(false);
      alert('Task is the same.');
    }
  };

  return (
    <li className="flex items-center gap-3 px-3 py-2 bg-gray-600 rounded">
      <UncontrolledCheckbox
        isChecked={isCompleted}
        onChangeCallback={handleTodoToggle}
      />
      {isEditMode ? (
        <>
          <CustomTextInput
            value={value}
            setValue={setValue}
            onKeyDown={handleTodoRename}
            onBlur={handleInputReset}
            name="rename-title"
            title="Press Enter to rename"
            placeholder="Add a task"
            autoFocus
            autoComplete="off"
          />
          <button
            aria-label="Close rename"
            className="text-gray-400 active:text-gray-300"
            onClick={handleInputReset}
          >
            <BsXLg size={18} />
          </button>
        </>
      ) : (
        <h3
          className={`cursor-pointer ${
            isCompleted ? 'text-gray-500 line-through' : 'text-gray-300'
          }`}
          title="Click to rename task"
          onClick={() => {
            setIsEditMode(true);
          }}
        >
          {title}
        </h3>
      )}
      <button
        aria-label="Delete task"
        className="ml-auto text-rose-400 active:text-rose-500 focus"
        onClick={handleTodoDelete}
      >
        <BsTrashFill />
      </button>
    </li>
  );
};

export default TodoItem;
