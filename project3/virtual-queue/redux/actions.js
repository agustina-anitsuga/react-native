import {apiCreateQueue, apiGetQueueStats, apiNextCustomer, apiSubscribeToQueue} from '../api'

// action types

export const RESET = 'RESET'

export const CREATE_QUEUE_SENT = 'CREATE_QUEUE_SENT'
export const CREATE_QUEUE_FULFILLED = 'CREATE_QUEUE_FULFILLED'
export const CREATE_QUEUE_REJECTED = 'CREATE_QUEUE_REJECTED'

export const REFRESH_QUEUE_SENT = 'REFRESH_QUEUE_SENT'
export const REFRESH_QUEUE_FULFILLED = 'REFRESH_QUEUE_FULFILLED'
export const REFRESH_QUEUE_REJECTED = 'REFRESH_QUEUE_REJECTED'

export const NEXT_CUSTOMER_SENT = 'NEXT_CUSTOMER_SENT'
export const NEXT_CUSTOMER_FULFILLED = 'NEXT_CUSTOMER_FULFILLED'
export const NEXT_CUSTOMER_REJECTED = 'NEXT_CUSTOMER_REJECTED'

export const QUEUE_SUBSCRIPTION_SENT = 'QUEUE_SUBSCRIPTION_SENT'
export const QUEUE_SUBSCRIPTION_FULFILLED = 'QUEUE_SUBSCRIPTION_FULFILLED'
export const QUEUE_SUBSCRIPTION_REJECTED = 'QUEUE_SUBSCRIPTION_REJECTED'

export const CONTACT_UPDATE_SENT = 'CONTACT_UPDATE_SENT'
export const CONTACT_UPDATE_FULFILLED = 'CONTACT_UPDATE_FULFILLED'
export const CONTACT_UPDATE_REJECTED = 'CONTACT_UPDATE_REJECTED'


// sync action creators

export const reset = data => ({
  type: RESET,
  payload: data,
})


// async action creator

export const createQueue = queue => async dispatch => {
  dispatch({type: CREATE_QUEUE_SENT})
  try {
    const queueId = await apiCreateQueue( queue )
    dispatch({type: CREATE_QUEUE_FULFILLED, payload: queueId})
  } catch (err) {
    dispatch({type: CREATE_QUEUE_REJECTED, payload: err.message})
  }
}

export const refreshQueue = queueId => async dispatch => {
  dispatch({type: REFRESH_QUEUE_SENT})
  try {
    const queue = await apiGetQueueStats( queueId )
    dispatch({type: REFRESH_QUEUE_FULFILLED, payload: queue})
  } catch (err) {
    dispatch({type: REFRESH_QUEUE_REJECTED, payload: err.message})
  }
}

export const nextCustomer = queueId => async dispatch => {
  dispatch({type: NEXT_CUSTOMER_SENT})
  try {
    const queue = await apiNextCustomer( queueId )
    dispatch({type: NEXT_CUSTOMER_FULFILLED, payload: queue})
  } catch (err) {
    dispatch({type: NEXT_CUSTOMER_REJECTED, payload: err.message})
  }
}

export const subscribeToQueue = data => async dispatch => {
  dispatch({type: QUEUE_SUBSCRIPTION_SENT})
  try {
    const subscription = await apiSubscribeToQueue( data );
    dispatch({type: QUEUE_SUBSCRIPTION_FULFILLED, payload: subscription})
  } catch (err) {
    dispatch({type: QUEUE_SUBSCRIPTION_REJECTED, payload: err.message})
  }
}
