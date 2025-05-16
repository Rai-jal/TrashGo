export interface User {
  id: string;
  name: string;
  email: string;
}

export interface WasteCollection {
  id: string;
  date: string;
  time: string;
  weight: number;
  type: 'General' | 'Recyclable' | 'Organic' | 'Hazardous';
  status: 'Scheduled' | 'Completed' | 'Missed';
}

export interface Bin {
  id: string;
  location: string;
  status: 'Empty' | 'Half Full' | 'Full';
  lastUpdated: string;
  nextPickup?: string;
}

export interface ServiceRequest {
  id: string;
  binId: string;
  requestDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  type: 'Regular Pickup' | 'Special Pickup' | 'Issue Report';
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  description: string;
  method: 'AfterPay' | 'Afterpay' | 'OMoney' | 'Orange Money';
  status: 'Pending' | 'Completed' | 'Failed';
}

export interface Feedback {
  id: string;
  rating: number;
  agentRating: number;
  comment: string;
  submittedDate: string;
}