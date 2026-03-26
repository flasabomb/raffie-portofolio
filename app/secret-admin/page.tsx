"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      password,
      redirect: false,
      callbackUrl: "/secret-admin/dashboard"
    });

    if (result?.error) {
      setError("Incorrect password");
      setLoading(false);
      return;
    }

    router.push("/secret-admin/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-base px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-10">
        <h1 className="font-heading text-4xl text-[var(--text-primary)]">Raffie Arfa</h1>
        <p className="mt-1 text-sm text-muted">Admin Panel</p>

        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full rounded-xl border border-border bg-base px-4 py-3 text-[var(--text-primary)] outline-none ring-[#FF5C1A] transition focus:ring-2"
          />
          {error ? <p className="text-sm text-[#EF4444]">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent px-4 py-3 font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-dark)] disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
