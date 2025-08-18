import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface BillRequest {
  startDate: string;
  endDate: string;
  sellerId?: string;
}

export interface BillResponse {
  billId: string;
  sellerId: string;
  periodStart: string;
  periodEnd: string;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'FAILED';
  items: BillItem[];
  createdAt: string;
}

export interface BillItem {
  orderId: string;
  orderDate: string;
  amount: number;
  status: string;
}

export const generateBill = async (billRequest: BillRequest): Promise<BillResponse> => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.post(`${API_URL}/bills/generate`, billRequest, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error generating bill:', error);
    throw error;
  }
};

export const downloadBill = async (billId: string): Promise<Blob> => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.get(`${API_URL}/bills/${billId}/download`, {
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading bill:', error);
    throw error;
  }
};
