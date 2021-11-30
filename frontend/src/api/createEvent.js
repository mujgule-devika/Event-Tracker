import axios from 'axios'

const baseUrl = "http://localhost:4200/"

//this is where you make all your api calls and export them

/**
 * Service call for storing new user information in database
 * @param {*} eventName 
 * @param {*} description 
 * @param {*} img 
 * @param {*} date 
 * @param {*} time 
 * @returns a promise which resolves to a response object or error
 */
 export const createEvent = (eventName,description,img,date,time) => {
    return axios.post(baseUrl + "api/events/createEvent", {
        eventName: eventName,
        description: description,
        img: img,
        date: date,
        time: time
    });
}