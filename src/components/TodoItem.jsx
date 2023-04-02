import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../store/todos/todos-actions';

import { BsTrashFill, BsXLg } from 'react-icons/bs';

import Checkbox from './Checkbox';

const TodoItem = ({ id, title, isCompleted }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(title);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleTodoDelete = () => {
    dispatch(removeTodo(id));
  };

  const handleTodoToggle = () => {
    dispatch(updateTodo({ id, title, isCompleted: !isCompleted }));
  };

  const handleTodoRename = (evt) => {
    if (evt.key === 'Enter') {
      if (title !== inputValue) {
        setIsEditMode(false);
        dispatch(updateTodo({ id, title: inputValue, isCompleted }));
        return;
      }

      setIsEditMode(false);
      alert('Task is the same.');
    }
  };

  return (
    <li className="flex items-center gap-3 px-3 py-2 bg-gray-600 rounded">
      <Checkbox
        isChecked={isCompleted}
        onChangeCallback={handleTodoToggle}
      />
      {isEditMode ? (
        <>
          <input
            type="text"
            name="rename"
            className="w-3/4 py-2 px-3 bg-gray-700 border border-gray-500 rounded text-gray-300 font-bold focus"
            title="Press Enter to rename"
            value={inputValue}
            onChange={(evt) => setInputValue(evt.target.value)}
            onKeyDown={handleTodoRename}
            onBlur={() => {
              setIsEditMode(false);
              setInputValue(title);
            }}
            autoFocus
          />
          <button
            aria-label="Close rename"
            className="text-gray-400 active:text-gray-300"
            onClick={() => {
              setIsEditMode(false);
              setInputValue(title);
            }}
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
