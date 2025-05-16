import React, { useState } from 'react';
import { Typography, Grid, Button, Card, Tabs, Tab } from '@mui/material';
import PaymentForm from '../components/Billing/PaymentForm';
import PaymentHistory from '../components/Billing/PaymentHistory';
import { payments } from '../mockData';

const Billing: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <div>
      <Typography variant="h4" className="mb-6">Billing Information</Typography>
      <Typography variant="body1" className="mb-6">
        Manage your payments and viewing billing history
      </Typography>
      
      <Card className="mb-6">
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Make Payment" />
          <Tab label="Billing history" />
        </Tabs>
      </Card>
      
      {activeTab === 0 ? (
        <PaymentForm />
      ) : (
        <PaymentHistory payments={payments} />
      )}
    </div>
  );
};

export default Billing;