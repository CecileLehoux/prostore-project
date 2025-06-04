"use server";

import { signInFromSchema, signUpFormSchema } from "../validations";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";

// Sign In the user with credentials

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFromSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);
    return {
      success: true,
      message: "Sign in successful",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Sign in failed. Please check your credentials.",
    };
  }
}

// Sign Out the user

export async function signOutUser() {
  await signOut();
}

// SignUp the user with credentials
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confimrPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;
    user.password = hashSync(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });
    return {
      success: true,
      message: "Sign up successful",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: formatError(error),
    };
  }
}
