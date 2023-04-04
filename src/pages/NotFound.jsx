import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-t from-gray-900 to-gray-800 flex items-center h-full p-16 text-gray-300">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="mb-8 text-2xl font-semibold md:text-3xl">
            Page not found.
          </p>
          <button
            className="px-8 py-3 text-gray-200 bg-blue-600 active:bg-blue-700 font-bold rounded-md text-sm focus"
            onClick={() => {
              navigate('/all');
            }}
          >
            Back to homepage
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
