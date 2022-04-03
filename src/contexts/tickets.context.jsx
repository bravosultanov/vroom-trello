import { createContext, useState } from "react";
import TICKETS from '../tickets.json';

export const TicketsContext = createContext({
  tickets: [],
  setTickets: () => []
});

export const TicketsProvider = ({children}) => {
  if (localStorage.getItem('tickets') === null) {
    localStorage.setItem('tickets', JSON.stringify(TICKETS));
  }
  const [tickets, setTickets] = useState(JSON.parse(localStorage.getItem('tickets')));
  const value = { tickets, setTickets };

  return <TicketsContext.Provider value={value}>{ children }</TicketsContext.Provider>
};