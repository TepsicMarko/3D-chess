import { createContext, useState } from 'react';

export const CurrentUserContext = createContext({
  user: '',
  setUser: (username: string) => {},
});

export const CurrentUserProvider = ({ children }: { children: JSX.Element }) => {
  const [state, setState] = useState('');

  const setUser = (username: string) => {
    setState(username);
  };

  return (
    <CurrentUserContext.Provider value={{ user: state, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
