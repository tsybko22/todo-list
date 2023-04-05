import { useEffect, useRef } from 'react';

export function useTimeoutFn(fn, ms) {
  const timeout = useRef();
  const callback = useRef(fn);

  const set = () => {
    timeout.current = setTimeout(() => {
      callback.current();
    }, ms);
  };

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  useEffect(() => {
    set();

    return clearTimeout(timeout.current);
  }, [ms]);

  return set;
}

export default useTimeoutFn;
