import React, { useState } from 'react';
import { Card, Typography, Button, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { bins } from '../../mockData';

interface QRScannerProps {
  type: 'scan' | 'report' | 'confirm';
  onScan?: (binId: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ type, onScan }) => {
  const [scannedBin, setScannedBin] = useState('');
  const [binStatus, setBinStatus] = useState('Full');
  const [success, setSuccess] = useState(false);

  // Simulate QR code scanning
  const handleScanClick = () => {
    // In a real app, this would trigger the camera to scan a QR code
    // For now, we'll just simulate with the first bin ID
    const randomBin = bins[0].id;
    setScannedBin(randomBin);
    if (onScan) onScan(randomBin);
    if (type === 'report' || type === 'scan') {
      setSuccess(true);
    }
  };

  const handleSubmitReport = () => {
    setSuccess(true);
  };

  const handleMarkCollected = () => {
    setSuccess(true);
  };

  const renderScanContent = () => (
    <>
      <Typography variant="h6" className="mb-4">Scan Bin QR Code</Typography>
      <Typography variant="body2" className="mb-4">
        Scan the QR code on the bin to request a pickup
      </Typography>
      
      {!scannedBin ? (
        <>
          <div className="flex justify-center mb-4">
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleScanClick}
              className="w-40"
            >
              Scan QRCode
            </Button>
          </div>
          <Typography variant="body2" className="text-center text-gray-500">
            Position the QR code within the camera frame to scan
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h6" className="mb-2">Scanned Bin</Typography>
          <TextField
            fullWidth
            value={scannedBin}
            disabled
            className="mb-4"
          />
          {success && (
            <Typography variant="body1" className="text-green-500 font-medium mt-4">
              Pickup request sent successfully!
            </Typography>
          )}
        </>
      )}
    </>
  );

  const renderReportContent = () => (
    <>
      <Typography variant="h6" className="mb-2">Report Bin Status</Typography>
      <Typography variant="body2" className="mb-4">
        {`Bin ID: ${bins[0].id} - Location: ${bins[0].location}`}
      </Typography>
      
      <RadioGroup value={binStatus} onChange={(e) => setBinStatus(e.target.value)} className="mb-4">
        <FormControlLabel value="Empty" control={<Radio />} label="Empty" />
        <FormControlLabel value="Half Full" control={<Radio />} label="Half Full" />
        <FormControlLabel value="Full" control={<Radio />} label="Full" />
      </RadioGroup>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmitReport}
        fullWidth
        className="mb-2"
      >
        Summit Report
      </Button>
    </>
  );

  const renderConfirmContent = () => (
    <>
      <Typography variant="h6" className="mb-2">Bin Collection</Typography>
      <Typography variant="body2" className="mb-1">
        Your report has been received
      </Typography>
      
      <Typography variant="subtitle2" className="mb-1 mt-4 font-bold">Current Status</Typography>
      <Typography variant="body1" className="text-red-500 font-medium mb-4">
        Full
      </Typography>
      
      <Typography variant="subtitle2" className="mb-1 font-bold">Latest Update</Typography>
      <Typography variant="body2" className="mb-4">
        2025-02-3
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleMarkCollected}
        fullWidth
        className="mb-2"
      >
        Mark as Collected
      </Button>
      
      <Button 
        variant="outlined" 
        color="primary" 
        fullWidth
      >
        Report Issue
      </Button>
    </>
  );

  let content;
  switch (type) {
    case 'scan':
      content = renderScanContent();
      break;
    case 'report':
      content = renderReportContent();
      break;
    case 'confirm':
      content = renderConfirmContent();
      break;
    default:
      content = renderScanContent();
  }

  return (
    <Card className="p-6 shadow-sm max-w-md">
      {content}
    </Card>
  );
};


export default QRScanner;