import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import WithRedirect from "../../hocs/with-redirect";
import TicketForm from "../../components/ticketForm";

import { TicketsContext } from "../../contexts/tickets.context";
import { ReactComponent as Preloader } from '../../assets/loader.svg';

const Details = () => {
  const { id } = useParams();

  const { tickets, setTickets } = useContext(TicketsContext);
  const navigate = useNavigate();

  const index = tickets.findIndex(ticket => ticket.id === +id);
  const updatedTicket = Object.assign({}, tickets[index]);

  const editStatus = updatedTicket.status;

  const [ticket, setTicket] = useState(updatedTicket);
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  const [validation, setValidation] = useState({
    title: false,
    description: false
  });

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
        setTickets(prevState => ([
            ...prevState.slice(0, index),
            ticket,
            ...prevState.slice(index + 1)
          ])
        );
        setLoadingIndicator(false);
        navigate('/');
      }, 2000);
    }
  };
  
  useEffect(() => {
    const statusesSelector = document.getElementById("statuses-select");
    if (editStatus === 1) {
      statusesSelector.value = 2;
      statusesSelector.querySelector("[value='1']").setAttribute("disabled", "disabled");
      updatedTicket.status = 2;
    } else if (editStatus === 2) {
      statusesSelector.value = 1;
      statusesSelector.querySelector("[value='2']").setAttribute("disabled", "disabled");
      updatedTicket.status = 1;
    } else if (editStatus === 3) {
      statusesSelector.value = 1;
      statusesSelector.querySelector("[value='2']").setAttribute("disabled", "disabled");
      statusesSelector.querySelector("[value='3']").setAttribute("disabled", "disabled");
      updatedTicket.status = 1;
    }
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [editStatus, updatedTicket, tickets]);

  return (
    <div className="px-6 py-4 bg-white-100">
      <div className="container mx-auto">
        <div className="block max-w-md mx-auto">
          <h1 className="font-bold text-2xl">Edit Ticket #{id} <div className={`inline-block text-white text-sm bg-gray-400 py-1 px-3 rounded align-middle ml-5`}>{editStatus === 1 ? "open" : editStatus === 2 ? "in progress" : "completed"}</div></h1>
          <div className="text-xs text-gray-400 mt-1">Created on: {new Date(ticket.created).toLocaleString()}</div>
          <hr className="my-3"/>
          <TicketForm ticket={ticket} handleToUpdateNewTicket={handleToUpdateNewTicket} validation={validation} />
          <div className="flex justify-end">
          <Link to='/' className="mt-6 mr-8 text-blue-600 text-sm center font-bold hover:underline align-middle flex justify-end items-center">Cancel</Link>
            <button
              className="relative mt-6 disabled:hover:bg-green-600 disabled:opacity-75 bg-green-600 text-white active:bg-green-800 font-bold uppercase text-sm px-10 py-2 rounded shadow hover:shadow-lg hover:bg-green-800 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              disabled={loadingIndicator}
              onClick={onSave}
            >
              { loadingIndicator ? <Preloader className="h-5 absolute ml-0 left-0" /> : null } Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default WithRedirect(Details);