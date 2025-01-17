import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const apiConnection = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: (
      import.meta.env.VITE_ENVIRONMENT === "Production" ? "16.16.60.12" :
      import.meta.env.VITE_ENVIRONMENT === "Practice" ? "https://pegasus-backend-kc6j.onrender.com/api/v1/" :
      import.meta.env.VITE_ENVIRONMENT === "Development" ? "http://localhost:8080/api/v1/" :
      ""
    ),
    credentials: "include"
  }),
  tagTypes: [
    "baseManyToOneList", "baseManyToManyList", 
    "baseList", "baseRetrieve", 
    "baseOneToOneList", "baseOneToManyList", 
    "MenuList", 
    "RoleList", "RoleRetrieve",
    "UserList", "UserRetrieve", 
    "productList", "categoryList", "tagList", 
    "organizationList", "organizationRetrieve",
    "licenseList", "licenseRetrieve",
    "serviceList", "serviceUnauthenticatedList", "serviceRetrieve",
    "documentList", "documentRetrieve",
    "inspectionList", "inspectionRetrieve",
    "enrolledServiceList", "enrolledServiceRetrieve",
  ],
  endpoints: () => ({})
})

export default apiConnection;
