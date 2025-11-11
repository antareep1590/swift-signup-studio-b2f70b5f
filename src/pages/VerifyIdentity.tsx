import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import OnboardingLayout from "@/components/OnboardingLayout";
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Lock,
  ExternalLink,
  Loader2,
  Camera,
  FileText,
  User,
  Globe,
  HelpCircle
} from "lucide-react";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Twitch
} from "lucide-react";
import { SiTiktok, SiDiscord, SiLinktree, SiThreads } from "react-icons/si";

type VerificationStatus = "not_started" | "in_progress" | "submitted" | "approved" | "needs_review" | "failed";

const SOCIAL_PLATFORMS = [
  { name: "twitter", label: "X/Twitter", icon: Twitter, placeholder: "https://x.com/yourusername" },
  { name: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/yourusername" },
  { name: "tiktok", label: "TikTok", icon: SiTiktok, placeholder: "https://tiktok.com/@yourusername" },
  { name: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@yourchannel" },
  { name: "twitch", label: "Twitch", icon: Twitch, placeholder: "https://twitch.tv/yourchannel" },
  { name: "facebook", label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/yourpage" },
  { name: "discord", label: "Discord", icon: SiDiscord, placeholder: "https://discord.gg/yourinvite" },
  { name: "threads", label: "Threads", icon: SiThreads, placeholder: "https://threads.net/@yourusername" },
  { name: "linktree", label: "Linktree/Website", icon: SiLinktree, placeholder: "https://linktr.ee/yourusername" }
];

export default function VerifyIdentity() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("not_started");
  const [consentGiven, setConsentGiven] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [socialErrors, setSocialErrors] = useState<Record<string, string>>({});

  // Form fields
  const [legalName, setLegalName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");

  const steps = [
    { id: 1, name: "Verify Identity", path: "/onboarding/verify-identity" },
    { id: 2, name: "Customize Branding", path: "/onboarding/basic-info" },
    { id: 3, name: "Preview", path: "/onboarding/preview" },
    { id: 4, name: "Payment", path: "/onboarding/payment" },
    { id: 5, name: "Connect Domain", path: "/onboarding/connect-domain" },
    { id: 6, name: "Stripe Access", path: "/onboarding/stripe-access" },
    { id: 7, name: "Launch", path: "/onboarding/launch" }
  ];

  const validateSocialUrl = (platform: string, url: string) => {
    if (!url) {
      setSocialErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
      return true;
    }

    try {
      new URL(url);
      setSocialErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
      return true;
    } catch {
      setSocialErrors(prev => ({
        ...prev,
        [platform]: "Please enter a valid URL"
      }));
      return false;
    }
  };

  const handleSocialChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));
  };

  const handleStartVerification = () => {
    if (!legalName || !dateOfBirth || !country) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!consentGiven) {
      toast({
        title: "Consent required",
        description: "Please consent to identity data processing",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setVerificationStatus("in_progress");

    // Simulate SDK initialization
    setTimeout(() => {
      setIsProcessing(false);
      setVerificationStatus("submitted");
      toast({
        title: "Verification submitted",
        description: "Your identity is being verified. This typically takes 2-3 minutes."
      });
    }, 2000);
  };

  const handleSkipForNow = () => {
    toast({
      title: "Verification skipped",
      description: "You can complete verification later. Some features will be locked until verified.",
    });
    navigate("/onboarding/basic-info");
  };

  const handleContinue = () => {
    if (verificationStatus !== "approved") {
      toast({
        title: "Verification required",
        description: "Please complete identity verification to continue to payment.",
        variant: "destructive"
      });
      return;
    }
    navigate("/onboarding/basic-info");
  };

  const getStatusDisplay = () => {
    switch (verificationStatus) {
      case "not_started":
        return {
          icon: ShieldCheck,
          color: "text-muted-foreground",
          bg: "bg-muted/50",
          text: "Not started",
          description: "Begin your identity verification"
        };
      case "in_progress":
        return {
          icon: Loader2,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
          text: "In progress",
          description: "Follow the prompts in the verification window",
          animate: true
        };
      case "submitted":
        return {
          icon: Clock,
          color: "text-amber-500",
          bg: "bg-amber-500/10",
          text: "Submitted",
          description: "Reviewing your documents (typically 2-3 minutes)"
        };
      case "approved":
        return {
          icon: CheckCircle2,
          color: "text-green-500",
          bg: "bg-green-500/10",
          text: "Approved",
          description: "Your identity has been verified successfully"
        };
      case "needs_review":
        return {
          icon: AlertCircle,
          color: "text-amber-500",
          bg: "bg-amber-500/10",
          text: "Needs review",
          description: "Manual review required. Expected within 24 hours."
        };
      case "failed":
        return {
          icon: XCircle,
          color: "text-destructive",
          bg: "bg-destructive/10",
          text: "Failed",
          description: "Verification failed. Please try again with clear photos."
        };
    }
  };

  const statusDisplay = getStatusDisplay();
  const StatusIcon = statusDisplay.icon;

  return (
    <OnboardingLayout currentStep={1} steps={steps}>
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            Verify identity to unlock payouts
          </h1>
          <p className="text-muted-foreground">
            Takes ~2–3 minutes. Verification helps prevent fraud and keeps the community safe.
          </p>
        </div>

        {/* Status Banner */}
        <Card className={`p-4 mb-8 ${statusDisplay.bg} border-2`}>
          <div className="flex items-center gap-3">
            <StatusIcon className={`h-6 w-6 ${statusDisplay.color} ${statusDisplay.animate ? 'animate-spin' : ''}`} />
            <div className="flex-1">
              <p className="font-semibold">{statusDisplay.text}</p>
              <p className="text-sm text-muted-foreground">{statusDisplay.description}</p>
            </div>
            {verificationStatus === "needs_review" && (
              <Button variant="outline" size="sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            )}
            {verificationStatus === "failed" && (
              <Button variant="outline" size="sm" onClick={() => setVerificationStatus("not_started")}>
                Try Again
              </Button>
            )}
          </div>
        </Card>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Verification Widget */}
          <div className="space-y-6">
            <Card className="p-6 bg-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Identity Verification</h2>
              </div>

              {verificationStatus === "not_started" || verificationStatus === "failed" ? (
                <div className="space-y-6">
                  {/* Legal Name */}
                  <div>
                    <Label htmlFor="legalName" className="text-base font-medium mb-2">
                      Legal Full Name *
                    </Label>
                    <Input
                      id="legalName"
                      value={legalName}
                      onChange={(e) => setLegalName(e.target.value)}
                      placeholder="John Doe"
                      autoFocus
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Must match your government-issued ID
                    </p>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <Label htmlFor="dateOfBirth" className="text-base font-medium mb-2">
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      You must be 18+ to use this platform
                    </p>
                  </div>

                  {/* Country */}
                  <div>
                    <Label htmlFor="country" className="text-base font-medium mb-2">
                      Country of Residence *
                    </Label>
                    <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="United States"
                    />
                  </div>

                  {/* Document Type Info */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-2">You'll need one of:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Passport
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Driver's License (front & back)
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        National ID Card
                      </li>
                    </ul>
                  </div>

                  {/* Tips */}
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Camera className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-2">Quick Tips:</p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Use a well-lit area</li>
                          <li>• Remove hats and glasses</li>
                          <li>• Center your face in the frame</li>
                          <li>• Ensure all document text is readable</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      checked={consentGiven}
                      onCheckedChange={(checked) => setConsentGiven(checked === true)}
                    />
                    <Label htmlFor="consent" className="text-sm cursor-pointer">
                      I consent to the processing of my identity data for verification purposes. 
                      By continuing, I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">Terms of Service</a>
                      {" "}and{" "}
                      <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </Label>
                  </div>

                  {/* Start Button */}
                  <Button 
                    onClick={handleStartVerification}
                    disabled={isProcessing || !consentGiven}
                    className="w-full h-12 text-base"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Initializing...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="mr-2 h-5 w-5" />
                        Start Verification
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {verificationStatus === "in_progress" ? (
                    <>
                      {/* Document Upload Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Step 1: Upload Document</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {/* Front of Document */}
                          <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:border-primary/60 transition-colors cursor-pointer bg-primary/5">
                            <input type="file" accept="image/*" className="hidden" id="doc-front" />
                            <label htmlFor="doc-front" className="cursor-pointer">
                              <FileText className="h-10 w-10 mx-auto mb-3 text-primary" />
                              <p className="font-medium text-sm mb-1">Front of Document</p>
                              <p className="text-xs text-muted-foreground">Click to upload or drag</p>
                            </label>
                          </div>
                          
                          {/* Back of Document */}
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
                            <input type="file" accept="image/*" className="hidden" id="doc-back" />
                            <label htmlFor="doc-back" className="cursor-pointer">
                              <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                              <p className="font-medium text-sm mb-1">Back of Document</p>
                              <p className="text-xs text-muted-foreground">Click to upload or drag</p>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Selfie Capture Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Camera className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Step 2: Capture Selfie</h3>
                        </div>
                        
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                          <div className="max-w-sm mx-auto">
                            <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="font-medium mb-2">Take a Selfie</p>
                            <p className="text-sm text-muted-foreground mb-4">
                              Center your face in the frame and follow the on-screen prompts
                            </p>
                            <Button size="lg" className="w-full">
                              <Camera className="h-5 w-5 mr-2" />
                              Start Camera
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Real-time Tips */}
                      <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium mb-1 text-blue-900 dark:text-blue-100">Active Verification</p>
                          <p className="text-blue-800 dark:text-blue-200">
                            Upload clear photos of your document (front and back if required), then take a selfie to complete verification.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Submitted/Approved States */
                    <div className="aspect-video bg-muted/30 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                      <div className="text-center p-6">
                        {(verificationStatus === "submitted" || verificationStatus === "needs_review") && (
                          <>
                            <Clock className="h-12 w-12 mx-auto mb-4 text-amber-500" />
                            <p className="font-medium">Verification Processing</p>
                            <p className="text-sm text-muted-foreground mt-2">
                              We're reviewing your submission
                            </p>
                          </>
                        )}
                        {verificationStatus === "approved" && (
                          <>
                            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                            <p className="font-medium text-green-500">Verification Complete!</p>
                            <p className="text-sm text-muted-foreground mt-2">
                              All features are now unlocked
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Test Mode Button (for demo purposes) */}
                  <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
                      <strong>Demo Mode:</strong> Simulate verification states
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" variant="outline" onClick={() => setVerificationStatus("approved")}>
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setVerificationStatus("needs_review")}>
                        Needs Review
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setVerificationStatus("failed")}>
                        Fail
                      </Button>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Lock className="h-5 w-5 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Your data is secure</p>
                      <p className="text-muted-foreground">
                        All verification data is encrypted and handled by our certified identity verification partner. 
                        We never store your documents.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right: Social Links */}
          <div className="space-y-6">
            <Card className="p-6 bg-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Connect Socials</h2>
                  <p className="text-sm text-muted-foreground">
                    Optional — they help validate your brand and appear on your profile
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {SOCIAL_PLATFORMS.map((platform) => {
                  const Icon = platform.icon;
                  const hasValue = socialLinks[platform.name]?.trim();
                  
                  return (
                    <div key={platform.name}>
                      <Label htmlFor={platform.name} className="text-sm font-medium mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {platform.label}
                        </span>
                        {hasValue && !socialErrors[platform.name] && (
                          <a 
                            href={socialLinks[platform.name]} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            Open <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </Label>
                      <Input
                        id={platform.name}
                        value={socialLinks[platform.name] || ""}
                        onChange={(e) => handleSocialChange(platform.name, e.target.value)}
                        onBlur={(e) => validateSocialUrl(platform.name, e.target.value)}
                        placeholder={platform.placeholder}
                        className={socialErrors[platform.name] ? "border-destructive" : ""}
                      />
                      {socialErrors[platform.name] && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {socialErrors[platform.name]}
                        </p>
                      )}
                      {hasValue && !socialErrors[platform.name] && (
                        <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Connected
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Later features note */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Coming soon:</strong> OAuth connect buttons and follower count display
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="ghost" 
            onClick={handleSkipForNow}
          >
            Skip for now
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Back
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={verificationStatus !== "approved"}
            >
              {verificationStatus === "approved" ? "Continue" : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Locked until verified
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
