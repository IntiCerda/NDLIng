import axios from "axios";
import { Report } from "@/types"

const API_URL = "http://192.168.1.85:8000";

export async function signUp(rut: string, email: string, password: string): Promise<boolean> {
  try {
    console.log(rut, email, password)
    const response = await axios.post(`${API_URL}/users`, {
      rut,
      email,
      password,
    });
    console.log("status:", response.status)
    return response.status === 200 || response.status === 201;
  } catch (error: any) {
    console.error("SignUp error:", error.response?.data || error, error.response?.data?.message);
    console.log(error)
    throw new Error(error.response?.data?.message || "Sign up failed");
  }
}

export async function signIn(email: string, password: string): Promise<boolean> {
  try {
    const response = await axios.post(`${API_URL}/auth/auth/login`, {
      email,
      password,
    });

    return response.status === 200 || response.status === 201;
  } catch (error: any) {
    console.error("SignIn error:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Sign in failed");
  }
}

export async function makeReport(report: Report): Promise<void> {
  try {
    await axios.post(`${API_URL}/reports`, report);
  } catch (error: any) {
    console.error("Error sending report:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Failed to create report");
  }
}