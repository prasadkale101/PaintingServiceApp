export interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

export interface Schedule {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  location: string;
  additional_info: string | null;
  created_at: string;
}

export interface Estimate {
  id: number;
  schedule_id: number;
  estimateAmount: string;
  briefDescription: string | null;
}

export interface ScheduleWithEstimate {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  location: string;
  additional_info: string | null;
  created_at: string;
  estimate?: Estimate | null;
}