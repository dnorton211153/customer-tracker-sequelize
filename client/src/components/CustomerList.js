import React, {useContext, useEffect} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Container, Row, Col, Form, Button  } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { SiMinutemailer }  from 'react-icons/si';
import { FiDelete } from 'react-icons/fi';

export const CustomerList = () => {

  const {customers, stateAction } = useContext(GlobalContext);

  const editCustomer = (customer) => {
    stateAction('SET_ACTIVE_CUSTOMER', customer);
  }

  const emailCustomer = (customer) => {
    window.open(`mailto:${customer.firstName} ${customer.lastName} <${customer.email}>?subject="Hello!"`);
  }

  const deleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
        stateAction('DELETE_CUSTOMER', id);
    }
  }

  useEffect(() => {
    stateAction('GET_CUSTOMERS', null);
  }, []);

  return (
      <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
          <Col xs={12}>
            <h3>Customer List</h3>
          </Col>
        </Row>

        {customers.map(customer => ( 
          <Row key={customer.id}>
            <Col xs={6}><Form.Label>{customer.firstName} {customer.lastName}</Form.Label></Col>
            <Col xs={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Button size="sm" variant="primary" onClick={() => editCustomer(customer)}><FaEdit /></Button>
              <Button size="sm" variant="danger" onClick={() => deleteCustomer(customer.id)}><FiDelete /></Button>
              <Button size="sm" variant="success" onClick={() => emailCustomer(customer)}><SiMinutemailer /></Button>
            </Col>
          </Row>
        ))}
      </Container>
  )
}


