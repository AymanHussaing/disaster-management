import React from 'react'
import { Link } from 'react-router-dom'
const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <Link to='/register/disaster'>Register Disaster</Link><br />
      <Link to='/disasters'>disasfasd</Link><br />
      <Link to='/volunteer/registration'>Register as a volunteer</Link><br />
    </>
  )
}

export default HomePage