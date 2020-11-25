import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Modal, Button, Alert } from 'react-bootstrap';
import { updateNotes, deleteNotes, handleError } from '../Redux/Actions/noteAction';
import './css/Component2.css'
const Component2 = () => {
    const dispatch = useDispatch();
    var notesDetails = useSelector(state => state.data);
    var error = useSelector(state => state.error);
    const [idValue, setIDValue] = useState(0)
    const [newDate, setNewDate] = useState('');
    const [oldDate, setOldDate] = useState('');

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [show, setShow] = useState(false)
    const [showVal, setShowVal] = useState(false)
    const [successVal, setSuccessVal] = useState(false)
    const [deleteVal, setDeleteVal] = useState(false)


    const handleClick = (datevalue, titleval, descriptionval) => {
        setNewDate(datevalue)
        setTitle(titleval)
        setDescription(descriptionval)
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleUpdate = (datevalue, id, titleval, descriptionval) => {

        setNewDate(datevalue)
        setOldDate(datevalue)
        setIDValue(id)
        setTitle(titleval)
        setDescription(descriptionval)
        setShowVal(true)

    }

    const onUpdate = () => {

        if (newDate == "" || title == "") {
            alert('Please Fill the mandatory fields!!')
            return
        }

        var compareDate = newDate;
        compareDate = compareDate.split(" ")
        if (compareDate[0].length !== 3 || compareDate[0] == '' || compareDate[1] == '' || compareDate[2] == '' || compareDate.length !== 3 || compareDate[2].length !== 4) {
            alert('Date should be in mmm dd yyyy format!!')
            return;
        }

        if (compareDate[1] < 1 || compareDate[1] > 31) {
            alert('Invalid Date!!')
            return;
        }

        compareDate[0] = compareDate[0].toUpperCase();
        if (compareDate[0] == 'APR' || compareDate[0] == 'JUN' || compareDate[0] == 'SEP' || compareDate[0] == 'NOV') {
            if (compareDate[1] < 1 || compareDate[1] > 30) {
                alert('Selected month has 30 days!!')
                return;
            }
        }
        else if (compareDate[0] == 'FEB') {

            compareDate[2] = Number(compareDate[2]);
            if (compareDate[2] % 4 == 0) {
                if (compareDate[2] % 100 == 0) {
                    if (compareDate[2] % 400 == 0) {
                        if (compareDate[1] < 1 || compareDate[1] > 29) {
                            alert('Selected year is a leap year!!')
                            return;
                        }
                    }
                }

                else {
                    if (compareDate[1] < 1 || compareDate[1] > 29) {
                        alert('Selected year is a leap year!!')
                        return;
                    }
                }
            }

            else {
                if (compareDate[1] < 1 || compareDate[1] > 28) {
                    alert('Selected year is not a leap year!!')
                    return;
                }
            }
        }
        if (newDate === oldDate) {
            var flag = 'yes';
        }
        else {
            var flag = 'no';
            setOldDate(newDate)
        }

        dispatch(updateNotes(idValue, newDate, oldDate, title, description, flag))
        setShowVal(false)
        setSuccessVal(true)
    }

    const onDelete = () => {
        if (newDate == "" || title == "") {
            alert('Please Fill the mandatory fields!!')
            return
        }

        var compareDate = newDate;
        compareDate = compareDate.split(" ")
        if (compareDate[0].length !== 3 || compareDate[0] == '' || compareDate[1] == '' || compareDate[2] == '' || compareDate.length !== 3 || compareDate[2].length !== 4) {
            alert('Date should be in mmm dd yyyy format!!')
            return;
        }

        if (compareDate[1] < 1 || compareDate[1] > 31) {
            alert('Invalid Date!!')
            return;
        }

        compareDate[0] = compareDate[0].toUpperCase();
        if (compareDate[0] == 'APR' || compareDate[0] == 'JUN' || compareDate[0] == 'SEP' || compareDate[0] == 'NOV') {
            if (compareDate[1] < 1 || compareDate[1] > 30) {
                alert('Selected month has 30 days!!')
                return;
            }
        }
        else if (compareDate[0] == 'FEB') {

            compareDate[2] = Number(compareDate[2]);
            if (compareDate[2] % 4 == 0) {
                if (compareDate[2] % 100 == 0) {
                    if (compareDate[2] % 400 == 0) {
                        if (compareDate[1] < 1 || compareDate[1] > 29) {
                            alert('Selected year is a leap year!!')
                            return;
                        }
                    }
                }

                else {
                    if (compareDate[1] < 1 || compareDate[1] > 29) {
                        alert('Selected year is a leap year!!')
                        return;
                    }
                }
            }

            else {
                if (compareDate[1] < 1 || compareDate[1] > 28) {
                    alert('Selected year is not a leap year!!')
                    return;
                }
            }
        }

        dispatch(deleteNotes(idValue, newDate))
        setShowVal(false)
        setDeleteVal(true)
    }



    const handleCloseEvent = () => {
        dispatch(handleError())
        setShowVal(false)

    }



    useEffect(() => {

        if (error) {
            setShowVal(true)
            setDeleteVal(false)
        }




        if (document.querySelector('.error_id')) {
            window.setTimeout(function () {
                document.querySelector('.error_id').style.display = 'none'
            }, 3000)
        }

        if (document.querySelector('.alert_id')) {
            window.setTimeout(function () {
                setSuccessVal(false)
            }, 3000)
        }

        if (document.querySelector('.delete_id')) {
            window.setTimeout(function () {
                setDeleteVal(false);
            }, 3000)
        }



    }, [dispatch, error, successVal, deleteVal])
    return (
        <>

            <div className="component2">

                <h2 className="component2_heading"><i className="fas fa-list"></i> To Do's</h2>
                {
                    successVal == true &&
                    <Alert variant="success" className="alert_id">
                        Note Updated Successfully
            </Alert>
                }

                {
                    deleteVal == true &&
                    <Alert variant="danger" className="delete_id">
                        Note Deleted Successfully
            </Alert>
                }
                {Object.keys(notesDetails).length !== 0 ? (
                    Object.entries(notesDetails).map(keys => (

                        <div className="style_dates_div">
                            <h3 className="date_heading">
                                <i className="fas fa-calendar-week"></i> {keys[0]}
                            </h3>
                            <ol>

                                {

                                    keys[1].map(item => (

                                        <div className="list_items">
                                            <li key={item.id}>{item.title} <i className="fas fa-eye view_icon" onClick={() => { handleClick(keys[0], item.title, item.description) }}></i> <i className="far fa-edit edit_icon" onClick={() => { handleUpdate(keys[0], item.id, item.title, item.description) }}></i></li>
                                            <hr />
                                        </div>


                                    ))
                                }

                            </ol>

                        </div>

                    ))
                ) : (
                        <div className="no_notes">No notes Added!!</div>
                    )
                }


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="modal_date_heading">{newDate ? newDate : "loading"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group controlId="formBasictitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Title.." value={title} onChange={(e) => setTitle(e.target.value)} readOnly />
                            </Form.Group>

                            <Form.Group controlId="formBasicDesc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} readOnly />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/*modal which appears on update button click*/}


                <Modal show={showVal} onHide={handleCloseEvent}>
                    {
                        error &&
                        <Alert variant='danger' className="error_id">
                            {error}
                        </Alert>
                    }


                    <Modal.Header closeButton>
                        <Modal.Title id="modal_date_heading">{newDate ? newDate : ""}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicOldDate" hidden>
                                <Form.Label>old Date</Form.Label>
                                <Form.Control type="text" value={oldDate} onChange={(e) => setOldDate(e.target.value)} readOnly />
                            </Form.Group>
                            <Form.Group controlId="formBasicdate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="text" placeholder="Enter Date.." value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                            </Form.Group>
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

                        <Button variant="secondary" onClick={onUpdate}>
                            Update
                        </Button>
                        <Button variant="danger" onClick={onDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}


export default Component2;