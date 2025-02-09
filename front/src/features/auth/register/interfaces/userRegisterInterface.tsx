export interface SignUpFormState {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  planId: number | string;
  billingCycle: string;
}

export interface SignUpFormResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
    };
    token: string;
  };
  message: string;
}
