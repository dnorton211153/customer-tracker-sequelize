import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const CustomerDetail = () => {

  const {activeCustomer, stateAction} = useContext(GlobalContext);
  const {id,firstName,lastName,email} = activeCustomer;

  const setParam = (param, value) => {
    stateAction('SET_ACTIVE_CUSTOMER',{
      ...activeCustomer,
      [param]: value
    })
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // If the id (in the '#id' element) is -1, submit new customer;
    // else update customer.

    if (activeCustomer.id === -1) {
      let copy = JSON.parse(JSON.stringify(activeCustomer));
      delete copy.id;
      stateAction('ADD_CUSTOMER', copy);
    } else {
      stateAction('UPDATE_CUSTOMER', activeCustomer);
    }
  }

  const clearForm = (event) => {
    event.preventDefault();
    stateAction('SET_ACTIVE_CUSTOMER',{ id: -1, firstName: '', lastName: '', email: ''});
  }

  return (

    <div className="col-6 align-items-center justify-content-center px-2">
        <h3 className="text-center">Details:</h3>
        <div>
          <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>

            <input type="hidden" id="id" name="id" value={id}/>
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setParam('firstName', e.target.value)} required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setParam('lastName', e.target.value)} required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setParam('email', e.target.value)} required />
                <div className="invalid-feedback">
                  Please enter your email.
                </div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                <label className="form-check-label" htmlFor="invalidCheck">
                  Agree to terms and conditions
                </label>
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-danger" onClick={clearForm}>New</button>
              <button className="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
  )
}