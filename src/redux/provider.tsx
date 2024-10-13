'use client';

import { Provider } from 'react-redux';
import { store } from './store';

interface ReduxRapperProps {
  children: React.ReactElement; // Any valid React element
}


function ReduxRapper({ children }: ReduxRapperProps) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default ReduxRapper ;
