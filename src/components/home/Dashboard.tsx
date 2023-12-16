import React from 'react'
import Profile from './Profile'
import Detail from './Detail'

const Dashboard = () => {
  return (
    <div className='h-full pt-48 pl-2 bg-gray-300'>
  <div className='flex flex-col lg:flex-row'>
    <div className='lg:w-1/4 ml-4'>
      <Profile/>
    </div>
    <div className='lg:w-3/4'>
      <Detail/>
    </div>
  </div>
</div>

  )
}

export default Dashboard
