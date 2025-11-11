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
  Search,
  ExternalLink,
  Copy,
  AlertCircle,
  CheckCircle
} from "lucide-react";

type DomainOption = "purchase" | "connect" | null;

const ConnectDomain = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<DomainOption>("purchase");
  const [searchTerm, setSearchTerm] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const mockDomains = [
    { name: `${searchTerm}.com`, price: 12.99, available: true },
    { name: `${searchTerm}.net`, price: 14.99, available: true },
    { name: `${searchTerm}.org`, price: 13.99, available: false },
    { name: `${searchTerm}.io`, price: 39.99, available: true },
    { name: `${searchTerm}.co`, price: 29.99, available: true }
  ];

  const handleSearch = () => {
    if (!searchTerm) {
      toast({
        title: "Enter a domain name",
        description: "Please enter a domain name to search",
        variant: "destructive"
      });
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handlePurchase = (domain: string, price: number) => {
    toast({
      title: "Domain added to cart",
      description: `${domain} ($${price}/year) will be registered for you`
    });
    setTimeout(() => {
      navigate("/onboarding/stripe-access");
    }, 1500);
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
    
    toast({
      title: "Verifying domain...",
      description: "This may take a few moments"
    });

    setTimeout(() => {
      toast({
        title: "Domain connected successfully! 🎉",
        description: "Your domain is now connected to your platform"
      });
      navigate("/onboarding/stripe-access");
    }, 2000);
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
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Connect Your Domain</h1>
          <p className="text-muted-foreground text-lg">
            Choose how patients will access your platform. Select the option that works best for your business.
          </p>
        </div>

        {/* Option Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Purchase New Domain */}
          <Card
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedOption === "purchase" 
                ? "ring-2 ring-primary shadow-lg" 
                : "hover:border-primary/50"
            }`}
            onClick={() => setSelectedOption("purchase")}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              {selectedOption === "purchase" && (
                <div className="p-1.5 bg-primary rounded-full">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">Purchase a New Domain</h3>
            <p className="text-sm text-muted-foreground">
              Don't have a domain? You can buy one from us.
            </p>
          </Card>

          {/* Connect Existing Domain */}
          <Card
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedOption === "connect" 
                ? "ring-2 ring-primary shadow-lg" 
                : "hover:border-primary/50"
            }`}
            onClick={() => setSelectedOption("connect")}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <ExternalLink className="h-6 w-6 text-primary" />
              </div>
              {selectedOption === "connect" && (
                <div className="p-1.5 bg-primary rounded-full">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect Existing Domain</h3>
            <p className="text-sm text-muted-foreground">
              Already have a domain? Connect it here.
            </p>
          </Card>
        </div>

        {/* Purchase New Domain Section */}
        {selectedOption === "purchase" && (
          <Card className="p-8 bg-card">
            <h2 className="text-2xl font-semibold mb-2">Purchase a New Domain</h2>
            <p className="text-muted-foreground mb-6">
              Find and register the perfect domain for your business
            </p>

            {/* Search Bar */}
            <div className="flex gap-3 mb-6">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="myclinic.com"
                className="text-lg"
              />
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                size="lg"
                className="px-8"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>

            {/* Available Domains */}
            {searchTerm && (
              <div>
                <h3 className="font-semibold mb-4">Available Domains</h3>
                <div className="space-y-3">
                  {mockDomains.map((domain) => (
                    <div
                      key={domain.name}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{domain.name}</p>
                          {!domain.available && (
                            <span className="text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded">
                              Unavailable
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          {domain.available ? `$${domain.price}/year` : "Not available"}
                        </span>
                        <Button
                          onClick={() => handlePurchase(domain.name, domain.price)}
                          disabled={!domain.available}
                          variant={domain.available ? "default" : "secondary"}
                        >
                          {domain.available ? "Purchase" : "Unavailable"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Connect Existing Domain Section */}
        {selectedOption === "connect" && (
          <Card className="p-8 bg-card">
            <div className="flex items-start gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Connect Existing Domain</h2>
                <p className="text-muted-foreground">
                  Configure your domain's DNS settings to point to our platform
                </p>
              </div>
            </div>

            {/* Domain Input */}
            <div className="mb-6">
              <Label htmlFor="customDomain" className="text-base font-medium mb-2">
                Enter your domain
              </Label>
              <Input
                id="customDomain"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="myclinic.com"
                className="text-lg"
              />
            </div>

            {/* DNS Configuration */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    DNS Configuration Required
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Add these DNS records in your domain provider's dashboard:
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* A Record 1 */}
                <div className="bg-background rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
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
                  <div className="flex items-center justify-between mb-2">
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

            {/* Verify Button */}
            <Button 
              onClick={handleVerifyDomain}
              className="w-full h-12 text-base"
              size="lg"
            >
              <Check className="mr-2 h-5 w-5" />
              Verify Domain
            </Button>
          </Card>
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
