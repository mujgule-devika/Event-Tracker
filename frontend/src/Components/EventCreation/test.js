import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
//import ReactDOM from 'react-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import FileBase from 'react-file-base64';
import { createEvent } from '../../Actions/events';
import { useDispatch } from 'react-redux';
import './EventCreation.scss';
import CheckFieldsButton from "react-validation/build/button"

const EventCreation = () => {
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [endTime, setEndTime] = useState("")
    const [location, setLocation] = useState("")
    const dispatch = useDispatch()
    const [errorMsg, setErrorMsg] = useState("")
    const formElement = React.useRef()
    //for modal
    const user = JSON.parse(localStorage.getItem('userProfile')
    )

    /**
     * Validation for creation of event form
     * @param {*} value value to check if empty
     * @returns error message if feild is empty
     */
    const requiredField = (value) => {
        if (!value) {
            return (
                <div className='text-red-500 text-sm italic mt-2'><sup>*</sup> Required Field!
                </div>
            )
        }
    }



    //clear all states
    const clearAllFields = async () => {
        await setDate("");
        await setDescription("");
        await setImg("");
        await setEventName("");
        await setTime("");
        await setLocation("")
        await setEndTime("")
    }


    //whenever form is submitted
    const submitForm = async (e) => {
        
        e.preventDefault();
        formElement.current.validateAll()
        // checkIfNull;
        if (!user?.profileObj?.name) {
            clearAllFields();
            return alert("You have to sign in to make a event")

        }

        dispatch(createEvent(eventName, location, description, img, date, time, endTime, user?.profileObj?.name))

        clearAllFields();

    }
    //whenever fields are updated
    const change = (oneElement, property) => {
let value = oneElement.target.value;
        switch (property) {
            case 'setEventName':
                setEventName(value);
                break;
            case 'setLocation':
                setLocation(value);
                break;
            case 'setDescription':
                setDescription(value);
                break;
            case 'setDate':
                setDate(value);
                break;
            case 'setTime':
                setTime(value);
                break;
            case 'setEndTime':
                setEndTime(value)
                break
            default: break;
        }


    }
    const onFileUpload = (base64) => {
        if (base64) {
            setImg(base64.base64);
        }

    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    // const closeAdd={

    // }
    //render() { 
    // const close = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    return (
        <div className='container bg-white h-3/4'>
            <Form onSubmit={(event) => submitForm(event)} ref={formElement} className="form">
                <div className='content_wrapper col-span-1 px-5 py-10'>

                    <h1 className="tagline"> Create an Event</h1>
                    <fieldset className="column_fieldset">
                        <label> Event Name</label>
                        <Input 
                        type="text" 
                        name="eventName" 
                        value={eventName} 
                        className="_inputField" 
                        data-state='setEventName'
                        onChange={change}
                        validations={[requiredField]} 
                       
                        />
                    </fieldset>
                    <fieldset className="column_fieldset">
                        <label> Location</label>
                        <Input 
                        type="text" 
                        name="location" 
                        className='_inputField'
                        value={location} 
                        id="location" 
                        data-state='setLocation'
                        validations={[requiredField]} 
                        onChange={change} />
                    </fieldset>
                    <fieldset className="column_fieldset">
                        <label> Description</label>
                        <Input 
                        type="textarea" 
                        value={description} 
                        name="desc" 
                        className="_inputField" 
                        data-state='setDescription'
                        validations={[requiredField]} 
                        onChange={change} 
                        placeholder="What's the event about?"  />
                    </fieldset>
                    <div className=''>
                        <fieldset className="column_fieldset col-span-1">
                            <label> Date </label>
                            <Input 
                            type="date" 
                            value={date} 
                            name="date" 
                            className="_inputField" 
                            data-state='setDate'
                            validations={[requiredField]} 
                            onChange={change}
                        />
                        </fieldset>
                        <fieldset className="column_fieldset col-span-2">
                            <label> Time</label>
                            <Input 
                            type="time" 
                            value={time} 
                            name="time" 
                            className="_inputField" 
                            data-state='setTime'
                            validations={[requiredField]} 
                            onChange={change}
                             />
                        </fieldset>
                    </div>
                    {/* <fieldset className="column_fieldset">
                        <label>End Time</label>
                        <input type="time" value={endTime} name="endTime" className="desc" onChange={(e) => change(e, "setEndTime")} required />
                    </fieldset> */}
                    <fieldset className="column_fieldset right">
                        <label> Image </label>
                        {/* <Input type="file"  accept="image/*" name="image" id="file" /> */}

                        <FileBase type="file" multiple={false} onDone={(base64) => onFileUpload(base64)} />
                    </fieldset>
                    <button onSubmit={(event) => submitForm(event)} className="save" type="submit">Add</button>

                </div>

                {/* <button className="closeAdd" onClick={()=>closeAdd}>{close}</button> */}
            </Form>

        </div>
    )
}


export default EventCreation;



//
import React from 'react';
import { useSelector } from 'react-redux';
import EventCreation  from '../EventCreation/EventCreation';
import './Modal.scss'

export default function Modal({openModal, event, setShowModal} ){
    const isAddModal = useSelector((state) => state.modal)
    console.log(event)
    return (

        <div className="modal_fade">

            <div className='popup'>
                <div className="modal-body">
                    test text remove later
                    
                    {/* {console.log("EditModal true") : */}
                    {isAddModal?<EventCreation></EventCreation>:
                        <h1>Edit modal</h1>
                        
                    }
                    
                </div>
                {/* onClick={setShowModal(false)} */}
                <div className="modal-close" >
                    <img src="assets/images/close.png"/>
                </div>
=======
       
         </div>
            
          
      </div>
      
    );
}