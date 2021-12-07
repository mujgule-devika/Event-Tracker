import * as api from '../Api/index'

export const getEvents = () => async (dispatch) => {
    try {
       const {data} = await api.getEvents()
       dispatch({ type: 'FETCH_ALL', payload: data })
       
    } catch (error) {
       console.log(error.message) 
    }
}

export const createEvent = (eventName, location, description, img, date, time, name) => async (dispatch) => {
    try {
        const {data} = await api.createEvent(eventName, location, description, img, date, time, name)
        dispatch({ type: 'CREATE', payload: data })

    } catch (error) {
       console.log(error.message) 
    }
}

export const likeEvent = (id) => async (dispatch) => {
    try {
        const {data} = await api.likeEvent(id)
        dispatch({ type: 'LIKE', payload: data })
    } catch (error) {
       console.log(error.message) 
    }
}

export const deleteEvent = (id) => async (dispatch) => {
    try{
        await api.deleteEvent(id)
        dispatch({ type: 'DELETE', payload: id })
    } catch (e) {
        console.log(e)
    }
}

export const updateEvent = (id, event) => async (dispatch) => {
    try {
        const { data } = await api.updateEvent(id, event)
        dispatch({ type: 'UPDATE', payload: data })
    } catch (e) {
        console.log(e.message)
    }
}
