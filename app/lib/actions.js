"use server";

import { cookies } from "next/headers";
import { signIn } from "../auth";
export async function authenticate(_currentState, formData) {
  try {
    return await signIn("credentials", formData).then((user) => {
      console.log("currentUser", JSON.stringify(user));
      if (user) {
        cookies().set("currentUser", user.userId);
        return "Submitted Successfuly";
      }

      throw new Error("Invalid credentials.");
    });
  } catch (error) {
    if (error) {
      return error.message;
    }
    throw error;
  }
}
