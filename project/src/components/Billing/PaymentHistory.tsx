import React from 'react';
import { Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Payment } from '../../types';

interface PaymentHistoryProps {
  payments: Payment[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(amount / 100);
  };

  return (
    <Card className="p-6 shadow-sm">
      <Typography variant="h6" className="mb-4">Billing History</Typography>
      
      <TableContainer component={Paper} className="shadow-none">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Method</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{formatDate(payment.date)}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell align="right">{formatAmount(payment.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default PaymentHistory;