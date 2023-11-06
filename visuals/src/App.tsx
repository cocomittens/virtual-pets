import { observer } from 'mobx-react-lite';
import React from 'react';

const AppView = observer(({ inputText, outputText }: { inputText: string; outputText: string }) => {
  return (
    <div>
      <h1>Virual Pet Haven</h1>
      <p>Input: {inputText}</p>
      <p>Output: {outputText}</p>
    </div>
  );
});

const App = () => {
  return <AppView inputText="Cat" outputText="Dog" />;
};

export default App;
