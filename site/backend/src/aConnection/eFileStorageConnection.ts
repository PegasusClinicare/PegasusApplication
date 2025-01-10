import cloudinary from "cloudinary";


const fileStorageConnection = () => {
  cloudinary.v2.config({
    cloud_name: 'dyi12y5ew',
    api_key: '792163737655482',
    api_secret: '87-UB1ne0ikeX4Ql0YIr4l2lIlg'
  })
}

export default fileStorageConnection;
