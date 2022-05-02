import { createContext, useState } from 'react';

interface userInfo {
  name: string;
  color: string;
}

export const CurrentUserContext = createContext({
  name: '',
  color: '',
  setUser: ({ name, color }: userInfo) => {},
});

export const CurrentUserProvider = ({ children }: { children: JSX.Element }) => {
  const [state, setState] = useState({ name: '', color: '' });

  const setUser = ({ name, color }: userInfo) => {
    setState({ name, color });
  };

  return (
    <CurrentUserContext.Provider value={{ ...state, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
