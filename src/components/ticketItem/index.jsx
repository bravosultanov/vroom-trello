import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { TicketsContext } from "../../contexts/tickets.context";

const TicketItem = ({ statusId, tickets }) => {
  const navigate = useNavigate();
  const { setTickets } = useContext(TicketsContext);

  const handleStatusChange = (id, newStatus) => {
    const index = tickets.findIndex(ticket => ticket.id === id);
    const updatedTicket = Object.assign({}, tickets[index], { status: newStatus });
    setTickets(prevState => ([
        ...prevState.slice(0, index),
        updatedTicket,
        ...prevState.slice(index + 1)
      ])
    );
  };

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleTicketClick = (e) => {
    if (!e.target.classList.contains('badge')) {
      navigate(`ticket/${e.target.getAttribute('data-id')}`)
    }
  };

  // Added counter for current tickets
  let counter = {
    s_1: 0,
    s_2: 0,
    s_3: 0
  };

  tickets.forEach((ticket) => {
    counter[`s_${ticket.status}`]++;
  });
  
  return (
    <>
      <div className="text-sm text-gray-500">{ counter[`s_${statusId}`] } ticket{ counter[`s_${statusId}`] !== 1 ? "s" : null }</div>
      <div className="overflow-y-auto max-h-[78vh]">
        { tickets.map(({id, title, status}) => {
            return status === statusId  
              ? <div key={ id } data-id={ id } className="bg-white text-sm rounded-md p-2 px-4 mt-4 shadow-md cursor-pointer hover:bg-gray-100" onClick={ handleTicketClick }>
                  <span className="font-bold whitespace-pre-line break-words" data-id={ id }>{ title }</span>
                  <div className="text-xs flex flex-wrap mt-3 gap-3" data-id={ id }>
                    { statusId === 2 || statusId === 3 ? <div onClick={(e) => handleStatusChange(id, 1)} className='badge p-1 px-3 text-white bg-teal-500 hover:bg-teal-800 rounded-md'>open</div> : null }
                    { statusId === 1 ? <div onClick={(e) => handleStatusChange(id, 2)} className='badge p-1 px-3 text-white bg-orange-400 rounded-md hover:bg-orange-600'>in progress</div> : null }
                    { statusId === 1 || statusId === 2 ? <div onClick={(e) => handleStatusChange(id, 3)} className='badge p-1 px-3 text-white bg-green-500 hover:bg-green-700 rounded-md'>completed</div> : null}
                  </div>
                </div> 
              : null;
          })
        } 
      </div>     
    </>
  )
};

export default TicketItem;