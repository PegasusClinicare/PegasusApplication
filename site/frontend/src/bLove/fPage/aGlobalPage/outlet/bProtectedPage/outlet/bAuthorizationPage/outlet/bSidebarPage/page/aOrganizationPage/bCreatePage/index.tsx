import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";

import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import handleImageCreateForList from "@/bLove/dUtility/bImageForList/aHandleImageCreateForList";
import handleImageUpdateForList from "@/bLove/dUtility/bImageForList/bHandleImageUpdateForList";
import handleImageDeleteForList from "@/bLove/dUtility/bImageForList/cHandleImageDeleteForList";
import allCategoryType from "@/bLove/hAsset/data/allCategoryType";
import allFirmType from "@/bLove/hAsset/data/allFirmType";
import firmBasedLicenseType from "@/bLove/hAsset/data/firmBasedLicenseType";
import { FileIcon } from "lucide-react";
import { AddNew, ButtonTwo, CityInfo, ContactInfo, ContactInput, Container, Dropdown, Dropdown1, DropdownOption, EmailInfo, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FinalTag, Form, Input, InputHeading, IssueDate, MainHeading, PanCard, PhoneInfo, PinCode, RemoveButton, StateInfo, statesAndCities, UploadedFile } from "./style";


const OrganizationCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [fileLoading, setFileLoading] = useState(false)
  const [formData, setFormData] = useState({
    dName: "",
    dType: "",
    dPhoneNumber: "",
    dCompanyEmail: "",
    dAddress: "",
    dSelectedState: "",
    dSelectedCity: "",
    dCountry: "",
    dPin: "",
    dPanNumber: "",

    cLicenses: [{
      dSelectedLicense: "",
      dLicenseNumber: "",
      dLicenseIssueDate: "",
      dLicenseExpiryDate: "",
      dCategory: "",
      dOwnLoan: "",
      dFileUploaded: null,
      dFileUploadedID: null,  
    }]
  })

  // API Call
  const organizationCreateAPI = organizationAPIEndpoint.useOrganizationCreateAPIMutation();
  const licenseCreateAPI = licenseAPIEndpoint.useLicenseCreateAPIMutation();

  const APICall = {
    createAPITrigger: organizationCreateAPI[0],
    createAPIResponse: organizationCreateAPI[1],

    // Relation... Muaaah....
    licenseCreateAPITrigger: licenseCreateAPI[0],
    licenseCreateAPIResponse: licenseCreateAPI[1],

  }

  // Event Handlers
  // Add License
  const addNewLicense = () => {
    setFormData({
      ...formData, cLicenses: [
        ...formData.cLicenses, {
          dSelectedLicense: "",
          dLicenseNumber: "",
          dLicenseIssueDate: "",
          dLicenseExpiryDate: "",
          dCategory: "",
          dOwnLoan: "",
          dFileUploaded: null,
          dFileUploadedID: null,      
        }
      ],
    });
  };

  // Remove License
  const removeLicense = (index: number) => {
    const updatedLicenses = formData.cLicenses.filter((_, i) => i !== index);
    setFormData({ ...formData, cLicenses: updatedLicenses });
  };

  // Handle Input Change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  // Handle License Input Change
  const handleLicenseInputChange = (event: any, index: number) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updatedLicenses = (prevFormData.cLicenses.length > 0) ? [...(prevFormData as any).cLicenses] : [];
      updatedLicenses[index] = {
        ...updatedLicenses[index],
        [name]: value,
      };
  
      return {
        ...prevFormData,
        cLicenses: updatedLicenses,
      };
    });
  };

  // Handle Submit
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // console.log("formDataObj", formData);
    apiResponseHandler.createAPIResponseHandler(formData, APICall.createAPITrigger, navigate, APICall.licenseCreateAPITrigger)
  };

  // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])
  
  // JSX
  return (
    <React.Fragment>
      {/* OrganizationCreatePage */}

      <>
        <TopNavBarComponent />
        <Container>
          <MainHeading>Add Organization</MainHeading>
          <Form onSubmit={handleSubmit}>
            <InputHeading>Name of Firm</InputHeading>
            <Input
              type="text"
              placeholder="Name of Firm"
              name="dName"
              value={formData.dName}
              onChange={handleInputChange}
            />
            <InputHeading>Select type of Firm</InputHeading>
            <Dropdown1
              name="dType"
              value={formData.dType}
              onChange={handleInputChange}
            >
              <DropdownOption value="" disabled>
                Select Firm
              </DropdownOption>
              {allFirmType.map((each) => (
                <DropdownOption
                  key={each}
                  value={each} // .toLowerCase().replace(/\s+/g, "-")
                >
                  {each}
                </DropdownOption>
              ))}
            </Dropdown1>
            <ContactInfo>
              <PhoneInfo>
                <InputHeading>Phone</InputHeading>
                <ContactInput
                  type="text"
                  placeholder="Phone"
                  name="dPhoneNumber"
                  value={formData.dPhoneNumber}
                  onChange={handleInputChange}
                />
              </PhoneInfo>
              <EmailInfo>
                <InputHeading>Email</InputHeading>
                <ContactInput
                  type="email"
                  placeholder="Email"
                  name="dCompanyEmail"
                  value={formData.dCompanyEmail}
                  onChange={handleInputChange}
                />
              </EmailInfo>
            </ContactInfo>
            <InputHeading>Address</InputHeading>
            <Input
              type="text"
              placeholder="Address"
              name="dAddress"
              value={formData.dAddress}
              onChange={handleInputChange}
            />
            <ContactInfo>
              <StateInfo>
                <InputHeading>Select State</InputHeading>
                <Dropdown
                  value={formData.dSelectedState}
                  onChange={handleInputChange}
                  name="dSelectedState"
                >
                  <DropdownOption value="" disabled>
                    Select State
                  </DropdownOption>
                  {Object.keys(statesAndCities).map((state) => (
                    <DropdownOption key={state} value={state}>
                      {state}
                    </DropdownOption>
                  ))}
                </Dropdown>
              </StateInfo>
              <CityInfo>
                <InputHeading>Select City</InputHeading>
                <Dropdown
                  value={formData.dSelectedCity}
                  onChange={handleInputChange}
                  name="dSelectedCity"
                >
                  <DropdownOption value="" disabled>
                    Select City
                  </DropdownOption>
                  {(statesAndCities as any)[formData.dSelectedState]?.map((city: any) => (
                    <DropdownOption key={city} value={city}>
                      {city}
                    </DropdownOption>
                  ))}
                </Dropdown>
              </CityInfo>
            </ContactInfo>
            <ContactInfo>
              <PinCode>
                <InputHeading>Pin Code</InputHeading>
                <ContactInput
                  type="text"
                  placeholder="Pin Code"
                  name="dPin"
                  value={formData.dPin}
                  onChange={handleInputChange}
                />
              </PinCode>
              <PanCard>
                <InputHeading>PAN Card</InputHeading>
                <ContactInput
                  type="text"
                  placeholder="PAN Card"
                  name="dPanNumber"
                  value={formData.dPanNumber}
                  onChange={handleInputChange}
                />
              </PanCard>
            </ContactInfo>
            <MainHeading>Add Licenses</MainHeading>
            {formData.cLicenses.map((license: any, index: any) => (
              <div key={index}>
                <InputHeading style={{ color: "tomato", display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                  License {index + 1}
                </InputHeading>

                <InputHeading>License Number</InputHeading>
                <Input
                  type="text"
                  placeholder="License Number"
                  name="dLicenseNumber"
                  value={license.dLicenseNumber}
                  onChange={(e) => handleLicenseInputChange(e, index)}
                />

                <InputHeading>Select type of License <em style={{ color: "tomato" }} >{formData?.dType ? null : "(Select Firm Type for Options)"}</em></InputHeading>
                <Dropdown1
                  onChange={(e) => handleLicenseInputChange(e, index)}
                  name="dSelectedLicense"
                >
                  <DropdownOption selected disabled>
                    Select License
                  </DropdownOption>
                  {
                    firmBasedLicenseType?.
                      filter(each => each.firm === formData?.dType)[0]?.
                      license?.
                      map(each => (
                        <DropdownOption
                          key={each}
                          value={each}
                        >
                          {each}
                        </DropdownOption>
                      ))
                  }
                </Dropdown1>

                <ContactInfo>
                  <StateInfo>
                    <InputHeading>Category</InputHeading>
                    <Dropdown
                      onChange={(e) => handleLicenseInputChange(e, index)}
                      name="dCategory"
                    >
                      <DropdownOption selected disabled>
                        Select Category
                      </DropdownOption>
                      {
                        allCategoryType.map(each => (
                          <DropdownOption
                            key={each}
                            value={each}
                          >
                            {each}
                          </DropdownOption>
                        ))
                      }
                    </Dropdown>
                  </StateInfo>
                  <CityInfo>
                    <InputHeading>Own / Loan</InputHeading>
                    <Dropdown
                      onChange={(e) => handleLicenseInputChange(e, index)}
                      name="dOwnLoan"
                    >
                      <DropdownOption selected disabled>
                        Select
                      </DropdownOption>
                      <DropdownOption value="Own" >Own</DropdownOption>
                      <DropdownOption value="Loan" >Loan</DropdownOption>
                    </Dropdown>
                  </CityInfo>
                </ContactInfo>

                <FinalTag>
                  <IssueDate>
                    <InputHeading>Issue Date</InputHeading>
                    <ContactInput
                      type="date"
                      placeholder="Issue Date"
                      name="dLicenseIssueDate"
                      value={license.dLicenseIssueDate}
                      onChange={(e) => handleLicenseInputChange(e, index)}
                    />
                  </IssueDate>
                  <ExpiryDate>
                    <InputHeading>Expiry Date</InputHeading>
                    <ContactInput
                      type="date"
                      placeholder="Expiry Date"
                      name="dLicenseExpiryDate"
                      value={license.dLicenseExpiryDate}
                      onChange={(e) => handleLicenseInputChange(e, index)}
                    />
                  </ExpiryDate>
                </FinalTag>

                <InputHeading>Upload Scan Copy License <em style={{ color: "tomato" }} >(.pdf, .doc, .docx, .jpg, .jpeg, .png)</em></InputHeading> 
                
                {/* --------------------------------------------------------------- */}
                <FileInputContainer>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                    {formData.cLicenses?.[index]?.dFileUploaded && !fileLoading && (
                      <>
                        {(formData.cLicenses?.[index]?.dFileUploaded as any).match(/\.(jpeg|jpg|png)$/i) ? (
                          <img
                            style={{
                              height: "70px",
                              objectFit: "cover",
                            }}
                            src={formData.cLicenses?.[index]?.dFileUploaded}
                            alt="Preview"
                          />
                        ) : <FileIcon size={"50px"} />}
                      </>                    
                    )}
                    {formData.cLicenses?.[index]?.dFileUploaded && <FileInputLabel htmlFor={`fileUpdate${index}`}>{fileLoading ? "Loading..." : "Change File"}</FileInputLabel>}
                    {formData.cLicenses?.[index]?.dFileUploaded && (
                      <FileInputLabel 
                        style={{ color: "tomato" }}
                        onClick={() => handleImageDeleteForList(index, "cLicenses", "dFileUploaded", "dFileUploadedID", setFormData, setFileLoading, formData.cLicenses?.[index]?.dFileUploadedID)} 
                      >{fileLoading ? "Loading..." : "Remove File"}</FileInputLabel>
                    )}
                  </div>
                  {!formData.cLicenses?.[index]?.dFileUploaded && <FileInputLabel htmlFor={`fileInput${index}`}>{fileLoading ? "Loading..." : "Choose File"}</FileInputLabel>}
                  <FileInput
                    type="file"
                    id={`fileInput${index}`}
                    disabled={fileLoading}
                    onChange={(event: any) => handleImageCreateForList(event, index, "cLicenses", "dFileUploaded", "dFileUploadedID", setFormData, setFileLoading)}
                    name="file"
                  />
                  <FileInput
                    type="file"
                    id={`fileUpdate${index}`}
                    disabled={fileLoading}
                    onChange={(event: any) => handleImageUpdateForList(event, index, "cLicenses", "dFileUploaded", "dFileUploadedID", setFormData, setFileLoading, formData.cLicenses?.[index]?.dFileUploadedID)}
                    name="file"
                  />
                </FileInputContainer>
                {formData.cLicenses?.[index]?.dFileUploaded && <UploadedFile>Uploaded File: {(
                  <a
                    href={formData.cLicenses?.[index]?.dFileUploaded || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {formData.cLicenses?.[index]?.dFileUploaded}
                  </a> 
                )}</UploadedFile>}
                {/* --------------------------------------------------------------- */}

                {license.file && <UploadedFile>{license.file.name}</UploadedFile>}
                <RemoveButton 
                  type="button" 
                  onClick={() => removeLicense(index)}
                  disabled={
                    fileLoading ||
                    APICall.createAPIResponse.isLoading ||
                    APICall.licenseCreateAPIResponse.isLoading
                  }  
                >{
                  (
                    fileLoading ||
                    APICall.createAPIResponse.isLoading ||
                    APICall.licenseCreateAPIResponse.isLoading
                  ) ? "Loading..." : "Remove"
                }</RemoveButton>
              </div>
            ))}
            <AddNew 
              type="button" 
              onClick={addNewLicense}
              disabled={
                fileLoading ||
                APICall.createAPIResponse.isLoading ||
                APICall.licenseCreateAPIResponse.isLoading
              } 
            >{(
                fileLoading ||
                APICall.createAPIResponse.isLoading ||
                APICall.licenseCreateAPIResponse.isLoading
              ) ? 
              "Loading..." : "Add New"
            }</AddNew>
            <ButtonTwo 
              type="submit"
              disabled={
                fileLoading ||
                APICall.createAPIResponse.isLoading ||
                APICall.licenseCreateAPIResponse.isLoading
              } 
            >{(
                fileLoading ||
                APICall.createAPIResponse.isLoading ||
                APICall.licenseCreateAPIResponse.isLoading
              ) ? 
              "Loading..." : "Save & Next"
            }</ButtonTwo>
          </Form>
        </Container>
      </>

    </React.Fragment>
  )
}

export default OrganizationCreatePage;
