import { api, API_BASE_URL } from "../../Config/ApiConfig"
import { UPDATE_CART_ITEM_FAILURE } from "../Cart/ActionType"
import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, UPDATE_PAYMENT_FAILURE, UPDATE_PAYMENT_REQUEST } from "./ActionType"

export const createPayment = (orderId) => async (dispatch) => {
    dispatch({ type: CREATE_PAYMENT_REQUEST })
    try {
        const { data } = await api.post(`/api/payment/${orderId}`)
        if (data.payment_link_url) {
            window.location.href = data.payment_link_url
        }
    } catch (error) {
        dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message })
    }

}

export const updatePayment = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PAYMENT_REQUEST })
    try {
        const { data } =await api.get(`/api/payment?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`)
    } catch (error) {
        dispatch({ type: UPDATE_PAYMENT_FAILURE, payload: error.message })
    }
}

export const updatePaymentStatus=(orderId)=>async (dispatch)=>{
    dispatch({type: UPDATE_PAYMENT_REQUEST})
    try {        
        const { data } =await api.get(`/api/payment/cod/${orderId}`)
    } catch (error) {
        dispatch({type:UPDATE_PAYMENT_FAILURE,payload:error.message})
    }
}