"use client";

import { useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";

const AuthAdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Refresh the page so /admin renders AdminPanel
      window.location.reload();
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-neutral-400">
            Sign in to manage products.
          </p>
        </div>

        <form onSubmit={handleSignin} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium"
            >
              Username
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-white/20 px-4 py-3 focus-within:border-white transition">
              <FiUser className="text-neutral-400" size={20} />

              <input
                id="username"
                type="text"
                placeholder="Enter username"
                className="w-full bg-transparent outline-none"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-white/20 px-4 py-3 focus-within:border-white transition">
              <FiLock className="text-neutral-400" size={20} />

              <input
                id="password"
                type="password"
                placeholder="Enter password"
                className="w-full bg-transparent outline-none"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthAdminPage;