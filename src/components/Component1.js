import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Modal, Button, Alert } from 'react-bootstrap';
import './css/Component1.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addNotes } from '../Redux/Actions/noteAction'
const Component1 = () => {

    const [dateval, setValue] = useState(new Date());
    const [date_value, setDateValue] = useState('');
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [show, setShow] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch();

    const handleChange = (dateval) => {

        setValue(dateval);

        var dateUpdated = dateval.toDateString();
        dateUpdated = dateUpdated.split(' ');

        dateUpdated.shift()  //removing first element of array

        dateUpdated = dateUpdated.join(' ')

        setDateValue(dateUpdated)

        setShow(true);
    }
    const handleClose = () => {

        setTitle('');
        setDescription('');
        setShow(false);

    }

    const handleAddNote = () => {

        if (title == "") {
            alert('Title is a mandatory field!!')
            return;
        }

        dispatch(addNotes(date_value, title, description));
        setShow(false);
        setTitle('');
        setDescription('');
        setShowAlert(true)
    }


    useEffect(() => {
        if (document.querySelector('.alert_id')) {
            window.setTimeout(function () {
                setShowAlert(false)
            }, 3000)
        }
    }, [showAlert])

    return (
        <>
            <div className="component1">
                <h2 className="component1_heading"><i className="fas fa-calendar-week"></i> Pick a Date</h2>
                {
                    showAlert == true &&
                    <Alert variant="success" className="alert_id">
                        Note Added Successfully
                    </Alert>
                }
                <Calendar onChange={handleChange} value={dateval} />

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="modal_date_heading">{date_value ? date_value : "loading"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasictitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Title.." value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicDesc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAddNote}>
                            ADD NOTE
                        </Button>
                        <Button variant="danger" onClick={handleClose}>
                            Discard
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}


export default Component1;