import React from 'react';
import { Provider } from 'react-redux';
import redux from './redux';
import WrappedRoot from './components/WrappedRoot';
import './App.css';

function App() {
  return (
    <Provider store={redux}>
      <div className="App">
        <WrappedRoot />
      </div>
    </Provider>
  );
}

export default App;
