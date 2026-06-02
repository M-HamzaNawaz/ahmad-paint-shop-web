import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to manage Ahmad Paint House products and orders.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-220px)] items-center justify-center bg-zinc-50 px-4 py-12">
      <LoginForm />
    </div>
  );
}
