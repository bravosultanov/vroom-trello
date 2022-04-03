import Modal from "../modal";
import TicketForm from "../ticketForm";

const AddTicketModal = ({showModal, onClose, onSave, ticket, handleToUpdateNewTicket, validation, loadingIndicator}) => {
  return (
    <Modal showModal={showModal} title="Add a new ticket" onClose={onClose} onSave={onSave} loadingIndicator={loadingIndicator}>
      <TicketForm ticket={ticket} handleToUpdateNewTicket={handleToUpdateNewTicket} validation={validation} />
    </Modal>
  )
};

export default AddTicketModal;