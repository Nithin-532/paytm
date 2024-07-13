import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", data);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    }catch(e) {
      console.log(e);
    }
  }

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"johndoe@example.com"} onChange={(e) => setUsername(e.target.value)} />
          <InputBox label={"Password"} placeholder={""} onChange={(e) => setPassword(e.target.value)} />
          <div className='w-full pt-3'>
            <Button label={"Sign In"} onSubmit={onSubmit} />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
        </div>
      </div>
    </div>
  )
}
