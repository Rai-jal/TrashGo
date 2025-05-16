import { Bin, Feedback, Payment, ServiceRequest, User, WasteCollection } from './types';

// Current user
export const currentUser: User = {
  id: 'user-1',
  name: 'Mark',
  email: 'mark@example.com',
};

// Waste collections
export const wasteCollections: WasteCollection[] = [
  {
    id: 'wc-1',
    date: '2025-02-03',
    time: '06:00',
    weight: 15.7,
    type: 'General',
    status: 'Completed',
  },
  {
    id: 'wc-2',
    date: '2025-02-13',
    time: '06:00',
    weight: 18.2,
    type: 'Recyclable',
    status: 'Completed',
  },
  {
    id: 'wc-3',
    date: '2025-02-17',
    time: '09:00',
    weight: 10.5,
    type: 'Organic',
    status: 'Completed',
  },
  {
    id: 'wc-4',
    date: '2025-02-25',
    time: '14:00',
    weight: 5.8,
    type: 'Hazardous',
    status: 'Completed',
  },
  {
    id: 'wc-5',
    date: '2025-03-04',
    time: '06:00',
    weight: 0,
    type: 'General',
    status: 'Scheduled',
  },
];

// Bins
export const bins: Bin[] = [
  {
    id: 'BIN001',
    location: '123 Main St',
    status: 'Full',
    lastUpdated: '2025-02-03',
    nextPickup: '2025-03-04',
  },
  {
    id: 'BIN002',
    location: '456 Elm St',
    status: 'Half Full',
    lastUpdated: '2025-02-17',
    nextPickup: '2025-03-10',
  },
  {
    id: 'BIN003',
    location: '789 Oak St',
    status: 'Empty',
    lastUpdated: '2025-02-25',
    nextPickup: '2025-03-25',
  },
];

// Service requests
export const serviceRequests: ServiceRequest[] = [
  {
    id: 'sr-1',
    binId: 'BIN001',
    requestDate: '2025-02-28',
    status: 'In Progress',
    type: 'Regular Pickup',
  },
  {
    id: 'sr-2',
    binId: 'BIN002',
    requestDate: '2025-03-01',
    status: 'Pending',
    type: 'Issue Report',
  },
];

// Payments
export const payments: Payment[] = [
  {
    id: 'pmt-1',
    date: '2025-01-22',
    amount: 1500,
    description: 'Monthly',
    method: 'Orange Money',
    status: 'Completed',
  },
  {
    id: 'pmt-2',
    date: '2025-01-25',
    amount: 1825,
    description: 'Special Pickup',
    method: 'OMoney',
    status: 'Completed',
  },
  {
    id: 'pmt-3',
    date: '2025-02-01',
    amount: 1500,
    description: 'Monthly',
    method: 'Orange Money',
    status: 'Completed',
  },
];

// Feedback
export const feedbacks: Feedback[] = [
  {
    id: 'fb-1',
    rating: 4,
    agentRating: 5,
    comment: 'Great service, very prompt. The app is easy to use.',
    submittedDate: '2025-01-15',
  },
  {
    id: 'fb-2',
    rating: 3,
    agentRating: 4,
    comment: 'Pickup was delayed by a day, but otherwise good service.',
    submittedDate: '2025-02-05',
  },
];

// Stats
export const stats = {
  totalWasteCollected: 154.90,
  percentageChange: -21.0,
  activeRequests: 2,
  inProgressRequests: 1,
  pendingRequests: 1,
};