import axios from "axios";
import { Report } from "@/types"

const API_URL = "https://your-backend.com";

export async function signUp(email: string, password: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      email,
      password,
    });

    return response.data.token;
  } catch (error: any) {
    console.error("SignUp error:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Sign up failed");
  }
}

export async function signIn(email: string, password: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, {
      email,
      password,
    });

    return response.data.token;
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