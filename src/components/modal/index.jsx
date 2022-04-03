import { ReactComponent as Preloader } from '../../assets/loader.svg';

const Modal = ({showModal, title, children, onClose, onSave, loadingIndicator}) =>  {
  window.addEventListener('keydown', function(e) {
    if((e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) && document.getElementById('modal-container') !== null){
      document.getElementById('modal-container').click();
    }
  }, true);

  return (
    <>
      {showModal ? (
        <>
          <div
            onClick={(e) => e.target.id === 'modal-container' ? onClose() : null }
            id="modal-container"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-2xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between px-5 py-4 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    { title }
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-gray-600 hover:text-black h-6 w-6 text-md block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative px-5 py-4 flex-auto">  
                  { children }
                </div>
                <div className="flex items-center justify-end px-5 py-4 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-blue-600 hover:text-blue-800 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="relative disabled:hover:bg-green-600 disabled:opacity-75 bg-green-600 text-white active:bg-green-800 font-bold uppercase text-sm px-10 py-2 rounded shadow hover:shadow-lg hover:bg-green-800 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
          <div className="opacity-50 fixed inset-0 z-40 bg-black" ></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;