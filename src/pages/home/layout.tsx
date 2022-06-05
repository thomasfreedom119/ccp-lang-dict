import { Container, Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const Home = () => {
  return (
    <div>Home page</div>
  )
}

export const Layout = () => {
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2} direction='column' alignItems='center' padding={'15px'}>
        <Outlet />
      </Grid>
    </Container>
  )
}