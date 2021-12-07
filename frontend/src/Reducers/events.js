import { FETCH_ALL, CREATE, UPDATE, LIKE, DELETE } from "../Constants/actionTypes"

const eventsReducer = (events = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [ ...events, action.payload ]
        case UPDATE:
            return events.map((event) => event._id === action.payload._id ? action.payload : event)
        case LIKE:
            return events.map((event) => (event._id === action.payload._id ? action.payload : event))
        case DELETE:
            return events.filter((event) => event.id !== action.payload)
        default:
            return events
    }
}


export default eventsReducer