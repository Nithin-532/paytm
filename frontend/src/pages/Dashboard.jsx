import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios';

export default function Dashboard() {
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    try {
      axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: { "Authorization": "Bearer " + localStorage.getItem("token")}
      })
        .then(res => setBalance(res.data.account));
    } catch(e) {
      console.log(e);
    }
  })

  return (
    <div>
      <Appbar />
      <div className='m-8'>
        <Balance value={String(balance).split(".")[0]} />
        <Users />
      </div>
    </div>
  )
}
