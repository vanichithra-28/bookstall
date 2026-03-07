import React from 'react'
import { Container, Grid, Typography, Box } from '@mui/material'

const Index = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)', minHeight: '100vh', py: 5 }}>
      <Container sx={{ py: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, color: '#65350F', mb: 1 }}>
            Welcome
          </Typography>
          <Typography sx={{ color: '#a0522d', fontSize: '1.1rem' }}>
            Browse our extensive collection
          </Typography>
        </Box>

        <Grid container spacing={3}>
          
        </Grid>
      </Container>
    </div>
  )
}

export default Index
