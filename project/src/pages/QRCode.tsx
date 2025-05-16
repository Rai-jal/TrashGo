import React, { useState } from 'react';
import { Typography, Grid, Tabs, Tab, Paper } from '@mui/material';
import QRScanner from '../components/QR/QRScanner';

const QRCode: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <div>
      <Typography variant="h4" className="mb-6">QR Code Scanner</Typography>
      
      <Paper className="mb-6">
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Scan" />
          <Tab label="Report" />
          <Tab label="Confirm" />
        </Tabs>
      </Paper>
      
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          {activeTab === 0 && <QRScanner type="scan" />}
          {activeTab === 1 && <QRScanner type="report" />}
          {activeTab === 2 && <QRScanner type="confirm" />}
        </Grid>
      </Grid>
    </div>
  );
};

export default QRCode;