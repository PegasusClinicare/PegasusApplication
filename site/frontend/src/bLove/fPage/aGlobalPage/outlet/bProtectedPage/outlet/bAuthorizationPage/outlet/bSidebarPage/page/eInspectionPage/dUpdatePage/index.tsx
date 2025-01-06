import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import inspectionAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/hInspectionAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonContainer, CancelButton, Container, Dropdown, DropdownOption, FileInput, FileInputContainer, FileInputLabel, Form, Input, InputHeading, IssueDate, MainHeading, RowContainer, RowInput, SubmitButton, UploadedFile } from "./style";
import handleImageDeleteForObject from "@/bLove/dUtility/aImageForObject/cHandleImageDeleteForObject";
import handleImageCreateForObject from "@/bLove/dUtility/aImageForObject/aHandleImageCreateForObject";
import handleImageUpdateForObject from "@/bLove/dUtility/aImageForObject/bHandleImageUpdateForObject";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { FileIcon } from "lucide-react";
import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";


const InspectionUpdatePage = () => {
  // Variable
  const navigate = useNavigate();
  const { id } = useParams();

  // State Variable
  const [fileLoading, setFileLoading] = useState(false)
  const [formData, setFormData] = useState({
    cOrganization: "",

    dReportName: "",
    dUploadDate: "",
    dFileUploaded: "",
    dFileUploadedID: "",
  })

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const inspectionRetrieveAPI = inspectionAPIEndpoint.useInspectionRetrievePIQuery({ params: { _id: id } });
  const inspectionUpdateAPI = inspectionAPIEndpoint.useInspectionUpdateAPIMutation();
  const organziationListAPI = organizationAPIEndpoint.useOrganizationListAPIQuery(null)

  const APICall = {
    retrieveAPIResponse: inspectionRetrieveAPI,
    updateAPITrigger: inspectionUpdateAPI[0],
    updateAPIResponse: inspectionUpdateAPI[1],
    
    // Requirements... Muaaah...
    organizationListAPIResponse: organziationListAPI,

  }  

    // Event Handlers
  // Handle Input Change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };
  
  // Submit handler
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // console.log("formDataObj", formData);
    apiResponseHandler.updateAPIResponseHandler(formData, APICall.updateAPITrigger, navigate, { id: id })
  };

  // All Render
  // First Render
  useEffect(() => {
    APICall.retrieveAPIResponse.isLoading ? null : 
    APICall.retrieveAPIResponse.isError ? null :
    APICall.retrieveAPIResponse.isSuccess ? (
      APICall.retrieveAPIResponse.data.success ? (
        setFormData({
          cOrganization: APICall.retrieveAPIResponse.data.retrieve.cOrganization,
          dReportName: APICall.retrieveAPIResponse.data.retrieve.dReportName,
          dUploadDate: APICall.retrieveAPIResponse.data.retrieve.dUploadDate,
          dFileUploaded: APICall.retrieveAPIResponse.data.retrieve.dFileUploaded,
          dFileUploadedID: APICall.retrieveAPIResponse.data.retrieve.dFileUploadedID
        })
      ) : null
    ) : null
  }, [APICall.retrieveAPIResponse])
  
  // JSX
  return (
    <React.Fragment>
      {/* InspectionUpdatePage */}

      <>
        <TopNavBarComponent />
        {
          APICall.retrieveAPIResponse.isLoading ? <LoaderComponent /> : 
          APICall.retrieveAPIResponse.isError ? <ErrorComponent message="Error..." /> :
          APICall.retrieveAPIResponse.isSuccess ? (
            <React.Fragment>
              {
                APICall.retrieveAPIResponse.data.success ? (
                  <React.Fragment>
                    <Container>
                      <MainHeading>Edit Inspection Report</MainHeading>
                      <Form onSubmit={handleSubmit}>
                        <div>
                          <InputHeading>Select Organization</InputHeading>
                          <Dropdown
                            onChange={handleInputChange}
                            name="cOrganization"
                          >
                            <DropdownOption value="" disabled>
                              Select Organization
                            </DropdownOption>
                            {APICall.organizationListAPIResponse.isLoading ? null : 
                              APICall.organizationListAPIResponse.isError ? null :
                                APICall.organizationListAPIResponse.isSuccess ? (
                                  APICall.organizationListAPIResponse.data.success ? (
                                    APICall.organizationListAPIResponse.data.list.length > 0 ? (
                                      <React.Fragment>
                                        {
                                          APICall.organizationListAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                                            <DropdownOption
                                              key={index}
                                              value={each._id}
                                              selected={each._id === (formData.cOrganization as any)?._id}
                                            >
                                              {each.dName}
                                            </DropdownOption>                                
                                          ))
                                        }
                                      </React.Fragment>
                                    ) : []
                                  ) : []
                                ) : []
                            }
                          </Dropdown>

                          <InputHeading>Report Name</InputHeading>
                          <Input
                            type="text"
                            placeholder="Enter Report Name"
                            name="dReportName"
                            value={formData.dReportName}
                            onChange={handleInputChange}
                          />
                          <RowContainer>
                            <IssueDate>
                              <InputHeading>Date of Upload</InputHeading>
                              <RowInput
                                type="date"
                                name="dUploadDate"
                                value={formData.dUploadDate}
                                onChange={handleInputChange}
                              />
                            </IssueDate>
                          </RowContainer> 
                        
                          <InputHeading>Upload Scan Copy License <em style={{ color: "tomato" }} >(.pdf, .doc, .docx, .jpg, .jpeg, .png)</em></InputHeading> 

                          {/* --------------------------------------------------------------- */}
                          <FileInputContainer>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                              {formData.dFileUploaded && !fileLoading && (
                                <>
                                  {(formData.dFileUploaded as any).match(/\.(jpeg|jpg|png)$/i) ? (
                                    <img
                                      style={{
                                        height: "70px",
                                        objectFit: "cover",
                                      }}
                                      src={formData.dFileUploaded}
                                      alt="Preview"
                                    />
                                  ) : <FileIcon size={"50px"} />}
                                </>                    
                              )}
                              {formData.dFileUploaded && <FileInputLabel htmlFor="fileUpdate">{fileLoading ? "Loading..." : "Change File"}</FileInputLabel>}
                              {formData.dFileUploaded && (
                                <FileInputLabel 
                                  style={{ color: "tomato" }}
                                  onClick={() => handleImageDeleteForObject("dFileUploaded", "dFileUploadedID", setFormData, setFileLoading, formData.dFileUploadedID)} 
                                >{fileLoading ? "Loading..." : "Remove File"}</FileInputLabel>
                              )}
                            </div>
                            {!formData.dFileUploaded && <FileInputLabel htmlFor="fileInput">{fileLoading ? "Loading..." : "Choose File"}</FileInputLabel>}
                            <FileInput
                              type="file"
                              id="fileInput"
                              disabled={fileLoading}
                              onChange={(event: any) => handleImageCreateForObject(event, "dFileUploaded", "dFileUploadedID", setFormData, setFileLoading)}
                              name="file"
                            />
                            <FileInput
                              type="file"
                              id="fileUpdate"
                              disabled={fileLoading}
                              onChange={(event: any) => handleImageUpdateForObject(event, "dFileUploaded", "dFileUploadedID", setFormData, setFileLoading, formData.dFileUploadedID)}
                              name="file"
                            />
                          </FileInputContainer>
                          {formData.dFileUploaded && <UploadedFile>Uploaded File: {(
                            <a
                              href={formData.dFileUploaded || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              {formData.dFileUploaded}
                            </a> 
                          )}</UploadedFile>}
                          {/* --------------------------------------------------------------- */}

                        </div>

                        <>
                          <ButtonContainer>
                            <SubmitButton 
                              type="submit" 
                              onClick={handleSubmit}
                              disabled={
                                fileLoading ||
                                APICall.updateAPIResponse.isLoading
                              }            
                            >{(
                                fileLoading ||
                                APICall.updateAPIResponse.isLoading
                              ) ? 
                              "Loading..." : "Submit"
                            }</SubmitButton>
                            <CancelButton 
                              type="button" 
                              onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.aListRoute)}
                              disabled={
                                fileLoading ||
                                APICall.updateAPIResponse.isLoading
                              }            
                            >{(
                                fileLoading ||
                                APICall.updateAPIResponse.isLoading
                              ) ? 
                              "Loading..." : "Cancel"
                            }</CancelButton>
                          </ButtonContainer>
                        </>
                      </Form>
                    </Container>
                  </React.Fragment>
                ) : <ErrorComponent message="Backend Error..." />
              }
            </React.Fragment>
          ) : <ErrorComponent message="Let me understand first" />
        }

      </>

    </React.Fragment>
  )
}

export default InspectionUpdatePage;
