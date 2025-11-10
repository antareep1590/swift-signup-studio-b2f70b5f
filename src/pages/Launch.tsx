import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Rocket, Loader2, ExternalLink, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import OnboardingLayout from "@/components/OnboardingLayout";

const Launch = () => {
  const { toast } = useToast();
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "completed">("idle");
  const [progress, setProgress] = useState(0);

  const steps = [
    { id: 1, name: "Customize Branding", path: "/onboarding/basic-info" },
    { id: 2, name: "Preview", path: "/onboarding/preview" },
    { id: 3, name: "Pricing & Payment", path: "/onboarding/payment" },
    { id: 4, name: "Connect Domain", path: "/onboarding/connect-domain" },
    { id: 5, name: "Stripe Access", path: "/onboarding/stripe-access" },
    { id: 6, name: "Launch", path: "/onboarding/launch" },
  ];

  const brandInfo = {
    brandName: "VEWMEE",
    domain: "truefanz.com",
    fanAppUrl: "app.truefanz-fan.com",
    creatorAppUrl: "app.truefanz-creator.com",
  };

  const handleStartDeployment = () => {
    setDeploymentStatus("deploying");
    setProgress(0);

    // Simulate deployment progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDeploymentStatus("completed");
          toast({
            title: "🎉 Platform Launched Successfully!",
            description: "Your platform is now live and accessible.",
          });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleCheckStatus = () => {
    toast({
      title: "Deployment In Progress",
      description: `Current progress: ${progress}%`,
    });
  };

  return (
    <OnboardingLayout currentStep={6} steps={steps}>
      <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12 lg:py-16">
        {deploymentStatus === "completed" ? (
          <>
            {/* Success State */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-success/10 mb-6">
                <Rocket className="w-12 h-12 text-success" />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                🎉 Platform Launched!
              </h1>
              <p className="text-lg text-muted-foreground">
                Your platform is now live and ready to welcome subscribers!
              </p>
            </div>

            {/* Brand Info */}
            <Card className="p-8 mb-8 bg-accent/20 border-accent shadow-elevated">
              <h2 className="text-xl font-semibold mb-6">Your Platform Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-4 border-b border-border">
                  <span className="text-muted-foreground text-sm">Brand Name:</span>
                  <span className="font-semibold text-foreground">{brandInfo.brandName}</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-muted-foreground text-sm">Custom Domain:</span>
                  <span className="font-semibold text-foreground">{brandInfo.domain}</span>
                </div>
              </div>
            </Card>

            {/* Platform URLs */}
            <Card className="p-8 mb-8 shadow-elevated">
              <h2 className="text-xl font-semibold mb-6">Platform URLs</h2>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-base">Website</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-accent/20 px-5 py-4 rounded-lg border border-accent">
                      <a
                        href={`https://${brandInfo.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium text-sm"
                      >
                        www.{brandInfo.domain}
                      </a>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => window.open(`https://${brandInfo.domain}`, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-base">Fan App</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-accent/20 px-5 py-4 rounded-lg border border-accent">
                      <a
                        href={`https://${brandInfo.fanAppUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium text-sm"
                      >
                        {brandInfo.fanAppUrl}
                      </a>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => window.open(`https://${brandInfo.fanAppUrl}`, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-1">
                    <p><span className="font-medium">Username:</span> test@gmail.com</p>
                    <p><span className="font-medium">Password:</span> Qwerty@123</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-base">Creator App</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-accent/20 px-5 py-4 rounded-lg border border-accent">
                      <a
                        href={`https://${brandInfo.creatorAppUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium text-sm"
                      >
                        {brandInfo.creatorAppUrl}
                      </a>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => window.open(`https://${brandInfo.creatorAppUrl}`, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-1">
                    <p><span className="font-medium">Username:</span> test@gmail.com</p>
                    <p><span className="font-medium">Password:</span> Qwerty@123</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Feedback Section */}
            <Card className="p-8 shadow-elevated">
              <h3 className="text-lg font-semibold mb-4">Share Your Feedback</h3>
              <textarea
                placeholder="We'd love to hear about your experience..."
                className="w-full h-32 px-4 py-3 rounded-lg border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
              <Button className="w-full mt-4" size="lg">
                Submit Feedback
              </Button>
            </Card>
          </>
        ) : (
          <>
            {/* Pre-deployment State */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
                <Rocket className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                🚀 You're Almost There!
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Your platform is configured and ready to launch
              </p>
              <p className="text-base text-muted-foreground mb-6">
                Let's activate it and go live to the world!
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/30 rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Estimated time: 2-5 minutes</span>
              </div>
            </div>

            {/* Brand Info Preview */}
            <Card className="p-8 mb-8 bg-accent/20 border-accent shadow-elevated">
              <h2 className="text-xl font-semibold mb-6">Your Platform Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-4 border-b border-border">
                  <span className="text-muted-foreground text-sm">Brand Name:</span>
                  <span className="font-semibold text-foreground">{brandInfo.brandName}</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-muted-foreground text-sm">Custom Domain:</span>
                  <span className="font-semibold text-foreground">{brandInfo.domain}</span>
                </div>
              </div>
            </Card>

            {/* Deployment Progress */}
            {deploymentStatus === "deploying" && (
              <Card className="p-8 mb-8 shadow-elevated">
                <div className="text-center mb-6">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Deploying Your Platform...</h3>
                  <p className="text-sm text-muted-foreground">Please wait while we set everything up</p>
                </div>
                <Progress value={progress} className="mb-4 h-2" />
                <p className="text-center text-sm font-medium text-foreground">{progress}% Complete</p>
              </Card>
            )}

            {/* Action Button */}
            <div className="space-y-4">
              {deploymentStatus === "idle" ? (
                <Button
                  size="lg"
                  className="w-full h-16 text-base gap-2"
                  onClick={handleStartDeployment}
                >
                  <Rocket className="w-5 h-5" />
                  Start Deployment
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-16 text-base gap-2"
                  onClick={handleCheckStatus}
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Check Status
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default Launch;
