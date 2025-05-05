import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { RootState, setupStore } from './store/reducers';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = setupStore();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const clientId = "358942039440-2vvlj67vt727f2r8sd7qcbjvu3sftr09.apps.googleusercontent.com";


root.render(
  
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
      
      <App />
      
      </GoogleOAuthProvider>
    </Provider>
    
);
