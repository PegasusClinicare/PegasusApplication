import styled from "styled-components";
import BellImage from "@/bLove/hAsset/assets/bell.png"
import { Link } from "react-router-dom";


const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ImageWrapper = styled.div`
  flex-basis: 40%;
  background: url(${BellImage}) no-repeat center center;
  background-size: cover;
`;

const ContentWrapper = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 410px;
`;

const InputHeading = styled.div`
  margin-top: 20px;
  font-weight: 500;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 390px;
  height: 20px;
  margin-right: 50px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 15px;
  width: 100%;
  font-size: 1rem;
  letter-spacing: 1.2px;
`;

// const GoogleButton = styled.button`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   background-color: #fff;
//   color: black;
//   border: 1px solid #ccc;
//   padding: 10px 20px;
//   margin-top: 20px;
//   cursor: pointer;
//   border-radius: 15px;
//   width: 100%;
//   font-size: 1rem;
//   letter-spacing: 1.2px;
// `;

const HorizontalLine = styled.hr`
  width: 100%;
  height: 0.8px;
  margin-top: 15px;
  margin-bottom: 12px;
  background-color: #707070;
  border-radius: 10px;
`;

const MainHeading = styled.h1`
  margin-bottom: 0px;
  padding: 0px;
  font-weight: 500;
  letter-spacing: 1.2px;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-variation-settings: "slnt" 0;
`;

const Para = styled.p`
  margin: 5px 0;
  letter-spacing: 1.2px;
  display: flex;
  flex-direction: row;
`;

const PageLink = styled(Link)`
  color: #000 !important;
  text-decoration: none;
  display: flex;
  margin-top: 30px;
  margin-left: 25px;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 2px;
  margin-top: 2px;
`;

const LogoImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 20px;
  margin-top: 2px;
`;

const HyperLink = styled.a`
  text-decoration: none;
  color: #007bff;
  margin-left: 5px;
`;

const Star = styled.span`
  margin-left: 5px;
  color: red;
`;

const CustomGoogleButton = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 0px;
`;

export {
  Container,
  ImageWrapper,
  ContentWrapper,
  Form,
  InputHeading,
  Input,
  Button,
  // GoogleButton,
  HorizontalLine,
  MainHeading,
  Para,
  PageLink,
  Image,
  LogoImage,
  HyperLink,
  Star,
  CustomGoogleButton,
}
