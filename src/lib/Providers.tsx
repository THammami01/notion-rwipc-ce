import { FC, ReactNode } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../store';

interface ProvidersProps {
  children: ReactNode | ReactNode[];
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

export default Providers;
