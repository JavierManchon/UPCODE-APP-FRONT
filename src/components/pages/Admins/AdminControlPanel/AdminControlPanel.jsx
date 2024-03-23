import React from 'react'

import UserManagement from '../UserManagement/UserManagement'
import DesignManagement from '../DesignManagement/DesignManagement'
import TicketsManagement from '../TicketsManagement/TicketsManagement'
import TicketsDetails from '../TicketsManagement/TicketsDetails/TicketsDetails'



function AdminControlPanel() {
  return (
    <div>
       
         {/* <UserManagement/> 
         <DesignManagement /> */}
        {/* <TicketsManagement/> */}
        <TicketsDetails/>
    </div>
  )
}

export default AdminControlPanel
