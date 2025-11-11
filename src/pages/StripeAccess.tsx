import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Copy, ExternalLink, PlayCircle, CreditCard, TrendingUp, Shield, PieChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OnboardingLayout from "@/components/OnboardingLayout";

const StripeAccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const accessEmail = "your-access-email@example.com";

  const steps = [
    { id: 1, name: "Verify Identity", path: "/onboarding/verify-identity" },
    { id: 2, name: "Customize Branding", path: "/onboarding/basic-info" },
    { id: 3, name: "Preview", path: "/onboarding/preview" },
    { id: 4, name: "Payment", path: "/onboarding/payment" },
    { id: 5, name: "Connect Domain", path: "/onboarding/connect-domain" },
    { id: 6, name: "Stripe Access", path: "/onboarding/stripe-access" },
    { id: 7, name: "Launch", path: "/onboarding/launch" }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessEmail);
    setCopied(true);
    toast({
      title: "Email Copied!",
      description: "Access email copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContinue = () => {
    navigate("/onboarding/launch");
  };

  return (
    <OnboardingLayout currentStep={6} steps={steps}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Connect Your Stripe Account</h1>
          <p className="text-muted-foreground text-lg">
            To proceed, please add us as a team member on your Stripe account using the email below. This
            will allow us to securely access the necessary data to complete your setup.
          </p>
        </div>

        {/* Why Connect Stripe */}
        <Card className="p-8 mb-8 bg-primary/5 border-primary/20">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" />
            💳 Why Connect Stripe?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-lg">We Need This To:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Verify your business details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Process & transfer subscriber payments to you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Handle refunds and chargebacks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>You always own your Stripe account & data</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
                Your Benefits:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-primary">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Keep all earnings (minus our platform fee)</span>
                </li>
                <li className="flex items-start gap-2 text-primary">
                  <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Payouts to your bank account</span>
                </li>
                <li className="flex items-start gap-2 text-primary">
                  <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Full payment records on Stripe dashboard</span>
                </li>
                <li className="flex items-start gap-2 text-primary">
                  <PieChart className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Access to Stripe analytics & reports</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Step-by-step:</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <p className="text-foreground">Click the button below to open your Stripe dashboard.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <p className="text-foreground">Go to Settings &gt; Team.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <p className="text-foreground">
                  Click "New member", paste the email below, and assign the appropriate role (e.g.,
                  Developer or Analyst).
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <p className="text-foreground">Click Invite.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Access Email */}
        <Card className="p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Access Email:</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-muted px-4 py-3 rounded-lg font-mono text-sm">
              {accessEmail}
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full text-lg h-14"
            onClick={() => window.open("https://dashboard.stripe.com", "_blank")}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Open Stripe Dashboard
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full text-lg h-14"
            onClick={() => window.open("https://www.youtube.com/watch?v=example", "_blank")}
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            Watch Tutorial Video
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="w-full text-lg h-14 mt-8"
            onClick={handleContinue}
          >
            Continue to Launch
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default StripeAccess;
