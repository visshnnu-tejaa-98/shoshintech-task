import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ServiceDetails = () => {
  const [service, setService] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    const id = location.pathname.split("/")[2];
    getServiceDetails(id);
  }, []);

  const getServiceDetails = async (id) => {
    try {
      const req = await fetch("http://localhost:8000/api/services/" + id);
      const res = await req.json();
      setService(res.data[0]);
      const booked = res.data[0].booked;
      if (booked === false) {
        setShowForm(false);
      }
      console.log(res.data[0]);
    } catch (err) {
      console.log(err);
      setService({
        apiStatus: -1,
        data: null,
        errorMessage: "Something Went Wrong",
      });
    }
  };

  const handleSubmit = (id) => {
    submitData(id);
  };

  const submitData = async (id) => {
    if (name.length > 0 && date.length > 0) {
      try {
        const req = await fetch("http://localhost:8000/api/bookings", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id,
            name,
            date,
          }),
        });
        const res = await req.json();
        if (res.message === "Service Booked Successfully!") {
          alert("Service Booked Successfully!");
        }
        setService(null);
        navigate("/");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please Provide Name and Date");
    }
  };

  return (
    <div>
      <Navbar />
      {service && (
        <div className="w-[80%] mx-auto my-5">
          <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {service.name}
            </h5>
            <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
              {service.description}
            </p>
            {service.booked === false && (
              <div class="max-w-sm">
                <h2 className="text-xl font-bold my-5">Book Service</h2>
                <div class="mb-5">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="date"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleSubmit(service.id_)}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
