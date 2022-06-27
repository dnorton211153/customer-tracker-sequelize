import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsLink45Deg, BsTrash } from "react-icons/bs";
import { FaSave } from "react-icons/fa";


export const CustomerDetail = () => {
  const { activeCustomer, stateAction } = useContext(GlobalContext);
  const { id, firstName, lastName, email } = activeCustomer;

  const setParam = (param, value) => {
    stateAction("SET_ACTIVE_CUSTOMER", {
      ...activeCustomer,
      [param]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // If the id (in the '#id' element) is -1, submit new customer;
    // else update customer.
    if (activeCustomer.id === -1) {
      let copy = JSON.parse(JSON.stringify(activeCustomer));
      delete copy.id;
      stateAction("ADD_CUSTOMER", copy);
    } else {
      stateAction("UPDATE_CUSTOMER", activeCustomer);
    }
  };

  const clearForm = (event) => {
    event.preventDefault();
    stateAction("RESET_ACTIVE_CUSTOMER");
  };

  const linkCompanyToCustomer = () => {
    stateAction("LINK_COMPANY_TO_CUSTOMER");
    // The following was removed because it was too heavy-handed
    // Refer to LINK_COMPANY_TO_CUSTOMER in the AppReducer for more info.
    // stateAction("GET_COMPANIES");
    // stateAction("GET_CUSTOMERS");
  };

  return (
    <Container style={{ paddingRight: 0, paddingLeft: 0  }}>
      <Row>
        <Col xs={12}>
          <h3>Customer Details</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Control type="hidden" value={id} readOnly />
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(event) => setParam("firstName", event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(event) => setParam("lastName", event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(event) => setParam("email", event.target.value)}
              />
            </Form.Group>

            <Button size="sm" variant="primary" type="submit">
              <FaSave />
            </Button>
            <Button size="sm" variant="secondary" type="button" onClick={clearForm}>
              <BsTrash />
            </Button>
            <Button size="sm"
              variant="secondary"
              type="button"
              onClick={linkCompanyToCustomer}
            >
              <BsLink45Deg />
            </Button>
          </Form>
        </Col>

        <Col xs={6}>
        <Form.Label>Linked Companies</Form.Label>
          <ul>
            {activeCustomer.companies && activeCustomer.companies.map((company) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
