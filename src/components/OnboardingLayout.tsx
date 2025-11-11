import { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
  path: string;
}

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  steps: Step[];
}

const OnboardingLayout = ({ children, currentStep, steps }: OnboardingLayoutProps) => {
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Mobile Progress Bar - Top (hidden for steps 5, 6, 7) */}
      {currentStep < 5 && (
        <div className="lg:hidden w-full bg-card border-b border-border sticky top-0 z-20 shadow-sm">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-xs font-semibold text-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Left Sidebar Stepper */}
      <aside className="hidden lg:flex flex-col w-72 bg-card border-r border-border sticky top-0 h-screen">
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-0.5">VEWMEE</h2>
            <p className="text-xs text-muted-foreground">Platform Setup</p>
          </div>

          {/* Step List */}
          <nav className="space-y-0 flex-1">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              const isUpcoming = stepNumber > currentStep;

              return (
                <div key={step.id} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-4 top-9 w-px h-8 transition-colors duration-300",
                        isCompleted ? "bg-success" : "bg-border"
                      )}
                    />
                  )}

                  {/* Step Item */}
                  <div
                    className={cn(
                      "relative flex items-center gap-3 py-2 transition-all duration-200"
                    )}
                  >
                    {/* Step Circle */}
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 shrink-0",
                        isCompleted && "bg-success border-success",
                        isCurrent && "border-2 border-foreground bg-card",
                        isUpcoming && "border border-border bg-card"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-success-foreground" strokeWidth={3} />
                      ) : (
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            isCurrent && "text-foreground",
                            isUpcoming && "text-muted-foreground"
                          )}
                        >
                          {stepNumber}
                        </span>
                      )}
                    </div>

                    {/* Step Text */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium transition-colors duration-200",
                          isCurrent && "text-foreground font-semibold",
                          isCompleted && "text-foreground",
                          isUpcoming && "text-muted-foreground"
                        )}
                      >
                        {step.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Progress Percentage at Bottom */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-foreground">
                {Math.round(progressPercentage)}%
              </div>
              <p className="text-xs text-muted-foreground">complete</p>
            </div>
          </div>
        </div>

        {/* Bottom Help Text */}
        <div className="p-6 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Need help? Contact us at{" "}
            <a href="mailto:support@vewmee.com" className="text-foreground hover:underline font-medium">
              support@vewmee.com
            </a>
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default OnboardingLayout;
