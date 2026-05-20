export interface Investor {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  country: string;
  createdAt: string;
}

export interface CreateInvestorPayload {
  fullName: string;
  email: string;
  dateOfBirth: string;
  country: string;
}

export interface ApiErrorBody {
  error: string;
  details?: string[];
}
