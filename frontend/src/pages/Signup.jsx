import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
      firstName,
      lastName
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", data);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={(e) => setFirstName(e.target.value)} label={"First Name"} placeholder={"John"} />
          <InputBox onChange={(e) => setLastName(e.target.value)} label={"Last Name"} placeholder={"Doe"} />
          <InputBox onChange={(e) => setUsername(e.target.value)} label={"Email"} placeholder={"johndoe@example.com"} />
          <InputBox onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder={""} />
          <div className='pt-4'>
            <Button label={"Sign Up"} onSubmit={onSubmit} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Login"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}
