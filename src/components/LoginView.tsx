import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { AppConfig } from "../types";

interface LoginViewProps {
  onLoginSuccess: () => void;
  config: AppConfig;
  isDark: boolean;
}

export default function LoginView({ onLoginSuccess, config, isDark }: LoginViewProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // Fetch custom credentials from localStorage, otherwise default to admin/admin123
      const savedUser = localStorage.getItem("KAS_SEKOLAH_USER") || "admin";
      const savedPass = localStorage.getItem("KAS_SEKOLAH_PASS") || "admin123";

      if (username.trim() === savedUser && password === savedPass) {
        sessionStorage.setItem("KAS_SEKOLAH_LOGGED_IN", "true");
        localStorage.removeItem("KAS_SEKOLAH_LOGGED_IN");
        onLoginSuccess();
      } else {
        setError("Username atau password salah. Silakan coba kembali.");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 font-sans ${
      isDark ? "bg-[#0f172a]" : "bg-[#f8fafc]"
    }`}>
      <div className="w-full max-w-md select-none animate-fade-in flex flex-col items-center">
        
        {/* Header Luar: Logo & Nama Sekolah */}
        <div className="flex flex-col items-center text-center mb-6">
          {/* Box Icon Biru */}
          <div className="bg-blue-600 p-3.5 rounded-2xl shadow-lg shadow-blue-500/30 text-white mb-3.5 flex items-center justify-center">
            <img 
              src="/logoweb.png" 
              alt="Logo Sekolah" 
              className="size-8 object-contain"
              onError={(e) => {
                // Fallback jika gambar logo tidak ditemukan
                e.currentTarget.style.display = 'none';
              }} 
            />
          </div>

          <h1 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            {config.namaSekolah || "MTs Roudhotul Ulum"}
          </h1>
          <p className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mt-1">
            SISTEM KASIR PENERIMAAN &amp; SPP SEKOLAH
          </p>
        </div>

        {/* Card Form Login Utama */}
        <div className={`w-full rounded-3xl p-8 shadow-xl border transition-all duration-300 ${
          isDark 
            ? "bg-slate-900 border-white/10 text-white shadow-black/40" 
            : "bg-white border-slate-100 text-slate-800 shadow-slate-200/60"
        }`}>
          
          <h2 className={`text-xl font-bold text-center ${isDark ? "text-white" : "text-slate-900"}`}>
            Login Admin
          </h2>
          <p className={`text-xs text-center mt-1 mb-6 font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Lakukan login untuk mengelola tagihan, kuitansi, dan sinkronisasi.
          </p>

          {/* Notifikasi Error */}
          {error && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 rounded-xl text-xs flex items-start gap-2.5 mb-5 animate-shake font-medium">
              <AlertCircle className="size-4 shrink-0 mt-0.5 text-red-500" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Field Username */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="size-4" />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium placeholder:text-slate-400 ${
                    isDark 
                      ? "bg-slate-800/50 border-white/10 text-white" 
                      : "bg-slate-50 border-slate-200/80 text-slate-800"
                  }`}
                />
              </div>
            </div>

            {/* Field Password */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="size-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className={`w-full pl-10 pr-10 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium placeholder:text-slate-400 ${
                    isDark 
                      ? "bg-slate-800/50 border-white/10 text-white" 
                      : "bg-slate-50 border-slate-200/80 text-slate-800"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-[0.99] cursor-pointer ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                    : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-800"
                }`}
              >
                <LogIn className="size-4" />
                {isLoading ? "Memvalidasi..." : "Masuk ke Sistem"}
              </button>
            </div>

          </form>
        </div>

        {/* Footer Attribution */}
        <div className={`text-center mt-8 text-[11px] font-medium transition-colors duration-300 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
          Sistem Keuangan Kasir &amp; SPP Sekolah v1.0. All Rights Reserved.
        </div>

      </div>
    </div>
  );
}
