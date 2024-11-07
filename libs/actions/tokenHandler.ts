"use server";

import { cookies } from "next/headers";

interface StoreTokenRequest {
  token: string;
}

export async function storeAuthToken(request: StoreTokenRequest) {
  (await cookies()).set({
    name: "accessToken",
    value: request.token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 6 * 60 * 60,
  });
}

export async function auth() {
  const authToken = (await cookies()).get("accessToken")?.value;

  return authToken ? true : false;
}

export async function getAuthToken() {
  const authToken = (await cookies()).get("accessToken")?.value;

  return authToken;
}

export async function removeAuthToken() {
  (await cookies()).delete("accessToken");
}
