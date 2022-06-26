import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

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
    stateAction('SET_ACTIVE_COMPANY',{ id: -1, name: ''});
  }

  return (

    <div className="col-6 align-items-center justify-content-center px-2">
        <h3 className="text-center">Details:</h3>
        <div>
          <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>

            <input type="hidden" id="id" name="id" value={id}/>
            <div className="col-md-12">
              <label htmlFor="firstName" className="form-label">Company Name</label>
              <input type="text" className="form-control" id="firstName" value={name} onChange={(e) => setParam('name', e.target.value)} required />
              <div className="valid-feedback">
                Looks good!
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