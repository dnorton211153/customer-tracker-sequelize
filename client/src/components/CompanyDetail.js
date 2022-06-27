import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { FaSave } from "react-icons/fa";

export const CompanyDetail = () => {

  const {activeCompany, stateAction} = useContext(GlobalContext);
  const {id,name} = activeCompany;

  const setParam = (param, value) => {
    stateAction('SET_ACTIVE_COMPANY',{
      ...activeCompany,
      [param]: value
    })
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (activeCompany.id === -1) {
      let copy = JSON.parse(JSON.stringify(activeCompany));
      delete copy.id;
      stateAction('ADD_COMPANY', copy);
    } else {
      stateAction('UPDATE_COMPANY', activeCompany);
    }
  }

  const clearForm = (event) => {
    event.preventDefault();
    stateAction('RESET_ACTIVE_COMPANY');
  }

  return (

    <Container style={{ paddingRight: 0, paddingLeft: 0 }}>
      <Row>
        <Col xs={12}>
          <h3>Company Details</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Control type="hidden" value={id} readOnly />
            <Form.Group controlId="name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(event) => setParam("name", event.target.value)}
              />
            </Form.Group>

            <Button size="sm" variant="primary" type="submit">
              <FaSave />
            </Button>
            <Button size="sm" variant="secondary" type="button" onClick={clearForm}>
              <BsTrash />
            </Button>
          </Form>
        </Col>
        <Col xs={6}>
        <Form.Label>Linked Customers</Form.Label>
          <ul>
            {activeCompany.customers && activeCompany.customers.map((customer) => (
              <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}