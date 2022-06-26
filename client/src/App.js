import React, {useContext} from 'react';
import { Header } from './components/Header';
import { Detail } from './components/Detail'
import { List } from './components/List'
import { GlobalProvider, GlobalContext } from './context/GlobalState'

function App() {

  return (
    <GlobalProvider>
    <div className="App d-flex flex-column justify-content-center align-items-center mt-4">
      <Header />
      <div className='d-flex flex-row'>
        <Detail />
        <List />
      </div>
    </div>
    </GlobalProvider>
  );
}

export default App;
