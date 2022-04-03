
const TicketForm = ({ticket, handleToUpdateNewTicket, validation}) => {
  
  return (
    <form className="block">
      
      <input className="block text-sm py-2 px-4 rounded-md w-full border outline-none" type="text" placeholder="Title" value={ticket.title} onChange={ (e) => handleToUpdateNewTicket(e.target.value, 'title') } maxLength="128" />
      { validation.title ? <p className="text-red-500 text-xs italic mt-1">Title should not be empty</p> : null }

      <textarea className="block mt-4 text-sm py-2 px-4 rounded-md w-full border outline-none" name="Description" cols="30" rows="10" placeholder="Description" onChange={ (e) => handleToUpdateNewTicket(e.target.value, 'description') } value={ticket.description}></textarea>
      { validation.description ? <p className="text-red-500 text-xs italic mt-1">Description should not be empty</p> : null }

      <label className="block mt-4 w-full relative after:content-[''] after:ml-0.5 after:text-red-500 after:absolute after:right-3 after:bottom-4 after:border-l-[5px] after:border-l-transparent after:border-r-[5px] after:border-r-transparent after:border-t-[7px] after:border-t-gray-500">
        <span className="text-sm">Choose status:</span>
        <select id="statuses-select" className="block mt-1 text-sm py-2 px-4 rounded-md w-full border outline-none appearance-none" onChange={ (e) => handleToUpdateNewTicket(+e.target.value, 'status') } value={ ticket.status }>
          <option value="1">Open</option>
          <option value="2">In Progress</option>
          <option value="3">Completed</option>
        </select>
      </label>
    </form>
  )
};

export default TicketForm;