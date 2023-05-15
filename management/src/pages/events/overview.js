import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import "../../styles/calendar.css";
import ModalAdd from "../../modules/events/modalAdd";
import ModalDelete from "../../modules/events/modalDelete";
import ModalUpdate from "../../modules/events/modalUpdate";
import { getUsableDatesAndTimes, isSameDay } from "./utils.js"

const EventOverview = () => {
    const [date, setDate] = useState(new Date());
    const [eventData, setEventData] = useState()
    const [datesToMark, setDatesToMark] = useState()
    const [selectedItem, setSelectedItem] = useState(undefined)
    const [ShowAddEventModal, setShowAddEventModal] = useState(false);
    const [ShowDeleteEventModal, setShowModalDelete] = useState(false);
    const [ShowUpdateEventModal, setShowModalUpdate] = useState(false);

    useEffect(() => {
        refreshData();
    }, [date]);

    const ToggleShowAddEventModal = () => {
        setShowAddEventModal(!ShowAddEventModal);
    }

    const ToggleShowDeleteEventModal = (event) => {
        setShowModalDelete(!ShowDeleteEventModal);
        setSelectedItem(event)
    }

    const ToggleShowUpdateEventModal = (event) => {
        setShowModalUpdate(!ShowUpdateEventModal);
        setSelectedItem(event)
    }

    const createEvent = () => {
        ToggleShowAddEventModal(date);
    }

    function tileClassName({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
            if (datesToMark && datesToMark.find(dDate => isSameDay(dDate, date))) {
                return 'react-calendar__tile--occupied';
            }
        }
    }

    const refreshData = async () => {
        const startdate = date.toString().split(',')[0];
        const selectedDate = new Date(startdate);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const formattedDate = `${year}-${month}-${day}`;

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/event/?date=" + formattedDate, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                // sort the data by start date
                const sortedData = data.sort((b, a) => new Date(a.startdate) - new Date(b.startdate));
                setEventData(sortedData);
            });

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/event", { method: "GET" })
            .then(response => response.json())
            .then(data => {
                // sort the data by start date
                const sortedData = data.sort((b, a) => new Date(a.startdate) - new Date(b.startdate));

                // extract dates from eventData
                const datesToAddContentTo = sortedData.map(event => event.startdate);

                // set datesToMark to the extracted dates
                setDatesToMark(datesToAddContentTo);
            });
    }

    return (
        <>
            <div className='container mt-3'>
                <h1 className='text-center font-moesland'>Evenementen</h1>

                <div className='d-flex justify-content-center mt-2'>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        selectRange={true}
                        tileClassName={tileClassName}
                    />
                </div>
                {date.length > 0 ? (
                    <p className='text-center'>
                        <span className='bold'>Start:</span>{' '}
                        {date[0].toDateString()}
                        &nbsp;|&nbsp;
                        <span className='bold'>End:</span> {date[1].toDateString()}
                    </p>
                ) : (
                    <p className='text-center'>
                        {date.toDateString()}
                    </p>
                )}

                {eventData &&
                    <div className="pt-5 col-md-11 mx-auto text-center">
                        <div className="float-end col-md-3 pb-3">
                            <button onClick={createEvent} type="button" className="btn btn-moesland">
                                Nieuw Evenement
                            </button>
                        </div>
                        <table className=" table table-striped " >
                            <thead>
                                <tr className="bg-moesland text-white">
                                    <th scope="col">Titel</th>
                                    <th scope="col">Start</th>
                                    <th scope="col">Eind</th>
                                    <th scope="col">Locatie</th>
                                    <th scope="col">Acties</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">
                                {eventData.map(event => (
                                    <tr key={event.id} >
                                        <td className="title">{event.title}</td>
                                        <td className="startdate">
                                            {getUsableDatesAndTimes(event.startdate).altDate} {getUsableDatesAndTimes(event.startdate).time}
                                        </td>
                                        <td className="enddate">
                                            {getUsableDatesAndTimes(event.enddate).altDate} {getUsableDatesAndTimes(event.enddate).time}
                                        </td>
                                        <td className="location">{event.location}</td>
                                        <td>
                                            <button onClick={() => ToggleShowDeleteEventModal(event)} className="btn btn-danger mx-2">Verwijderen</button>
                                            <button onClick={() => ToggleShowUpdateEventModal(event)} className="btn btn-moesland">Aanpassen</button>
                                        </td>
                                    </tr>
                                ))

                                }
                            </tbody>
                        </table>
                    </div>
                }

                {ShowAddEventModal && <ModalAdd toggleModal={ToggleShowAddEventModal} date={date} refreshOverview={refreshData} />}
                {ShowDeleteEventModal && <ModalDelete toggleModal={ToggleShowDeleteEventModal} selectedItem={selectedItem} refreshOverview={refreshData} />}
                {ShowUpdateEventModal && <ModalUpdate toggleModal={ToggleShowUpdateEventModal} selectedItem={selectedItem} refreshOverview={refreshData} />}
            </div>
        </>
    );
}

export default EventOverview;