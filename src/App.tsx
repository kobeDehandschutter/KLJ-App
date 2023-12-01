import React from 'react';
import { ReactComponent as Logo } from './logo.svg';

const App: React.FC = () => (
  <div className="container mx-auto mt-2">
    <h1 className="text-3xl font-bold underline">Hello React</h1>
    <Logo style={{ width: '200px' }} />
    <p>
      Edit <code>src/App.tsx</code> and save to reload
    </p>
  </div>
);

export default App;
