import { Container, Typography } from '@mui/material'
import React from 'react'

const Checkout = () => {
  return (
    <div
    style={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        py: 5,
      }}>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#65350F", mb: 2 }}>
          Checkout
        </Typography>
        
      </Container>
    </div>
  )
}

export default Checkout
