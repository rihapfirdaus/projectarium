import axios from "axios";

export async function isStillAuthorized(token: string) {
  try {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, data } = await axiosInstance.post(`/auth/validate-token`, {
      token: token,
    });

    if (status === 401 || !data.data.isValid) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
