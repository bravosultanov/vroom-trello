import { useContext } from "react";
import WithRedirect from "../../hocs/with-redirect";

import { TicketsContext } from "../../contexts/tickets.context";
import { STATUSES } from '../../variables';
import TicketsList from "../../components/ticketsList";

const Home = () => {
  const { tickets } = useContext(TicketsContext);

  return (
    <div className="px-6 py-4 bg-white-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <TicketsList statuses={ STATUSES } tickets={ tickets } />
        </div>
      </div>
    </div>
  )
};

export default WithRedirect(Home);