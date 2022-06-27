import React, {useContext, useEffect} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Container, Row, Col, Form, Button  } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { SiMinutemailer }  from 'react-icons/si';
import { FiDelete } from 'react-icons/fi';

export const CompanyList = () => {

  const {companies, stateAction} = useContext(GlobalContext);

  const editCompany = (company) => {
    stateAction('SET_ACTIVE_COMPANY', company);
  }

  const emailCompany = (company) => {
    window.open(`mailto:${company.name} <${company.name}>?subject="Hello!"`);
  }

  const deleteCompany = (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      stateAction('DELETE_COMPANY', id);
    }
  }

  useEffect(() => {
    stateAction('GET_COMPANIES', null);
  }, []);

  return (

      <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
          <Col xs={12}>
            <h3>Company List</h3>
          </Col>
        </Row>

        {companies.map(company => ( 
          <Row key={company.id}>
            <Col xs={6}><Form.Label>{company.name}</Form.Label></Col>
            <Col xs={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Button size="sm" variant="primary" onClick={() => editCompany(company)}><FaEdit /></Button>
              <Button size="sm" variant="danger" onClick={() => deleteCompany(company.id)}><FiDelete /></Button>
              <Button size="sm" variant="success" onClick={() => emailCompany(company)}><SiMinutemailer /></Button>
            </Col>
          </Row>
        ))}
      </Container>


  )
}


