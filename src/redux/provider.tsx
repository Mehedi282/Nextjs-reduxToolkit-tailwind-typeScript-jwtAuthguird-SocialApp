'use client';

import { Provider } from 'react-redux';
import { store } from './store';


function ReduxRapper({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default ReduxRapper ;
