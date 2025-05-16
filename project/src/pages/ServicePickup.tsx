import React, { useState } from 'react';
import { Typography, Grid, Button, Card } from '@mui/material';
import { Plus } from 'lucide-react';
import ServiceRequestCard from '../components/ServicePickup/ServiceRequestCard';
import QRScanner from '../components/QR/QRScanner';
import { serviceRequests } from '../mockData';

const ServicePickup: React.FC = () => {
  const [showScanner, setShowScanner] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4">Service Pickup</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Plus size={18} />}
          onClick={() => setShowScanner(true)}
        >
          New Pickup
        </Button>
      </div>
      
      <Grid container spacing={3}>
        {showScanner ? (
          <Grid item xs={12} md={6}>
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6">Scan QR Code</Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => setShowScanner(false)}
                >
                  Cancel
                </Button>
              </div>
              <QRScanner type="scan" onScan={() => setTimeout(() => setShowScanner(false), 2000)} />
            </Card>
          </Grid>
        ) : null}
        
        <Grid item xs={12} md={showScanner ? 6 : 12}>
          <Typography variant="h6" className="mb-4">Active Requests</Typography>
          {serviceRequests.map(request => (
            <ServiceRequestCard key={request.id} request={request} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default ServicePickup;