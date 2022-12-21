import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <section className="min-h-[80vh] my-8 grid place-items-center">
      <div className="text-center font-montserrat">
        <h1 className="text-6xl">404</h1>
        <h1 className="text-4xl my-4">Page Not Found</h1>
        <p className="text-lg font-medium hover:text-gray-700 underline">
          Go to <Link to="/">Homepage</Link>
        </p>
      </div>
    </section>
  );
}

export default NotFound;
