// import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 0 0 0;
  margin: 10px 0 10px 0;
  font-weight: 400;
`;

interface NavItemProps {
  active?: boolean;
}

// const NavItem = styled(Link)<NavItemProps>`

const Navigation = styled(NavLink)<NavItemProps>`
  text-decoration: none;
  color: ${props => props.active ? '#0080FF' : '#242424'};
  padding: 10px 0px 0px 10px;
  margin: 0;
  margin-left: 40px;
  margin-right: 12px;
  font-size: 1rem;
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    color: #007bff;
  }
`;

const HorizontalLine = styled.hr`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const SubNavBar = (props: any) => {
  // Destructure Props
  const { 
    companyTab, setCompanyTab, 
    licenseTab, setLicenseTab, licenseListAPITrigger,
    reminderTab, setReminderTab, 
    inspectionTab, setInspectionTab, inspectionListAPITrigger,
    documentTab, setDocumentTab, documentListAPITrigger,
    serviceTab, setServiceTab, enrolledServiceListAPITrigger,

    licenseTabList, setLicenseTabList,
    licenseTabCreate, setLicenseTabCreate,
    licenseTabUpdate, setLicenseTabUpdate,

    inspectionTabList, setInspectionTabList,
    inspectionTabCreate, setInspectionTabCreate,
    inspectionTabUpdate, setInspectionTabUpdate,

    documentTabList, setDocumentTabList,
    documentTabCreate, setDocumentTabCreate,
    documentTabUpdate, setDocumentTabUpdate,

    serviceTabList, setServiceTabList,
    serviceTabCreate, setServiceTabCreate,
    serviceTabUpdate, setServiceTabUpdate,
  } = props

  // Event Handlers
  const activateCompany = () => {
    setCompanyTab(true)
    setLicenseTab(false)
    setReminderTab(false)
    setInspectionTab(false)
    setDocumentTab(false)
    setServiceTab(false)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(false)
    
    setInspectionTabList(false)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(false)
    
    setDocumentTabList(false)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(false)
    
    setServiceTabList(false)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)
  }

  const activateLicense = () => {
    setCompanyTab(false)
    setLicenseTab(true)
    setReminderTab(false)
    setInspectionTab(false)
    setDocumentTab(false)
    setServiceTab(false)

    setLicenseTabList(true)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(false)

    setInspectionTabList(false)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(false)

    setDocumentTabList(false)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(false)

    setServiceTabList(false)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)

    licenseListAPITrigger()
  }

  const activateReminder = () => {
    setCompanyTab(false)
    setLicenseTab(false)
    setReminderTab(true)
    setInspectionTab(false)
    setDocumentTab(false)
    setServiceTab(false)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(false)

    setInspectionTabList(false)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(false)

    setDocumentTabList(false)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(false)

    setServiceTabList(false)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)
  }

  const activateInspection = () => {
    setCompanyTab(false)
    setLicenseTab(false)
    setReminderTab(false)
    setInspectionTab(true)
    setDocumentTab(false)
    setServiceTab(false)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(false)

    setInspectionTabList(true)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(false)

    setDocumentTabList(false)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(false)

    setServiceTabList(false)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)

    inspectionListAPITrigger()
  }

  const activateDocument = () => {
    setCompanyTab(false)
    setLicenseTab(false)
    setReminderTab(false)
    setInspectionTab(false)
    setDocumentTab(true)
    setServiceTab(false)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(false)

    setInspectionTabList(false)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(false)

    setDocumentTabList(true)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(false)

    setServiceTabList(false)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)

    documentListAPITrigger()
  }

  const activateService = () => {
    setCompanyTab(false)
    setLicenseTab(false)
    setReminderTab(false)
    setInspectionTab(false)
    setDocumentTab(false)
    setServiceTab(true)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(false)

    setInspectionTabList(false)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(false)

    setDocumentTabList(false)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(false)

    setServiceTabList(true)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)

    enrolledServiceListAPITrigger()
  }

  // JSX
  return (
    <MainContainer>
      <NavLinks>
        <Navigation to={""} style={{ color: companyTab && '#007bff' }} onClick={() => activateCompany()} >Company</Navigation>
        <Navigation to={""} style={{ color: (licenseTab || licenseTabList || licenseTabCreate || licenseTabUpdate) && '#007bff' }} onClick={() => activateLicense()} >Licenses</Navigation>
        <Navigation to={""} style={{ color: reminderTab && '#007bff' }} onClick={() => activateReminder()} >Reminders</Navigation>
        <Navigation to={""} style={{ color: (inspectionTab || inspectionTabList || inspectionTabCreate || inspectionTabUpdate) && '#007bff' }} onClick={() => activateInspection()} >Inspection Reports</Navigation>
        <Navigation to={""} style={{ color: (documentTab || documentTabList || documentTabCreate || documentTabUpdate) && '#007bff' }} onClick={() => activateDocument()} >Documents</Navigation>
        <Navigation to={""} style={{ color: (serviceTab || serviceTabList || serviceTabCreate || serviceTabUpdate) && '#007bff' }} onClick={() => activateService()} >Services</Navigation>
      </NavLinks>
      <HorizontalLine />
    </MainContainer>
  );
};

export default SubNavBar;
