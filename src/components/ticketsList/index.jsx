import { useState, useContext, useEffect } from "react";

import TicketItem from "../ticketItem";
import AddTicketModal from "../addTicketModal";

import { TicketsContext } from "../../contexts/tickets.context";

const TicketsList = ({ statuses, tickets }) => {
  const [showModal, setShowModal] = useState(false);
  const { setTickets } = useContext(TicketsContext);
  
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    status: 1
  });

  let lastTicketId = tickets.length ? tickets[tickets.length - 1].id : 1;

  const [validation, setValidation] = useState({
    title: false,
    description: false
  });

  const [loadingIndicator, setLoadingIndicator] = useState(false);

  const handleToUpdateNewTicket = (value, field) => {
    setValidation(prevState => ({
      ...prevState,
      [field]: false
    }));
    setTicket(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleClick = (e) => {
    setTicket(prevState => ({
      ...prevState,
      status: +e.target.getAttribute('status-id')
    }));
    setShowModal(true);
  };

  const onClose = () => {
    setTicket({
      title: "",
      description: "",
      status: 1
    });
    
    setShowModal(false);
  };

  const onSave = () => {
    let errorCounter = 0;
    Object.entries(validation).forEach(([key, value]) => {
      setValidation(prevState => ({
        ...prevState,
        [key]: typeof ticket[key] === 'string' && ticket[key].trim() === ""
      }));
      if (typeof ticket[key] === 'string' && ticket[key].trim() === "") {
        errorCounter++;
      }
    });
    if (!errorCounter) {
      setLoadingIndicator(true);
      setTimeout(() => {
        const newTicket = {
          id: ++lastTicketId,
          title: ticket.title.trim(),
          description: ticket.description.trim(),
          status: +ticket.status,
          created: new Date().getTime()
        }
        setTickets(prevState => ([
          ...prevState,
          newTicket
        ]));
        setLoadingIndicator(false);
        onClose();
      }, 2000);
    }
  };

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  return (
    <>
      { statuses.map((status) => {
          return (
            <div key={status.id} className="p-4 border border-gray-300 rounded-md bg-gray-200 relative">
              <div className="font-bold text-sm flex justify-between">
                <div>{ status.name }</div>
                <button title={`Add new ticket with ${ status.name } status`} onClick={handleClick} status-id={`${status.id}`} id={`add-with-status-${status.id}`} className="bg-blue-600 text-white px-2 h-7 w-7 absolute right-4 rounded-md top-3 font-bold hover:bg-blue-800">+</button>
              </div>
              <TicketItem statusId={ status.id } tickets={ tickets } />
            </div>
          )
        })
      }
      <AddTicketModal showModal={showModal} onClose={onClose} onSave={onSave} ticket={ticket} handleToUpdateNewTicket={handleToUpdateNewTicket} validation={validation} loadingIndicator={loadingIndicator} />
    </>
  )
};

export default TicketsList;