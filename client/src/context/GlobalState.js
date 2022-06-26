import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer'
import axios from 'axios'

// var customers = [
//     { id: 0, firstName: 'Dave', lastName: 'Norton', email: 'dave@whatever.com' },
//     { id: 1, firstName: 'Joe', lastName: 'Smith', email: 'joe@whatever.com' }
// ]

// Initial state (customers would need to be loaded from the DB source)
const initialState = {
    activeCustomer: { id: -1, firstName: '', lastName: '', email: ''},
    customers: [],
    loading: true
}



// Create context:
export const GlobalContext = createContext(initialState);

// Provider component:
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // global actions (calls to reducer):
    const getCustomersAction = async () => {
        try {
            const res = await axios.get('/api/customers');
            dispatch({
                type: 'GET_CUSTOMERS',
                payload: res.data.data
            }) 

        } catch (err) {
            dispatch({
                type: 'CUSTOMER_ERROR',
                payload: err.response.data.error
            }) 
        }
    }
    
    const deleteCustomerAction = async (id) => {
        try {
            await axios.delete(`/api/customers/${id}`)
            dispatch({
                type: 'DELETE_CUSTOMER',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'CUSTOMER_ERROR',
                payload: err.response.data.error
            }) 
        }
    }

    const addCustomerAction = async (customer) => {

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/customers', customer, config)
            dispatch({
                type: 'ADD_CUSTOMER',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'CUSTOMER_ERROR',
                payload: err.response.data.error
            }) 
        }


    }

    const updateCustomerAction = async (customer) => {

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.post(`/api/customers/${customer.id}`, customer, config)
            dispatch({
                type: 'UPDATE_CUSTOMER',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'CUSTOMER_ERROR',
                payload: err.response.data.error
            }) 
        }
    }

    const setActiveCustomer = (customer) => {
        dispatch({
            type: 'SET_ACTIVE_CUSTOMER',
            payload: customer
        })
    }

    return (<GlobalContext.Provider value={{
        customers: state.customers,
        activeCustomer: state.activeCustomer,
        error: state.error,
        loading: state.loading,
        getCustomersAction,
        deleteCustomerAction,
        addCustomerAction,
        updateCustomerAction,
        setActiveCustomer
    }}>
        {children}
    </GlobalContext.Provider>);
}