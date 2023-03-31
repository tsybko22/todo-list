import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Container from './components/Container';
import FiltersNav from './components/FiltersNav';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const { filter } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/all', { replace: true });
      return;
    }
  }, []);

  useEffect(() => {
    if (
      filter !== 'all' &&
      filter !== 'active' &&
      filter !== 'completed' &&
      pathname !== '/'
    ) {
      navigate('/not-found', { replace: true });
    }
  }, [filter, navigate]);

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
