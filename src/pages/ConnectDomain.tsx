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
  Zap,
  Search,
  CreditCard,
  Clock,
  Lock
} from "lucide-react";

type Step = 
  | "initial" 
  | "connect-form" 
  | "setup-options" 
  | "auto-setup" 
  | "manual-setup"
  | "search-domain"
  | "payment"
  | "purchase-success";

type DomainProvider = "namecheap" | "others" | null;

interface DomainResult {
  domain: string;
  available: boolean;
  price: number;
  renewalPrice: number;
}

const ConnectDomain = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>("initial");
  const [selectedProvider, setSelectedProvider] = useState<DomainProvider>(null);
  const [customDomain, setCustomDomain] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Purchase domain states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [domainResults, setDomainResults] = useState<DomainResult[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<DomainResult | null>(null);
  const [purchasedDomain, setPurchasedDomain] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Card details state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

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
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Connected to Namecheap!",
        description: "Select a domain from your account"
      });
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

  // Purchase domain handlers
  const handleSearchDomain = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter a domain",
        description: "Please enter a domain name to search",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate domain search
    setTimeout(() => {
      const baseDomain = searchQuery.replace(/\.(com|net|org|io|co)$/i, "").trim();
      const results: DomainResult[] = [
        { domain: `${baseDomain}.com`, available: Math.random() > 0.3, price: 12.99, renewalPrice: 15.99 },
        { domain: `${baseDomain}.net`, available: true, price: 11.99, renewalPrice: 14.99 },
        { domain: `${baseDomain}.org`, available: true, price: 10.99, renewalPrice: 13.99 },
        { domain: `${baseDomain}.io`, available: true, price: 39.99, renewalPrice: 49.99 },
        { domain: `${baseDomain}.co`, available: Math.random() > 0.5, price: 24.99, renewalPrice: 29.99 },
      ];
      setDomainResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const handleSelectDomain = (domain: DomainResult) => {
    setSelectedDomain(domain);
    setCurrentStep("payment");
  };

  const handlePurchaseDomain = () => {
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardholderName) {
      toast({
        title: "Missing card details",
        description: "Please fill in all card details",
        variant: "destructive"
      });
      return;
    }

    setIsProcessingPayment(true);
    
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPurchasedDomain(selectedDomain?.domain || "");
      setCurrentStep("purchase-success");
      toast({
        title: "Domain purchased successfully! 🎉",
        description: `${selectedDomain?.domain} is now yours`
      });
    }, 2500);
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
                  <Button 
                    onClick={() => setCurrentStep("search-domain")}
                    variant="outline" 
                    className="w-full"
                  >
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

        {/* Search Domain Step */}
        {currentStep === "search-domain" && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => {
                setCurrentStep("initial");
                setSearchQuery("");
                setDomainResults([]);
                setSelectedDomain(null);
              }}
              className="mb-4"
            >
              ← Back
            </Button>

            <Card className="p-8 bg-card max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-2">Find Your Perfect Domain</h2>
              <p className="text-muted-foreground mb-6">
                Search for available domain names
              </p>

              {/* Search Input */}
              <div className="flex gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter domain name (e.g., myclinic)"
                    className="pl-10 h-12 text-lg"
                    onKeyDown={(e) => e.key === "Enter" && handleSearchDomain()}
                  />
                </div>
                <Button 
                  onClick={handleSearchDomain}
                  disabled={isSearching}
                  className="h-12 px-6"
                >
                  {isSearching ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>

              {/* Search Results */}
              {isSearching && (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-3" />
                  <p className="text-muted-foreground">Searching available domains...</p>
                </div>
              )}

              {!isSearching && domainResults.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground mb-4">
                    {domainResults.filter(d => d.available).length} domains available
                  </p>
                  
                  {domainResults.map((result) => (
                    <div
                      key={result.domain}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        result.available 
                          ? "bg-background hover:border-primary/50 cursor-pointer" 
                          : "bg-muted/50 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {result.available ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-semibold text-lg">{result.domain}</p>
                            {result.available && (
                              <p className="text-xs text-muted-foreground">
                                Renews at ${result.renewalPrice}/year
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {result.available ? (
                            <>
                              <div className="text-right">
                                <p className="font-bold text-lg text-primary">${result.price}</p>
                                <p className="text-xs text-muted-foreground">/first year</p>
                              </div>
                              <Button 
                                size="sm"
                                onClick={() => handleSelectDomain(result)}
                              >
                                Purchase
                              </Button>
                            </>
                          ) : (
                            <span className="text-sm text-muted-foreground">Unavailable</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isSearching && domainResults.length === 0 && searchQuery && (
                <div className="text-center py-8 text-muted-foreground">
                  <Globe className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter a domain name and click Search to find available domains</p>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Payment Step */}
        {currentStep === "payment" && selectedDomain && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep("search-domain")}
              className="mb-4"
            >
              ← Back
            </Button>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Order Summary */}
              <Card className="p-6 bg-card h-fit">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">{selectedDomain.domain}</p>
                        <p className="text-sm text-muted-foreground">1 year registration</p>
                      </div>
                    </div>
                    <p className="font-bold">${selectedDomain.price}</p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${selectedDomain.price}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">DNS Setup</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">SSL Certificate</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">${selectedDomain.price}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/5 rounded-lg text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Renews at ${selectedDomain.renewalPrice}/year
                    </p>
                  </div>
                </div>
              </Card>

              {/* Payment Form */}
              <Card className="p-6 bg-card">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Payment Details</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardholderName" className="text-sm font-medium">
                      Cardholder Name
                    </Label>
                    <Input
                      id="cardholderName"
                      value={cardDetails.cardholderName}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber" className="text-sm font-medium">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="text-sm font-medium">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                        placeholder="MM/YY"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-sm font-medium">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        placeholder="123"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handlePurchaseDomain}
                    disabled={isProcessingPayment}
                    className="w-full h-12 text-base mt-4"
                    size="lg"
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-5 w-5" />
                        Pay ${selectedDomain.price}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                    <Lock className="h-3 w-3" />
                    Secured with 256-bit SSL encryption
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Purchase Success Step */}
        {currentStep === "purchase-success" && (
          <div className="space-y-6">
            <Card className="p-8 bg-primary/5 border-primary/20 max-w-2xl mx-auto">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Your domain purchase was successful</h3>
                    <p className="text-primary font-medium">{purchasedDomain}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Propagation in progress</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">DNS setup is in progress. This may take a few hours.</span>
              </div>

              {/* URL Cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-background border rounded-lg opacity-70">
                  <p className="text-sm text-muted-foreground mb-1">Customer facing website</p>
                  <p className="font-mono text-sm text-muted-foreground">https://{purchasedDomain}</p>
                </div>
                <div className="p-4 bg-background border rounded-lg opacity-70">
                  <p className="text-sm text-muted-foreground mb-1">Admin Portal</p>
                  <p className="font-mono text-sm text-muted-foreground">https://{purchasedDomain}/admin</p>
                </div>
              </div>

              {/* Info Message */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300 text-center font-medium">
                  Your URLs will become active once you complete all the remaining steps and launch your platform successfully.
                </p>
              </div>
            </Card>

            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>You'll also receive an email once your platform is live.</span>
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
          {currentStep === "purchase-success" ? (
            <Button onClick={() => navigate("/onboarding/stripe-access")}>
              Continue
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              onClick={() => navigate("/onboarding/stripe-access")}
            >
              Skip for now
            </Button>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ConnectDomain;
