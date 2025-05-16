import React, { useState } from 'react';
import { Card, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, Snackbar, Alert } from '@mui/material';

const PaymentForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('Orange Money');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('1500');
  const [successMessage, setSuccessMessage] = useState(false);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment
    setSuccessMessage(true);
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(false);
  };

  return (
    <>
      <Card className="p-6 shadow-sm">
        <Typography variant="h6" className="mb-4">Select Payment Method</Typography>
        
        <FormControl component="fieldset" className="mb-4 w-full">
          <RadioGroup 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="flex flex-row justify-between"
          >
            <FormControlLabel 
              value="AfterPay" 
              control={<Radio />} 
              label={<div className="flex items-center"><span className="mr-2">Afri-Money</span></div>} 
            />
            <FormControlLabel 
              value="Afterpay" 
              control={<Radio />} 
              label={<div className="flex items-center"><span className="mr-2">Q-Money</span></div>} 
            />
            <FormControlLabel 
              value="Orange Money" 
              control={<Radio />} 
              label={<div className="flex items-center"><span className="mr-2">Orange Money</span></div>} 
            />
          </RadioGroup>
        </FormControl>
        
        <Typography variant="subtitle1" className="mb-2">Phone Number</Typography>
        <TextField
          fullWidth
          placeholder="Enter you phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mb-4"
        />
        
        <Typography variant="subtitle1" className="mb-2">Amount</Typography>
        <RadioGroup 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          className="mb-4"
        >
          <FormControlLabel value="1500" control={<Radio />} label="1500 (Monthly)" />
          <FormControlLabel value="4000" control={<Radio />} label="4000 (Quarterly)" />
          <FormControlLabel value="15000" control={<Radio />} label="15000 (Yearly)" />
        </RadioGroup>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handlePaymentSubmit}
          disabled={!phoneNumber}
        >
          Initiate Payment
        </Button>
      </Card>

      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Payment of {amount} via {paymentMethod} was successful!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PaymentForm;