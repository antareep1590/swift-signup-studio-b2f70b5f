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
      {/* Mobile Progress Bar - Top */}
      <div className="lg:hidden w-full bg-card border-b border-border sticky top-0 z-20">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Desktop Left Sidebar Stepper */}
      <aside className="hidden lg:flex flex-col w-80 bg-card border-r border-border sticky top-0 h-screen">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-1">VEWMEE</h2>
            <p className="text-sm text-muted-foreground">Platform Setup</p>
          </div>

          {/* Progress Percentage */}
          <div className="mb-8 p-4 bg-accent/30 rounded-lg border border-accent">
            <div className="text-3xl font-bold text-accent-foreground mb-1">
              {Math.round(progressPercentage)}%
            </div>
            <p className="text-sm text-muted-foreground">Complete</p>
          </div>

          {/* Step List */}
          <nav className="space-y-1">
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
                        "absolute left-5 top-11 w-0.5 h-8 transition-colors duration-300",
                        isCompleted ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}

                  {/* Step Item */}
                  <div
                    className={cn(
                      "relative flex items-center gap-4 p-3 rounded-lg transition-all duration-300",
                      isCurrent && "bg-accent/50",
                      isCompleted && "opacity-100",
                      isUpcoming && "opacity-60"
                    )}
                  >
                    {/* Step Circle */}
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 shrink-0",
                        isCompleted && "bg-primary border-primary",
                        isCurrent && "border-primary bg-background",
                        isUpcoming && "border-border bg-background"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <span
                          className={cn(
                            "text-sm font-semibold",
                            isCurrent && "text-primary",
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
                          "text-sm font-medium transition-colors duration-300",
                          isCurrent && "text-foreground",
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
        </div>

        {/* Bottom Help Text */}
        <div className="mt-auto p-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Need help? Contact us at{" "}
            <a href="mailto:support@vewmee.com" className="text-primary hover:underline">
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
