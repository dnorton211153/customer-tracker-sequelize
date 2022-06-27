import React from 'react';
import { Header } from './components/Header';
import { CustomerDetail } from './components/CustomerDetail'
import { CustomerList } from './components/CustomerList'
import { CompanyDetail } from './components/CompanyDetail'
import { CompanyList } from './components/CompanyList'
import { GlobalProvider } from './context/GlobalState'
import { Col, Container, Row } from 'react-bootstrap';

function App() {

  return (
    <GlobalProvider>
    <Container>
      <Header />
      <Row>
        <Col xs={5}>
        <CustomerList />
        </Col>
        <Col xs={7}>
        <CustomerDetail />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={5}>
        <CompanyList />
        </Col>
        <Col xs={7}>
        <CompanyDetail />
        </Col>
      </Row>
    </Container>
    </GlobalProvider>
  );
}

export default App;
