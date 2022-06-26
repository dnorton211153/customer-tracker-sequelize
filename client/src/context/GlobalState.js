import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer'
import axios from 'axios'

// var customers = [
//     { id: 0, firstName: 'Dave', lastName: 'Norton', email: 'dave@whatever.com' },
//     { id: 1, firstName: 'Joe', lastName: 'Smith', email: 'joe@whatever.com' }
// ]

// Initial state (customers would need to be loaded from the DB source)
const initialState = {
    activeCustomer: { id: -1, firstName: '', lastName: '', email: '' },
    activeCompany: { id: -1, name: '' },
    customers: [],
    companies: [],
    loading: true
}

// Create context:
export const GlobalContext = createContext(initialState);

// Provider component:
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const stateAction = async (type, incoming) => {
        
        var response = null;
        var payload = null;

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            switch (type) {
                case 'GET_CUSTOMERS':
                    response = await axios.get('/api/customers');
                    payload = response.data.data;
                    break;

                case 'DELETE_CUSTOMER':
                    await axios.delete(`/api/customers/${incoming}`)
                    payload = incoming;
                    break;  

                case 'ADD_CUSTOMER':
                    response = await axios.post('/api/customers', incoming, config);
                    payload = response.data.data;
                    break;

                case 'UPDATE_CUSTOMER':
                    response = await axios.post(`/api/customers/${incoming.id}`, incoming, config);
                    payload = response.data.data;
                    break;

                case 'SET_ACTIVE_CUSTOMER':
                    payload = incoming;
                    break;
            
                case 'GET_COMPANIES':
                    response = await axios.get('/api/companies');
                    payload = response.data.data;
                    break;

                case 'DELETE_COMPANY':
                    await axios.delete(`/api/companies/${incoming}`)
                    payload = incoming;
                    break;  

                case 'ADD_COMPANY':
                    response = await axios.post('/api/companies', incoming, config);
                    payload = response.data.data;
                    break;

                case 'UPDATE_COMPANY':
                    response = await axios.post(`/api/companies/${incoming.id}`, incoming, config);
                    payload = response.data.data;
                    break;

                case 'SET_ACTIVE_COMPANY':
                    payload = incoming;
                    break;

                case 'LINK_COMPANY_TO_CUSTOMER':
                    response = await axios.post(`/api/companies/link`, { company_id: state.activeCompany.id, customer_id: state.activeCustomer.id }, config);
                    break;

                default:
                    break;

            }
            
            dispatch({
                type,
                payload
            }) 
            
        } catch (error) {
            dispatch({
                type: 'API_ERROR',
                payload: error.response.data.error
            })  
        }
    }




    return (<GlobalContext.Provider value={{
        customers: state.customers,
        companies: state.companies,
        activeCustomer: state.activeCustomer,
        activeCompany: state.activeCompany,
        error: state.error,
        loading: state.loading,
        stateAction
    }}>
        {children}
    </GlobalContext.Provider>);
}