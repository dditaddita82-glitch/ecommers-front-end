// src/app/auth/signin/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Jika sudah ada token, anggap sudah login (validasi asli di backend/middleware)
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Decode untuk cek role (bisa pakai jwt-decode atau ambil dari endpoint /me)
      api.get("/auth/me").then((res) => {
        if (res.data.success) {
          const role = res.data.data.role.toLowerCase();
          router.push(`/${role}/dashboard`);
        }
      }).catch(() => {
        localStorage.removeItem("accessToken");
      });
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      if (res.data.success) {
        // Simpan token di localStorage
        localStorage.setItem("accessToken", res.data.data.accessToken);
        
        // Ambil role dari response (ADMIN atau CUSTOMER)
        const role = res.data.data.user.role.toLowerCase();
        
        // Redirect ke dashboard masing-masing
        router.push(`/${role}/dashboard`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Email atau password salah");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center py-24 transition-all duration-300 ease-out md:w-6/12 md:pl-[2rem] xl:pl-[8rem] 2xl:pl-[15rem]">
      <div className="flex w-full flex-col items-start">
        <div className="flex flex-col gap-3">
          <h2 className="text-accent-foreground mb-2 w-full text-left text-5xl font-normal">
            Selamat Datang Di SPA
          </h2>
          <p className="text-accent-foreground mb-10 text-sm">
            Tempat berbelanja kosmetik terbaik dan terjamin
          </p>
        </div>

        <form
          className="mt-10 w-full space-y-6 md:max-w-md"
          onSubmit={handleSubmit}
        >
          <label
            className="text-accent-foreground mb-3 block text-sm"
            htmlFor="email"
          >
            Silahkan masuk dengan data diri anda
          </label>
          <input
            name="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            placeholder="Email"
            className="focus:text-accent-foreground text-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base placeholder-gray-400 focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none"
            required
          />
          <input
            name="password"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className="focus:text-accent-foreground text-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base placeholder-gray-400 focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-accent-foreground w-full text-right text-sm">
            Belum punya akun ?
            <Link
              href="/auth/signup"
              className="ml-3 cursor-pointer text-[#2e2acb]"
            >
              Sign-up
            </Link>
          </p>
          <button
            type="submit"
            className="text-white mt-6 w-full rounded-lg bg-[#3729E0] py-3 text-center"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Log-in"}
          </button>
        </form>
      </div>
    </div>
  );
}
