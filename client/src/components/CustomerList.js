import React, {useContext, useEffect} from 'react';
import { GlobalContext } from '../context/GlobalState';

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
    // Handle infinite loop (???)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col-6 align-items-center px-2">
      <h3 className="text-center">List:</h3>

        <label htmlFor="firstName" className="form-label">Customer List</label>
        <div className="list-group">
          {customers.map(customer => ( 

            <div key={customer.id} className="d-flex flex-row list-group-item">
                <div className="col-7">{customer.firstName} {customer.lastName}</div>
                <div className="col-2" role="button" onClick={(e) => editCustomer(customer)}><span className="badge bg-secondary rounded-pill noClick"><i className="fa fa-edit noClick" aria-hidden="true"></i></span></div>
                <div className="col-2" role="button" onClick={(e) => emailCustomer(customer)}><span className="badge bg-primary rounded-pill noClick"><i className="fa fa-send noClick" aria-hidden="true"></i></span></div>
                <div className="col-1" role="button" onClick={(e) => deleteCustomer(customer.id)}><span className="badge bg-danger rounded-pill noClick"><i className="fa fa-times noClick" aria-hidden="true"></i></span></div>
            </div>
          ))}
            
        </div>
    </div>
  )
}


