import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Rocket, Star, Globe, Users, Settings, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OnboardingLayout from "@/components/OnboardingLayout";

const Launch = () => {
  const { toast } = useToast();

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

  const handleLaunch = () => {
    toast({
      title: "Platform Launching...",
      description: "Your platform will be live within 2-3 minutes",
    });
  };

  return (
    <OnboardingLayout currentStep={6} steps={steps}>
      <div className="max-w-6xl mx-auto px-6 py-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
            <Rocket className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-foreground">
            Ready to Launch!
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Your branded telehealth platform is configured and ready to go live. Review your setup and launch when you're ready.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Platform Summary Card */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Star className="w-5 h-5 text-primary" />
                Platform Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Business Name</p>
                  <p className="text-sm font-medium text-foreground">-</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Business Type</p>
                  <p className="text-sm font-medium text-foreground">-</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Platform Focus</p>
                <p className="text-sm font-medium text-foreground">-</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Selected Template</p>
                <p className="text-sm font-medium text-foreground">-</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Brand Color</p>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary border border-border" />
                    <p className="text-sm font-medium text-foreground">#3882F6</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Font Family</p>
                  <p className="text-sm font-medium text-foreground">Inter</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Access Card */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Globe className="w-5 h-5 text-primary" />
                Platform Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Customer Portal URL</p>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">your-business.hyrhealth.com</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Where patients will access your platform</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Visit
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Merchant Portal URL</p>
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
                  <div>
                    <p className="text-sm font-medium text-success">admin.your-business.hyrhealth.com</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Manage your platform and patients</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs text-success hover:text-success">
                    <Settings className="w-3 h-3 mr-1" />
                    Access
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Setup Complete Card */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Check className="w-5 h-5 text-success" />
                Setup Complete
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {[
                  "Platform configured and branded",
                  "Domain setup completed",
                  "Legal documents in place",
                  "Payment processing ready",
                  "SSL certificate installed",
                  "HIPAA compliance enabled"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Next Steps Card */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Users className="w-5 h-5 text-primary" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  { number: "1", title: "Complete your admin profile", desc: "Add your professional credentials and bio" },
                  { number: "2", title: "Set up your services", desc: "Configure consultation types and pricing" },
                  { number: "3", title: "Test your platform", desc: "Make a test booking to ensure everything works" },
                  { number: "4", title: "Start accepting patients", desc: "Share your platform URL and begin consultations" }
                ].map((step) => (
                  <li key={step.number} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{step.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Launch Button */}
        <div className="max-w-2xl mx-auto">
          <Button
            size="lg"
            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-success to-primary hover:opacity-90 transition-opacity"
            onClick={handleLaunch}
          >
            <Rocket className="w-5 h-5 mr-2" />
            Launch My Platform
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Your platform will be live within 2-3 minutes
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Launch;
