import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Check, Rocket, Loader2, ExternalLink, Star, Globe, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import OnboardingLayout from "@/components/OnboardingLayout";

const Launch = () => {
  const { toast } = useToast();
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "completed">("idle");
  const [progress, setProgress] = useState(0);

  const steps = [
    { id: 1, name: "Verify Identity", path: "/onboarding/verify-identity" },
    { id: 2, name: "Customize Branding", path: "/onboarding/basic-info" },
    { id: 3, name: "Preview", path: "/onboarding/preview" },
    { id: 4, name: "Payment", path: "/onboarding/payment" },
    { id: 5, name: "Connect Domain", path: "/onboarding/connect-domain" },
    { id: 6, name: "Stripe Access", path: "/onboarding/stripe-access" },
    { id: 7, name: "Launch", path: "/onboarding/launch" }
  ];

  const brandInfo = {
    businessName: "VEWMEE",
    businessType: "Digital Content Creator",
    platformFocus: "Exclusive Content & Community",
    selectedTemplate: "Premium Creator",
    brandColor: "#3882F6",
    fontFamily: "Inter",
    domain: "your-business.hyrhealth.com",
    merchantPortal: "admin.your-business.hyrhealth.com",
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
    <OnboardingLayout currentStep={7} steps={steps}>
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-4">
            <Rocket className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-foreground">Ready to Launch!</h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Your branded telehealth platform is configured and ready to go live. Review your setup and launch when you're ready.
          </p>
        </div>

        {deploymentStatus === "deploying" && (
          <Card className="p-8 mb-8">
            <div className="text-center mb-6">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Deploying Your Platform...</h3>
              <p className="text-sm text-muted-foreground">Please wait while we set everything up</p>
            </div>
            <Progress value={progress} className="mb-4 h-2" />
            <p className="text-center text-sm font-medium text-foreground">{progress}% Complete</p>
          </Card>
        )}

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Platform Summary */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Star className="h-5 w-5 text-amber-500" />
              </div>
              <h2 className="text-lg font-semibold">Platform Summary</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Business Name</p>
                  <p className="font-medium text-sm">{brandInfo.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Business Type</p>
                  <p className="font-medium text-sm">{brandInfo.businessType}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Platform Focus</p>
                <p className="font-medium text-sm">{brandInfo.platformFocus}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Selected Template</p>
                <p className="font-medium text-sm">{brandInfo.selectedTemplate}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Brand Color</p>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded border border-border" 
                      style={{ backgroundColor: brandInfo.brandColor }}
                    />
                    <span className="font-medium text-sm">{brandInfo.brandColor}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Font Family</p>
                  <p className="font-medium text-sm">{brandInfo.fontFamily}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Access */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Globe className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold">Platform Access</h2>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Influencer Platform */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Influencer Platform URL</p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(`https://influencer.tf.com`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit
                  </Button>
                </div>
                <div className="bg-muted/50 px-4 py-3 rounded-lg border border-border">
                  <p className="text-sm font-mono text-foreground">influencer.tf.com</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Where influencers will access your platform
                  </p>
                </div>
              </div>

              {/* Subscriber Platform */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Subscriber Platform URL</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white border-green-500"
                    onClick={() => window.open(`https://fan.tf.com`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Access
                  </Button>
                </div>
                <div className="bg-green-500/10 px-4 py-3 rounded-lg border border-green-500/30">
                  <p className="text-sm font-mono text-foreground">fan.tf.com</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Manage your platform and subscribers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Setup Complete */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="text-lg font-semibold">Setup Complete</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Platform configured and branded",
                "Domain setup completed",
                "Legal documents in place",
                "Payment processing ready",
                "SSL certificate installed",
                "HIPAA compliance enabled"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* Launch Button */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 border-0 text-white max-w-2xl mx-auto">
          <CardContent className="p-6 text-center">
            {deploymentStatus === "idle" ? (
              <>
                <h3 className="text-xl font-bold mb-2">Ready to Go Live?</h3>
                <p className="text-sm text-white/90 mb-6">
                  Your platform will be live in 2-3 minutes
                </p>
                <Button
                  size="lg"
                  onClick={handleStartDeployment}
                  className="bg-white text-green-600 hover:bg-gray-100 h-14 px-8 text-base font-semibold"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Launch My Platform
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={handleCheckStatus}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Check Status
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </OnboardingLayout>
  );
};

export default Launch;
