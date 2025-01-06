import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import apiResponseHandler from "./extras/aAPIResponseHandler";

import enrolledServiceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/iEnrolledServiceAPIEndpoints";
import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import { RefreshCwIcon } from "lucide-react";
import { ButtonLink, Form, Image, Input, MainContainer, PageHeading, Para, SearchButton, Table, TableBody, TableHeading, TableSection, ViewButton } from "./style";


const ServiceListPage = () => {
  // State Variable
  const [visibleAddresses, setVisibleAddresses] = useState(new Set());
  const [searchInput, setSearchInput] = useState("")

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    listAPIResponse: enrolledServiceAPIEndpoint.useEnrolledServiceListAPIQuery(null),
  }

  // Event Handler
  // Toggle Address Visibility Handler
  const toggleAddressVisibility = (id: any) => {
    setVisibleAddresses((prev: any) => {
      const newVisibility = new Set(prev);
      if (newVisibility.has(id)) {
        newVisibility.delete(id);
      } else {
        newVisibility.add(id);
      }
      return newVisibility;
    });
  };

  // All Render
  // Success Render
  useEffect(() => {
    apiResponseHandler.listAPIResponseHandler(APICall.listAPIResponse)
  }, [APICall.listAPIResponse])
  
  // JSX
  return (
    <React.Fragment>
      {/* ServiceListPage */}

      <>
        <TopNavBarComponent />
        <MainContainer>
          <PageHeading>Your Enrolled Services</PageHeading>
          <Form>
            <Input
              type="text"
              placeholder="Search Your Enrolled Services"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <SearchButton type="button" onClick={() => APICall.listAPIResponse.refetch()} >
              <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
              <Para>Refresh</Para>
            </SearchButton>
            <ButtonLink to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.bCreateRoute}>
              <Image src={PlusSign} alt="PlusSign" />
              <Para>Add</Para>
            </ButtonLink>
          </Form>
          
          <Table>
            <thead>
              <TableSection>
                <TableHeading>Name of Firm</TableHeading>
                <TableHeading>Category</TableHeading>
                <TableHeading>Own/Loan</TableHeading>
                <TableHeading>Form License</TableHeading>
                <TableHeading>Govt. Fee (Rs)</TableHeading>
                <TableHeading>Our Fee (Rs)</TableHeading>
                <TableHeading>Date Added</TableHeading>
                <TableHeading>Validity</TableHeading>
                <TableHeading>Actions</TableHeading>
              </TableSection>
            </thead>
            <tbody>

              {(APICall.listAPIResponse.isLoading || APICall.listAPIResponse.isFetching) ? null : 
                APICall.listAPIResponse.isError ? null :
                  APICall.listAPIResponse.isSuccess ? (
                    APICall.listAPIResponse.data.success ? (
                      APICall.listAPIResponse.data.list.length > 0 ? (
                        <React.Fragment>
                          {
                            APICall.listAPIResponse.data.list?.
                              filter((each: any) => each.cOrganization?.bCreatedBy === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
                              filter((each: any) => each.cOrganization?.aTitle?.toLowerCase().includes(searchInput?.toLowerCase())).
                              map((each: any, index: any) => (
                              <TableSection key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#FFF9E6' }}>
                                <TableBody>
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {each.cOrganization?.aTitle}
                                    {visibleAddresses.has(each._id) && (
                                      <div style={{ marginTop: '4px', fontSize: '0.9rem', color: '#666' }}>
                                        {each.cOrganization?.dAddress}
                                      </div>
                                    )}
                                  </div>
                                </TableBody>
                                <TableBody>{each.cService.dCategory}</TableBody>
                                <TableBody>{each.cService.dOwnLoan}</TableBody>
                                <TableBody>{each.cService.dFormType}</TableBody>
                                <TableBody>{each.cService.dGovtFees}</TableBody>
                                <TableBody>{each.cService.dOurFees}</TableBody>
                                <TableBody>{each.cService.dAddedDate}</TableBody>
                                <TableBody>{each.cService.dServiceValidity}</TableBody>
                                <TableBody>
                                  <ViewButton onClick={() => toggleAddressVisibility(each._id)}>
                                    {visibleAddresses.has(each._id) ? "Hide" : "View"}
                                  </ViewButton>
                                </TableBody>
                              </TableSection>
                            ))
                          }
                        </React.Fragment>
                      ) : []
                    ) : []
                  ) : []
              }

            </tbody>
          </Table>

          {(APICall.listAPIResponse.isLoading || APICall.listAPIResponse.isFetching) ? <LoaderComponent /> :
            APICall.listAPIResponse.isError ? <ErrorComponent message="Error..." /> :
            (APICall.listAPIResponse.data?.list?.
              filter((each: any) => each.cOrganization?.bCreatedBy === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
              filter((each: any) => each.cOrganization?.aTitle?.toLowerCase().includes(searchInput?.toLowerCase())).
              length === 0) ? <ErrorComponent message="No items here..." /> : null
          }

        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default ServiceListPage;
