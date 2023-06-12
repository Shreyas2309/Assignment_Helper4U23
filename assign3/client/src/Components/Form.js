import { useState } from "react";
import {ToastContainer,  toast} from "react-toastify"
import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  styled,
  Typography,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

import {addUser} from "../services/api"
import 'react-toastify/dist/ReactToastify.css';



const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 10% auto;
  & > div {
    margin-top: 20px;
  }
`;

const Message = styled("p")`
  color: red;
  margin: 0.5px;
`;

const defaultValue = {
  name: "",
  email: "",
  address: "",
  DOB: "",
  phone: "",
};

const AddUser = () => {

  const navigate = useNavigate()
  
  const [user, setUser] = useState(defaultValue);
  const [dob, setDob] = useState(null);
  const [message, setMessage] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  
  // console.log(dob.$D,dob.$M+1,dob.$y)

  if(dob != null){
    const strDob = `${dob.$D} ${dob.$M+1} ${dob.$y}`
    user.DOB = strDob
  }

  const nameValidation = () => {
    const regEx = /^[a-zA-Z ]+$/;
    if (regEx.test(user.name)) {
      setNameErr("");
    } else if (!regEx.test(user.name) && user.name !== "") {
      setNameErr("Name must be Valid");
    } else {
      setNameErr("");
    }
  };

  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
    if (regEx.test(user.email)) {
      setMessage("");
    } else if (!regEx.test(user.email) && user.email !== "") {
      setMessage("Email must be Valid");
    } else {
      setMessage("");
    }
  };

  const phoneValidation = () => {
    const regEx = /^[1-9][0-9]{9}$/;
    if (regEx.test(user.phone)) {
      setPhoneErr("");
    } else if (!regEx.test(user.phone) && user.phone !== "") {
      setPhoneErr("Phone number must be valid");
    } else {
      setPhoneErr("");
    }
  };


  const onValueChange = (e) => {
    console.log(user.DOB)
    setUser({ ...user, [e.target.name]: e.target.value });
    
  };

  const addUserDeatails = async () => {
    if(!message==="" || !nameErr==="" || !phoneErr===""){
      return ;
    }
    await addUser(user);
    
    navigate("/")
    toast("Form Submitted Successfully")
  };

  const submitForm = async (e) => {
    e.preventDefault();
    nameValidation();
    emailValidation();
    phoneValidation();
    addUserDeatails();
  };

  return (
    <>
    <ToastContainer
    autoClose={5000}
    hideProgressBar={true}
/>
      <Container>
        <Typography variant="h4">Add User</Typography>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input onChange={onValueChange} name="name" />
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input onChange={onValueChange} name="email" />
        </FormControl>
        <FormControl>
          <InputLabel>Address</InputLabel>
          <Input onChange={onValueChange} name="address" />
        </FormControl>
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select you Date of Birth"
              name="DOB"
              views={['year', 'month', 'day']}
              value={dob}
              format="DD / MM / YYYY"
              onChange={(date)=> {
                setDob(date)
              }}
              slotProps={{
                textField: {
                  helperText: "DD/MM/YYYY",
                }
              }}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl>
          <InputLabel>Phone</InputLabel>
          <Input onChange={onValueChange} name="phone" />
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={submitForm}>
            Submit
          </Button>
        </FormControl>
        <Message className="message">{message}</Message>
        <Message className="message">{nameErr}</Message>
        <Message className="message">{phoneErr}</Message>
      </Container>
      
    </>
  );
};

export default AddUser;
