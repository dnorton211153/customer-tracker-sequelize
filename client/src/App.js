import React, {useContext} from 'react';
import { Header } from './components/Header';
import { CustomerDetail } from './components/CustomerDetail'
import { CustomerList } from './components/CustomerList'
import { CompanyDetail } from './components/CompanyDetail'
import { CompanyList } from './components/CompanyList'
import { GlobalProvider, GlobalContext } from './context/GlobalState'

function App() {

  return (
    <GlobalProvider>
    <div className="App d-flex flex-column justify-content-center align-items-center mt-4">
      <Header />
      <div className='d-flex flex-row'>
        <CustomerDetail />
        <CustomerList />
      </div>
      <div className='d-flex flex-row'>
        <CompanyDetail />
        <CompanyList />
      </div>
    </div>
    </GlobalProvider>
  );
}

export default App;
