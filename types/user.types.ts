export interface User {
  name: string;
  email: string;
  password: string;
}

export interface RegisteredUserData {
  id: string;
  name: string;
  email: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: RegisteredUserData;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
}