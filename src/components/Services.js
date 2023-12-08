import { useEffect, useState } from "react";
import DEV_API from "../config/config.development";
import axios from "axios";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });

  useEffect(() => {
    getServices();
  }, []);

  const getServices = () => {
    let queryParams = {};
    let data = {};
    let api = DEV_API.getAllServices;
    let config = {
      ...api,
      data,
      queryParams,
    };
    console.log(config);
    setServices({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
    return axios(config)
      .then((response) => {
        try {
          if (response === null) throw new Error("API Error");
          console.log(response);
          return response.data;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        return setServices({
          apiStatus: 1,
          data: data,
          errorMessage: null,
        });
      })
      .catch((error) => {
        console.log(error);
        let message = "";
        switch (error.message) {
          case "apiError":
            message = "Sonething went wrong while fetching the data";
            break;
          default:
            message = "Something went wrong";
            break;
        }
        setServices({
          apiStatus: -1,
          data: null,
          errorMessage: error.message,
        });
      });
  };
  return (
    <div className="grid grid-cols-3">
      {services?.data?.data?.length &&
        services?.data?.data.map((service) => (
          <div className="m-5">
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {service.name}
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {service.description.length > 100
                  ? `${service.description.slice(0, 100)}...`
                  : service.description}
              </p>
              <Link
                to={`/services/${service.id_}`}
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Services;
