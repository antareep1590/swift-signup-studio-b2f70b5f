import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Rocket, Loader2, ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Launch = () => {
  const { toast } = useToast();
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "completed">("idle");
  const [progress, setProgress] = useState(0);

  const steps = [
    { id: 1, name: "Basic Info", path: "/onboarding/basic-info" },
    { id: 2, name: "Preview", path: "/onboarding/preview" },
    { id: 3, name: "Payment", path: "/onboarding/payment" },
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-primary">VEWMEE</div>
              <div className="text-xs text-muted-foreground">MONETIZE YOUR BRAND</div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="border-b bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {index > 0 && (
                    <div className={`flex-1 h-0.5 ${index <= 5 ? "bg-primary" : "bg-muted"}`} />
                  )}
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-medium text-sm mx-2 ${
                      index < 6
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < 6 ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 ${index < 5 ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
                <div className="text-xs mt-2 text-center font-medium">{step.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {deploymentStatus === "completed" ? (
          <>
            {/* Success State */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Rocket className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                🎉 Platform Launched!
              </h1>
              <p className="text-muted-foreground text-xl">
                Your platform is now live and ready to welcome subscribers!
              </p>
            </div>

            {/* Brand Info */}
            <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h2 className="text-2xl font-semibold mb-6 text-center">Your Platform Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground font-medium">Brand Name:</span>
                  <span className="font-semibold text-lg">{brandInfo.brandName}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground font-medium">Custom Domain:</span>
                  <span className="font-semibold text-lg">{brandInfo.domain}</span>
                </div>
              </div>
            </Card>

            {/* Platform URLs */}
            <Card className="p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Platform URLs</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Website</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-primary/5 px-4 py-3 rounded-lg border border-primary/20">
                      <a
                        href={`https://${brandInfo.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
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
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Fan App</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-primary/5 px-4 py-3 rounded-lg border border-primary/20">
                      <a
                        href={`https://${brandInfo.fanAppUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
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
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>Username: test@gmail.com</p>
                    <p>Password: Qwerty@123</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Creator App</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-primary/5 px-4 py-3 rounded-lg border border-primary/20">
                      <a
                        href={`https://${brandInfo.creatorAppUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
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
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>Username: test@gmail.com</p>
                    <p>Password: Qwerty@123</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Feedback Section */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4 text-center">Share Your Feedback</h3>
              <textarea
                placeholder="Please share your feedback here..."
                className="w-full h-32 px-4 py-3 rounded-lg border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button className="w-full mt-4" size="lg">
                Submit Feedback
              </Button>
            </Card>
          </>
        ) : (
          <>
            {/* Pre-deployment State */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Rocket className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl font-bold mb-4">🚀 You're Almost There!</h1>
              <p className="text-muted-foreground text-xl mb-2">
                Your platform is configured and ready to launch
              </p>
              <p className="text-muted-foreground text-lg">
                Let's activate it and go live to the world!
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span>⏱️ Estimated time: 2-5 minutes</span>
              </div>
            </div>

            {/* Brand Info Preview */}
            <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h2 className="text-2xl font-semibold mb-6 text-center">Your Platform Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground font-medium">Brand Name:</span>
                  <span className="font-semibold text-lg">{brandInfo.brandName}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground font-medium">Custom Domain:</span>
                  <span className="font-semibold text-lg">{brandInfo.domain}</span>
                </div>
              </div>
            </Card>

            {/* Deployment Progress */}
            {deploymentStatus === "deploying" && (
              <Card className="p-8 mb-8">
                <div className="text-center mb-6">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Deploying Your Platform...</h3>
                  <p className="text-muted-foreground">Please wait while we set everything up</p>
                </div>
                <Progress value={progress} className="mb-4" />
                <p className="text-center text-sm text-muted-foreground">{progress}% Complete</p>
              </Card>
            )}

            {/* Action Button */}
            <div className="space-y-4">
              {deploymentStatus === "idle" ? (
                <Button
                  size="lg"
                  className="w-full text-lg h-16 text-white"
                  onClick={handleStartDeployment}
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Deployment
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full text-lg h-16"
                  onClick={handleCheckStatus}
                >
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Check Status
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Launch;
