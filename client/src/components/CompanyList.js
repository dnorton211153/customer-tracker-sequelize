import React, {useContext, useEffect} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const CompanyList = () => {

  const {companies, stateAction } = useContext(GlobalContext);

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
    // Handle infinite loop (???)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col-6 align-items-center px-2">
      <h3 className="text-center">List:</h3>

        <label htmlFor="firstName" className="form-label">Company List</label>

        <div className="list-group">
          {companies.map(company => ( 

            <div key={company.id} className="d-flex flex-row list-group-item">
                <div className="col-7">{company.name}</div>
                <div className="col-2" role="button" onClick={(e) => editCompany(company)}><span className="badge bg-secondary rounded-pill noClick"><i className="fa fa-edit noClick" aria-hidden="true"></i></span></div>
                <div className="col-2" role="button" onClick={(e) => emailCompany(company)}><span className="badge bg-primary rounded-pill noClick"><i className="fa fa-send noClick" aria-hidden="true"></i></span></div>
                <div className="col-1" role="button" onClick={(e) => deleteCompany(company.id)}><span className="badge bg-danger rounded-pill noClick"><i className="fa fa-times noClick" aria-hidden="true"></i></span></div>
            </div>
          ))}
            
        </div>
    </div>
  )
}


