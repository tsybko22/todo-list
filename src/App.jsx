import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Container from './components/Container';
import FiltersNav from './components/FiltersNav';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

const validFilters = ['all', 'active', 'completed'];

const App = () => {
  const { filter } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to "/all" if the user is on the homepage
    if (pathname === '/') {
      navigate('/all', { replace: true });
    }
  }, []);

  useEffect(() => {
    // redirect to "/not-found" if the filter parameter is invalid and the user is not on the homepage
    if (!validFilters.includes(filter) && pathname !== '/') {
      navigate('/not-found', { replace: true });
    }
  }, [filter, navigate, pathname]);

  return (
    <section className="min-h-screen bg-gradient-to-t from-gray-900 to-gray-800">
      <Container>
        <NewTodoForm />
        <FiltersNav />
        <TodoList />
      </Container>
    </section>
  );
};

export default App;
