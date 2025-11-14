import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import OnboardingLayout from "@/components/OnboardingLayout";
import {
  Globe,
  Check,
  ExternalLink,
  Copy,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowRight,
  Shield,
  Zap
} from "lucide-react";

type Step = "initial" | "connect-form" | "setup-options" | "auto-setup" | "manual-setup";
type DomainProvider = "namecheap" | "others" | null;

const ConnectDomain = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>("initial");
  const [selectedProvider, setSelectedProvider] = useState<DomainProvider>(null);
  const [customDomain, setCustomDomain] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectDomain = () => {
    if (!customDomain || !selectedProvider) {
      toast({
        title: "Missing information",
        description: "Please select a provider and enter your domain",
        variant: "destructive"
      });
      return;
    }

    if (selectedProvider === "namecheap") {
      setCurrentStep("setup-options");
    } else {
      setCurrentStep("manual-setup");
    }
  };

  const handleAutoSetup = () => {
    setCurrentStep("auto-setup");
  };

  const handleManualSetup = () => {
    setCurrentStep("manual-setup");
  };

  const handleNamecheapConnect = () => {
    setIsConnecting(true);
    // Simulate OAuth/API connection
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Connected to Namecheap!",
        description: "Select a domain from your account"
      });
      // In real implementation, show domain dropdown here
    }, 2000);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({
      title: "Copied to clipboard!",
      description: `${field} has been copied`
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleVerifyDomain = () => {
    if (!customDomain) {
      toast({
        title: "Enter your domain",
        description: "Please enter the domain you want to connect",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    toast({
      title: "Verifying domain...",
      description: "Checking DNS records and SSL status"
    });

    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Domain connected successfully! 🎉",
        description: "Your domain is now connected to your platform"
      });
      setTimeout(() => {
        navigate("/onboarding/stripe-access");
      }, 1500);
    }, 3000);
  };

  const steps = [
    { id: 1, name: "Verify Identity", path: "/onboarding/verify-identity" },
    { id: 2, name: "Customize Branding", path: "/onboarding/basic-info" },
    { id: 3, name: "Preview", path: "/onboarding/preview" },
    { id: 4, name: "Payment", path: "/onboarding/payment" },
    { id: 5, name: "Connect Domain", path: "/onboarding/connect-domain" },
    { id: 6, name: "Stripe Access", path: "/onboarding/stripe-access" },
    { id: 7, name: "Launch", path: "/onboarding/launch" }
  ];

  return (
    <OnboardingLayout currentStep={5} steps={steps}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Connect Your Domain</h1>
          <p className="text-muted-foreground text-lg">
            Choose how patients will access your platform
          </p>
        </div>

        {/* Step 1: Initial Selection */}
        {currentStep === "initial" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Purchase New Domain */}
              <Card className="p-8 cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 border-2">
                <div className="text-center">
                  <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Purchase a New Domain</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Don't have a domain? You can buy one from us
                  </p>
                  <Button variant="outline" className="w-full">
                    Buy Domain
                  </Button>
                </div>
              </Card>

              {/* Connect Your Domain */}
              <Card className="p-8 cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 border-2">
                <div className="text-center">
                  <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <ExternalLink className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Connect Your Domain</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Already have a domain? Connect it here
                  </p>
                  <Button 
                    onClick={() => setCurrentStep("connect-form")} 
                    className="w-full"
                  >
                    Connect Domain
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Connect Form */}
        {currentStep === "connect-form" && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => {
                setCurrentStep("initial");
                setSelectedProvider(null);
                setCustomDomain("");
              }}
              className="mb-4"
            >
              ← Back
            </Button>

            <Card className="p-8 bg-card max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Connect Your Domain</h2>
              
              <div className="space-y-6">
                {/* Domain Provider Dropdown */}
                <div>
                  <Label htmlFor="provider" className="text-base font-medium mb-2">
                    Domain Provider
                  </Label>
                  <select
                    id="provider"
                    value={selectedProvider || ""}
                    onChange={(e) => setSelectedProvider(e.target.value as DomainProvider)}
                    className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground"
                  >
                    <option value="">Select your provider</option>
                    <option value="namecheap">Namecheap</option>
                    <option value="others">Others (GoDaddy, Cloudflare, etc.)</option>
                  </select>
                </div>

                {/* Domain Input */}
                <div>
                  <Label htmlFor="domain" className="text-base font-medium mb-2">
                    Enter Your Domain
                  </Label>
                  <Input
                    id="domain"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="myclinic.com"
                    className="text-lg h-12"
                  />
                </div>

                <Button 
                  onClick={handleConnectDomain}
                  disabled={!customDomain || !selectedProvider}
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Setup Options (Namecheap only) */}
        {currentStep === "setup-options" && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep("connect-form")}
              className="mb-4"
            >
              ← Back
            </Button>

            <Card className="p-8 bg-card max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-2">Choose Setup Method</h2>
              <p className="text-muted-foreground mb-6">
                How would you like to set up {customDomain}?
              </p>

              <div className="space-y-4">
                {/* Auto Setup */}
                <Card
                  className="p-6 cursor-pointer transition-all hover:shadow-lg border-2 border-primary bg-primary/5"
                  onClick={handleAutoSetup}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">Auto Setup</h3>
                          <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                            Recommended
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Connect in under 2 minutes with automatic DNS configuration
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  </div>
                </Card>

                {/* Manual Setup */}
                <Card
                  className="p-6 cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 border-2"
                  onClick={handleManualSetup}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <ExternalLink className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Manual Setup</h3>
                        <p className="text-sm text-muted-foreground">
                          Configure DNS yourself
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                  </div>
                </Card>
              </div>
            </Card>
          </div>
        )}

        {/* Step 4: Auto Setup */}
        {currentStep === "auto-setup" && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep("setup-options")}
              className="mb-4"
            >
              ← Back
            </Button>

            <Card className="p-8 bg-card">
              <div className="text-center max-w-xl mx-auto">
                <div className="p-4 bg-primary/10 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Globe className="h-10 w-10 text-primary" />
                </div>
                
                <h2 className="text-2xl font-semibold mb-3">Connect Namecheap Account</h2>
                <p className="text-muted-foreground mb-8">
                  Sign in to authorize DNS configuration. We'll automatically set up your domain.
                </p>

                {!isConnecting ? (
                  <Button
                    onClick={handleNamecheapConnect}
                    size="lg"
                    className="px-8"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Connect with Namecheap
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Connecting to Namecheap...</p>
                      <p className="text-sm text-muted-foreground">This may take a moment</p>
                    </div>
                  </div>
                )}

                <div className="mt-8 p-4 bg-muted/50 rounded-lg text-left">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="font-medium text-foreground">What happens next:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>You'll be redirected to Namecheap for secure authentication</li>
                        <li>We'll fetch your available domains</li>
                        <li>Select your domain and we'll configure DNS automatically</li>
                        <li>DNS changes may take 24-48 hours to fully propagate</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  onClick={handleManualSetup}
                  className="mt-6"
                >
                  Use manual setup instead
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 5: Manual Setup */}
        {currentStep === "manual-setup" && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => {
                if (selectedProvider === "namecheap") {
                  setCurrentStep("setup-options");
                } else {
                  setCurrentStep("connect-form");
                }
              }}
              className="mb-4"
            >
              ← Back
            </Button>

            <Card className="p-8 bg-card max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-2">Manual DNS Setup</h2>
              <p className="text-muted-foreground mb-2">
                Configure DNS for <strong>{customDomain}</strong>
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Add these DNS records in your {selectedProvider === "namecheap" ? "Namecheap" : "domain provider's"} dashboard
              </p>

              {/* DNS Configuration */}
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      DNS Configuration Required
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Add these DNS records in your domain provider's dashboard:
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* A Record 1 */}
                  <div className="bg-background rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                          A
                        </span>
                        <span className="text-sm font-mono">@ → 185.158.133.1</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard("185.158.133.1", "A Record (@)")}
                      >
                        {copiedField === "A Record (@)" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* A Record 2 */}
                  <div className="bg-background rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                          A
                        </span>
                        <span className="text-sm font-mono">www → 185.158.133.1</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard("185.158.133.1", "A Record (www)")}
                      >
                        {copiedField === "A Record (www)" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 text-xs text-blue-700 dark:text-blue-300">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>
                    DNS changes may take up to 24-48 hours to propagate globally. 
                    You'll receive an email confirmation once your domain is verified.
                  </p>
                </div>
              </div>

              {/* Quick Links for Popular Providers */}
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Popular provider guides:</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="link" className="h-auto p-0 text-xs" asChild>
                    <a href="https://www.godaddy.com/help/add-an-a-record-19238" target="_blank" rel="noopener noreferrer">
                      GoDaddy <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                  <span className="text-muted-foreground">•</span>
                  <Button variant="link" className="h-auto p-0 text-xs" asChild>
                    <a href="https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/" target="_blank" rel="noopener noreferrer">
                      Cloudflare <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                  <span className="text-muted-foreground">•</span>
                  <Button variant="link" className="h-auto p-0 text-xs" asChild>
                    <a href="https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain/" target="_blank" rel="noopener noreferrer">
                      Namecheap <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Verify Button */}
              <Button 
                onClick={handleVerifyDomain}
                disabled={isVerifying || !customDomain}
                className="w-full h-12 text-base"
                size="lg"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying Domain...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Verify Domain
                  </>
                )}
              </Button>

              {isVerifying && (
                <div className="mt-4 space-y-2 text-center">
                  <p className="text-sm font-medium">Checking DNS records...</p>
                  <p className="text-sm text-muted-foreground">Looking for A records</p>
                  <p className="text-sm text-muted-foreground">Verifying SSL provisioning</p>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={() => navigate("/onboarding/payment")}>
            Back
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/onboarding/stripe-access")}
          >
            Skip for now
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ConnectDomain;
