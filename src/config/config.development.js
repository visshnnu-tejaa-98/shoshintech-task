const origin = "http://localhost:8000";
const DEV_API = {
  getAllServices: {
    method: "get",
    url: `${origin}` + "/api/services",
    headers: {
      "Content-Type": "application/json",
    },
  },
  getServiceById: {
    method: "post",
    url: `${origin}` + "/api/services",
    headers: {
      "Content-Type": "application/json",
    },
  },
};

export default DEV_API;
