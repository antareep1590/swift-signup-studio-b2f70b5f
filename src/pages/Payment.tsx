import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  CreditCard,
  Mail,
  Check,
  Zap,
  Palette,
  Smartphone,
  Lock,
  BarChart3,
  Users,
  MessageSquare,
  DollarSign,
  Building2,
  Shield,
  AlertCircle,
  ArrowRight
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    if (!cleaned) {
      setErrors(prev => ({ ...prev, cardNumber: "" }));
      return;
    }
    if (!/^\d+$/.test(cleaned)) {
      setErrors(prev => ({ ...prev, cardNumber: "Card number must contain only digits" }));
    } else if (cleaned.length < 16) {
      setErrors(prev => ({ ...prev, cardNumber: "Card number must be 16 digits" }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.cardNumber;
        return newErrors;
      });
    }
  };

  const validateExpiry = (value: string) => {
    if (!value) {
      setErrors(prev => ({ ...prev, expiry: "" }));
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(value)) {
      setErrors(prev => ({ ...prev, expiry: "Format must be MM/YY" }));
    } else {
      const [month, year] = value.split("/");
      const monthNum = parseInt(month);
      if (monthNum < 1 || monthNum > 12) {
        setErrors(prev => ({ ...prev, expiry: "Invalid month" }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.expiry;
          return newErrors;
        });
      }
    }
  };

  const validateCVV = (value: string) => {
    if (!value) {
      setErrors(prev => ({ ...prev, cvv: "" }));
      return;
    }
    if (!/^\d{3,4}$/.test(value)) {
      setErrors(prev => ({ ...prev, cvv: "CVV must be 3-4 digits" }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.cvv;
        return newErrors;
      });
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ").substring(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    validateCardNumber(cardNumber);
    validateExpiry(expiry);
    validateCVV(cvv);

    if (!nameOnCard) {
      setErrors(prev => ({ ...prev, nameOnCard: "Name on card is required" }));
      return;
    }

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Please fix the errors",
        description: "Check all fields and try again",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment successful! 🎉",
        description: "Welcome to VEWMEE! Setting up your platform..."
      });
      navigate("/onboarding/connect-domain");
    }, 2000);
  };

  const features = [
    { icon: Zap, text: "Instant Setup: Live in 5 minutes" },
    { icon: Palette, text: "Full Branding Control: Your colors, logo, identity" },
    { icon: CreditCard, text: "Built-in Payments: Stripe integration ready" },
    { icon: Smartphone, text: "Mobile Optimized: Perfect on all devices" },
    { icon: Lock, text: "Bank-level Security: SSL encryption & compliance" },
    { icon: BarChart3, text: "Analytics Dashboard: Track growth & revenue" },
    { icon: Users, text: "Subscriber Management: Easy fan/member handling" },
    { icon: MessageSquare, text: "Email Support: Response within 24 hours" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/placeholder.svg" alt="Logo" className="h-8" />
          </div>
          <Button variant="ghost" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {["Customize Branding", "Preview", "Payment", "Connect Domain", "Stripe Access", "Upload Documents", "Review Website", "Launch"].map((step, idx) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                idx < 2 
                  ? "bg-green-500 text-white" 
                  : idx === 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}>
                {idx < 2 ? <Check className="h-5 w-5" /> : idx + 1}
              </div>
              <span className="text-xs text-center max-w-[80px] hidden md:block">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Payment Form */}
          <div>
            <Card className="p-8 bg-card">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Pricing & Payment</h1>
                <p className="text-muted-foreground">Complete your payment to launch your platform</p>
              </div>

              {/* Payment Method Logos */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b">
                <span className="text-sm text-muted-foreground">We accept:</span>
                <div className="flex gap-3">
                  <div className="px-3 py-1 bg-muted rounded text-xs font-semibold">VISA</div>
                  <div className="px-3 py-1 bg-muted rounded text-xs font-semibold">MC</div>
                  <div className="px-3 py-1 bg-muted rounded text-xs font-semibold">AMEX</div>
                  <div className="px-3 py-1 bg-muted rounded text-xs font-semibold">DISCOVER</div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Number */}
                <div>
                  <Label htmlFor="cardNumber" className="text-base font-medium mb-2">
                    Card Number *
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      value={cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setCardNumber(formatted);
                      }}
                      onBlur={(e) => validateCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={errors.cardNumber ? "border-destructive pr-10" : ""}
                    />
                    {errors.cardNumber && (
                      <AlertCircle className="absolute right-3 top-3 h-5 w-5 text-destructive" />
                    )}
                  </div>
                  {errors.cardNumber && (
                    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                {/* Name on Card */}
                <div>
                  <Label htmlFor="nameOnCard" className="text-base font-medium mb-2">
                    Name on Card *
                  </Label>
                  <Input
                    id="nameOnCard"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        setErrors(prev => ({ ...prev, nameOnCard: "Name on card is required" }));
                      } else {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.nameOnCard;
                          return newErrors;
                        });
                      }
                    }}
                    placeholder="John Doe"
                    className={errors.nameOnCard ? "border-destructive" : ""}
                  />
                  {errors.nameOnCard && (
                    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.nameOnCard}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Date */}
                  <div>
                    <Label htmlFor="expiry" className="text-base font-medium mb-2">
                      Expiry Date *
                    </Label>
                    <Input
                      id="expiry"
                      value={expiry}
                      onChange={(e) => {
                        const formatted = formatExpiry(e.target.value);
                        setExpiry(formatted);
                      }}
                      onBlur={(e) => validateExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={errors.expiry ? "border-destructive" : ""}
                    />
                    {errors.expiry && (
                      <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.expiry}
                      </p>
                    )}
                  </div>

                  {/* CVV */}
                  <div>
                    <Label htmlFor="cvv" className="text-base font-medium mb-2">
                      CVV *
                    </Label>
                    <Input
                      id="cvv"
                      value={cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setCvv(value);
                      }}
                      onBlur={(e) => validateCVV(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      type="password"
                      className={errors.cvv ? "border-destructive" : ""}
                    />
                    {errors.cvv && (
                      <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Your payment is secure</p>
                    <p className="text-muted-foreground">We use bank-level SSL encryption to protect your data</p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      Complete Payment - $495 <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Right Column - Pricing Details */}
          <div>
            <Card className="p-8 bg-card sticky top-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Instant Access Plan</h2>
                <p className="text-muted-foreground">3 Months Subscription</p>
              </div>

              <div className="text-center mb-6 pb-6 border-b">
                <div className="text-5xl font-bold mb-2">
                  $495
                  <span className="text-lg font-normal text-muted-foreground ml-2">one-time</span>
                </div>
                <p className="text-sm text-muted-foreground">($165/month)</p>
              </div>

              <div className="mb-6 pb-6 border-b">
                <p className="text-sm text-muted-foreground mb-2">Your subscription covers 3 months starting from today (April 15, 2025)</p>
                <p className="text-sm font-medium">Access until: July 15, 2025</p>
              </div>

              {/* What You Get */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">What You Get:</h3>
                <ul className="space-y-3">
                  {features.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="p-1.5 bg-primary/10 rounded-lg mt-0.5">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Value Comparison */}
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-semibold mb-3">Compare Your Options:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground line-through">Building custom platform: $15,000+</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground line-through">Hiring developer: $5,000-10,000</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground line-through">Monthly SaaS tools: $200/mo = $2,400/year</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground line-through">OnlyFans/Instagram: 20% fees + restrictions</span>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 font-bold" />
                    <span className="font-semibold text-primary">VEWMEE: Starting at $165/mo ⚡</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-6xl">
          <Button variant="outline" onClick={() => navigate("/onboarding/preview")}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;