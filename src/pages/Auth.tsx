import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-accent/30 via-background to-secondary/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-6xl flex items-center justify-between gap-12 relative z-10">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col flex-1 space-y-6">
          <div className="space-y-2">
            <svg
              className="w-48 h-auto"
              viewBox="0 0 200 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 10L30 40L20 50L10 40L20 10Z"
                fill="url(#gradient)"
                className="animate-pulse"
              />
              <path
                d="M40 15C40 15 45 25 50 30C55 35 60 40 60 40"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(350, 100%, 64%)" />
                  <stop offset="100%" stopColor="hsl(10, 100%, 68%)" />
                </linearGradient>
              </defs>
              <text x="70" y="38" className="text-4xl font-bold" fill="hsl(350, 100%, 64%)">
                VEWMEE
              </text>
            </svg>
            <p className="text-sm text-primary font-medium tracking-wide">MONETIZE YOUR BRAND</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight text-foreground">
              Welcome to our White Label Service!
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              We are thrilled to have you on board and excited to partner with you in delivering
              exceptional value to your customers.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Custom Branded Platform</h3>
                <p className="text-sm text-muted-foreground">Your own branded creator platform with custom domains</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Quick Setup</h3>
                <p className="text-sm text-muted-foreground">Get started in minutes with our streamlined onboarding</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">Bank-level security to protect your data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex-1 max-w-md w-full">
          <div className="backdrop-blur-xl bg-card/80 rounded-2xl shadow-2xl border border-border/50 p-8">
            <AuthForm mode={mode} onToggleMode={() => setMode(mode === "login" ? "signup" : "login")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
