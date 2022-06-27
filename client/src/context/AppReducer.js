export default (state, action) => {
    switch(action.type) {


        case 'GET_CUSTOMERS':
            return {
                ...state,
                loading: false,
                customers: action.payload
            }

        case 'ADD_CUSTOMER':
            return {
                ...state,
                customers: [...state.customers, action.payload]
            }
            
        case 'DELETE_CUSTOMER':
            return {
                ...state,
                customers: state.customers.filter(customer => customer.id !== action.payload)
            }

        case 'UPDATE_CUSTOMER':

            var customers = state.customers.map(u => u.id !== action.payload.id ? u : 
                { ...u, ...action.payload });
            return {
                ...state,
                customers
            }

        case 'RESET_ACTIVE_CUSTOMER':
        case 'SET_ACTIVE_CUSTOMER':
            return {
                ...state,
                activeCustomer: action.payload
            }


        case 'GET_COMPANIES':
            return {
                ...state,
                loading: false,
                companies: action.payload
            }
            
        case 'ADD_COMPANY':
            return {
                ...state,
                companies: [...state.companies, action.payload]
            }
            
        case 'DELETE_COMPANY':
            return {
                ...state,
                companies: state.companies.filter(company => company.id !== action.payload)
            }

        case 'UPDATE_COMPANY':

            var companies = state.companies.map(u => u.id !== action.payload.id ? u : 
                { ...u, ...action.payload });
            return {
                ...state,
                companies
            }

        case 'RESET_ACTIVE_COMPANY':
        case 'SET_ACTIVE_COMPANY':
            return {
                ...state,
                activeCompany: action.payload
            }
            
        case 'COMPANY_ERROR':
            return {
                ...state,
                error: action.payload
            }
    
            
        case 'LINK_COMPANY_TO_CUSTOMER':
            // Rather than forcing full refresh of data from the server, we'll just update local state...
            return {
                ...state,
                companies: state.companies.map(company => company.id === action.payload.activeCompany.id ? { ...company, customers: [...company.customers || [], action.payload.activeCustomer] } : company),
                customers: state.customers.map(customer => customer.id === action.payload.activeCustomer.id ? { ...customer, companies: [...customer.companies || [], action.payload.activeCompany] } : customer),
                activeCompany: {
                    ...state.activeCompany,
                    customers: [...state.activeCompany.customers || [], action.payload.activeCustomer],
                },
                activeCustomer: {
                    ...state.activeCustomer,
                    companies: [...state.activeCustomer.companies || [], action.payload.activeCompany],
                }
            }

        default:
            return state;
    }
}