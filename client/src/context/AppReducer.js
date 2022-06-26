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

            var customers = state.customers.map(u => u.id !== action.payload.id ? u : action.payload);
            return {
                ...state,
                customers
            }

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

            var companies = state.companies.map(u => u.id !== action.payload.id ? u : action.payload);
            return {
                ...state,
                companies
            }

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
            


        default:
            return state;
    }
}