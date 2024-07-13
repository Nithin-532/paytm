import React from 'react'

export default function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <div className='text-sm font-medium text-left py-2'>
        {label}
      </div>
      <input type='text' id={label} placeholder={placeholder} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' onChange={onChange} required/>
    </div>
  )
}
