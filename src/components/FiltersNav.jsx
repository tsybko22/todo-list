import { NavLink } from 'react-router-dom';

const FiltersNav = () => {
  const setActiveStyles = ({ isActive }) =>
    isActive
      ? 'text-sky-300 font-bold cursor-pointer hover:underline focus'
      : 'text-gray-300 font-bold cursor-pointer hover:underline focus';

  return (
    <nav>
      <ul className="flex justify-center gap-7 mt-8">
        <li>
          <NavLink
            className={setActiveStyles}
            to="/all"
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            className={setActiveStyles}
            to="/active"
          >
            Active
          </NavLink>
        </li>
        <li>
          <NavLink
            className={setActiveStyles}
            to="/completed"
          >
            Completed
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default FiltersNav;
