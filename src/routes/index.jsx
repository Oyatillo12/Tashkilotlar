import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {CapitalUsers, Organization, OrganizationAdd, RegionUsers, SinglePage} from '../pages'

function CustomRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Organization/>}/>
      <Route path='/:id' element={<SinglePage/>}/>
      <Route path='/add' element={<OrganizationAdd/>}/>
      <Route path='/:id/edit' element={<OrganizationAdd/>}/>
      <Route path='/capital-users' element={<CapitalUsers/>}/>
      <Route path='/region-users' element={<RegionUsers/>}/>
    </Routes>
  )
}

export default CustomRoutes
