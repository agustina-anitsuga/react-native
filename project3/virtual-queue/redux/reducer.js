import { combineReducers } from 'redux';
import { 
  RESET, 
  CREATE_QUEUE_FULFILLED, CREATE_QUEUE_REJECTED, 
  REFRESH_QUEUE_FULFILLED, REFRESH_QUEUE_REJECTED, 
  NEXT_CUSTOMER_FULFILLED, NEXT_CUSTOMER_REJECTED,
  QUEUE_SUBSCRIPTION_FULFILLED, QUEUE_SUBSCRIPTION_REJECTED,
  CONTACT_UPDATE_FULFILLED, CONTACT_UPDATE_REJECTED,
  } from './actions';


const merge = (prev, next) => Object.assign({}, prev, next)

const contactDetailsReducer = ( state = { }, action ) => {
  console.log('contactDetailsReducer - action:'+action.type);
  console.log(action.payload);
  switch(action.type) {
    case CONTACT_UPDATE_FULFILLED:
      return merge( state, action.payload ) 
    case CONTACT_UPDATE_REJECTED:
      return merge( state, { contactUpdateError: action.payload } )  
    case RESET:
      return {}
    default:
      return state
  }
}

const subscriptionReducer = ( state = { }, action ) => {
  console.log('subscriptionReducer - action:'+action.type);
  console.log(action.payload);
  switch(action.type) {
    case QUEUE_SUBSCRIPTION_FULFILLED:
      return merge( state, action.payload ) 
    case QUEUE_SUBSCRIPTION_REJECTED:
      return merge( state, { queueSubscriptionError: action.payload } )  
    case RESET:
      return {}
    default:
      return state
  }
}

const currentCustomerReducer = ( state = { }, action ) => {
  console.log('currentCustomerReducer - action:'+action.type);
  console.log(action.payload);
  switch(action.type) {
    case NEXT_CUSTOMER_FULFILLED:
      return merge( state, action.payload )  
    case NEXT_CUSTOMER_REJECTED:
      return merge( state, { nextCustomerError: action.payload } )    
    case RESET:
      return {} 
    default:
      return state
  }
}

const storeReducer = ( state = { }, action ) => {
  console.log('storeReducer - action:'+action.type);
  console.log(action.payload);
  switch (action.type) {
    case CREATE_QUEUE_FULFILLED:
      return merge( state, action.payload )    
    case CREATE_QUEUE_REJECTED:
      return merge( state, { queueCreateError: action.payload } )
    case REFRESH_QUEUE_FULFILLED:
      return merge( state, action.payload )    
    case REFRESH_QUEUE_REJECTED:
      return merge( state, { queueRefreshError: action.payload } )
    case RESET:
      return {}
    default:
      return state
  }
}

const reducer = combineReducers({
  contactDetails: contactDetailsReducer,
  subscription: subscriptionReducer,
  store: storeReducer,
  currentCustomer: currentCustomerReducer,
})

export default reducer
