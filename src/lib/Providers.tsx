import { FC, ReactNode } from 'react';

import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from '../store';

interface ProvidersProps {
  children: ReactNode | ReactNode[];
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <HashRouter>
      <Provider store={store}>{children}</Provider>
    </HashRouter>
  );
};

export default Providers;
