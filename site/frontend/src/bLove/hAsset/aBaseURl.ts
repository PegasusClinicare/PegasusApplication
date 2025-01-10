const baseURL = import.meta.env.VITE_ENVIRONMENT === "Production" ? "hsagdgsadhsagdgsadsad/api/v1" : 
  import.meta.env.VITE_ENVIRONMENT === "Practice" ? "https://pegasus-backend-kc6j.onrender.com/api/v1" : 
  import.meta.env.VITE_ENVIRONMENT === "Development" ? "http://localhost:8080/api/v1" : 
  "http://localhost:8080/api/v1"

export default baseURL;
