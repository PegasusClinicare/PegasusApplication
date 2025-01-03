import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const apiConnection = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: (
      import.meta.env.VITE_ENVIRONMENT === "Production" ? "http://13.60.30.41:8080/api/v1/" :
      import.meta.env.VITE_ENVIRONMENT === "Practice" ? "https://pegasus-backend-h99r.onrender.com/api/v1/" :
      "http://localhost:8080/api/v1/"
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
    "serviceList", "serviceRetrieve",
    "documentList", "documentRetrieve",
    "inspectionList", "inspectionRetrieve",
    "enrolledServiceList", "enrolledServiceRetrieve",
  ],
  endpoints: () => ({})
})

export default apiConnection;
