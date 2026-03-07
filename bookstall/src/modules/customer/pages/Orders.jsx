import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, Container } from '@mui/material'

const Orders = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)', minHeight: '100vh', py: 5 }}>
      <Container sx={{ py: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#65350F', mb: 1 }}>
            Order History
          </Typography>
          <Typography sx={{ color: '#a0522d', fontSize: '1.1rem' }}>
            View your previous orders
          </Typography>
        </Box>
        <Box sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <Typography sx={{ color: '#666' }}>
            You have no previous orders.
          </Typography>
        </Box>
      </Container>
    </div>
  )
}

export default Orders
