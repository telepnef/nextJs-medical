"use server";

import { cookies } from "next/headers";
import { signIn } from "../auth";

export async function authenticate(_currentState, formData) {
  try {
    return await signIn("credentials", formData).then((user) => {
      if (user) {
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        cookies().set("currentUser", user.bearerToken, { expires: expireDate });
        cookies().set("userName", user.firstName, { expires: expireDate });
        cookies().set("userEmail", user.emailAddress, { expires: expireDate });

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
