import WithRedirect from "../../hocs/with-redirect";

const IncorrectPage = () => {
  return (
    <div className="px-6 py-4 bg-white-100">
      <div className="container mx-auto">
        <div className="mt-8 grid font-bold text-center grid-cols-1 sm:grid-cols-1 gap-8">
          Sorry, but the page you are looking for doesn't exist!
        </div>
      </div>
    </div>
  )
};

export default WithRedirect(IncorrectPage);