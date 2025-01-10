import React, { useEffect, useState } from 'react'
import { AddButton, AddHeading, AddLicense, AddLicenseForm, ButtonTag, CancelButton, ContactInfo, ContactInput, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, Input2, InputHeading, IssueDate, Para } from '../../style';
import apiResponseHandler from './extras/aAPIResponseHandler';
import serviceAPIEndpoint from '@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/fServiceAPIEndpoints';


const ServiceTabCreateComponent = (props: any) => {
  // Destructure Props
  const { 
    setServiceTabList,
    setServiceTabCreate,
    setServiceTabUpdate,
    APICall,
    // ReduxCall,
    organizationID
  } = props;

  // Emergency API Call
  const serviceListAPI = serviceAPIEndpoint.useServiceListAPIQuery(null)

  // State Variable
  const [formData, setFormData] = useState({
    cOrganization: organizationID,

    dSelectedLicense: "",
    dLicenseNumber: "",
    dIssueDate: "",
    dExpiryDate: "",
  })  

  // Event Handlers
  const activateServiceList = () => {
    setServiceTabList(true)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)
  }

  // Handle Input Change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };
  
  // Submit handler
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // console.log("formDataObj", formData);
    apiResponseHandler.createAPIResponseHandler(formData, APICall.serviceCreateAPITrigger, activateServiceList)
  };
  
    // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // JSX
  return (
    <React.Fragment>
      {/* ServiceTabCreateComponent */}

      <AddLicense>
        <AddHeading>Add License</AddHeading>
        <AddLicenseForm onSubmit={() => "handleSubmit"}>
          <InputHeading>Select License</InputHeading>
          <Dropdown 
            name="dSelectedLicense"
            value={formData.dSelectedLicense}
            onChange={handleInputChange}
          >
            <DropdownOption selected disabled>
              Select License
            </DropdownOption>
            {serviceListAPI.isLoading ? null : 
              serviceListAPI.isError ? null :
                serviceListAPI.isSuccess ? (
                  serviceListAPI.data.success ? (
                    serviceListAPI.data.list.length > 0 ? (
                      <React.Fragment>
                        {
                          serviceListAPI.data.list?.
                            filter((each: any) => each.dFormType === APICall.retrieveAPIResponse.data?.retrieve?.dType)?.
                            map((each: any, index: any) => (
                            <DropdownOption
                              key={index}
                              value={each.aTitle}
                            >
                              {each.aTitle}
                            </DropdownOption>                                
                          ))
                        }
                      </React.Fragment>
                    ) : []
                  ) : []
                ) : []
            }
          </Dropdown>
          <InputHeading>Enter License Number</InputHeading>
          <Input2
            type="text"
            placeholder="License Number"
            name="dLicenseNumber"
            value={formData.dLicenseNumber}
            onChange={handleInputChange}
          />
          <ContactInfo>
            <IssueDate>
              <InputHeading>Date of Issue</InputHeading>
              <ContactInput
                type="date"
                placeholder="Issue Date"
                name="dIssueDate"
                value={formData.dIssueDate}
                onChange={handleInputChange}
              />
            </IssueDate>
            <ExpiryDate>
              <InputHeading>Date of Expiry</InputHeading>
              <ContactInput
                type="date"
                placeholder="Expiry Date"
                name="dExpiryDate"
                value={formData.dExpiryDate}
                onChange={handleInputChange}
              />
            </ExpiryDate>
          </ContactInfo>
          <InputHeading>Upload Scan Copy License</InputHeading>
          <FileInputContainer>
            <FileInputLabel htmlFor="fileInput">Choose File</FileInputLabel>
            <FileInput
              type="file"
              id="fileInput"
              // onChange={handleFileChange}
            />
          </FileInputContainer>
          {/* {formData.file && (
            <UploadedFile>Uploaded File: {formData.file.name}</UploadedFile>
          )} */}

          <ButtonTag>
            <AddButton type="submit" onClick={handleSubmit}>
              <Para>Add New License</Para>
            </AddButton>
            <CancelButton onClick={() => activateServiceList()}>
              <Para>Cancel</Para>
            </CancelButton>
          </ButtonTag>
        </AddLicenseForm>
      </AddLicense>

    </React.Fragment>
  )
}

export default ServiceTabCreateComponent;
