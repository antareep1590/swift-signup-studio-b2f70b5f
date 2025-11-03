import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  User, 
  Palette, 
  Mail,
  Video,
  Sparkles,
  Check,
  Loader2
} from "lucide-react";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter,
  Twitch
} from "lucide-react";
import { SiTiktok, SiDiscord } from "react-icons/si";

const PLATFORM_CATEGORIES = [
  "Modeling",
  "Comedy",
  "Artist",
  "Non Profit",
  "Music",
  "Gaming",
  "Fitness",
  "Education",
  "Other"
];

const TONE_PRESETS = [
  { value: "casual", label: "Casual & Friendly" },
  { value: "peppy", label: "Peppy & Energetic" },
  { value: "professional", label: "Professional" },
  { value: "inspiring", label: "Inspiring" }
];

const SOCIAL_PLATFORMS = [
  { name: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/yourusername", pattern: /^https?:\/\/(www\.)?instagram\.com\/.+/ },
  { name: "facebook", label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/yourpage", pattern: /^https?:\/\/(www\.)?facebook\.com\/.+/ },
  { name: "tiktok", label: "TikTok", icon: SiTiktok, placeholder: "https://tiktok.com/@yourusername", pattern: /^https?:\/\/(www\.)?tiktok\.com\/.+/ },
  { name: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@yourchannel", pattern: /^https?:\/\/(www\.)?youtube\.com\/.+/ },
  { name: "twitter", label: "X (Twitter)", icon: Twitter, placeholder: "https://x.com/yourusername", pattern: /^https?:\/\/(www\.)?(x\.com|twitter\.com)\/.+/ },
  { name: "discord", label: "Discord", icon: SiDiscord, placeholder: "https://discord.gg/yourinvite", pattern: /^https?:\/\/(www\.)?discord\.(gg|com)\/.+/ },
  { name: "twitch", label: "Twitch", icon: Twitch, placeholder: "https://twitch.tv/yourchannel", pattern: /^https?:\/\/(www\.)?twitch\.tv\/.+/ }
];

const PRESET_COLORS = [
  "#FF6B9D", "#4ECDC4", "#95E1D3", "#F38181", "#AA96DA",
  "#FCBAD3", "#A8D8EA", "#FFCFDF", "#C7CEEA", "#FFD93D"
];

export default function BasicInfo() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [platformName, setPlatformName] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [customColor, setCustomColor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [socialErrors, setSocialErrors] = useState<Record<string, string>>({});
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [nameError, setNameError] = useState("");
  const [isCheckingName, setIsCheckingName] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (platformName || description || Object.keys(socialLinks).length > 0) {
        setLastSaved(new Date());
        // In real app, save to backend here
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [platformName, description, socialLinks, selectedColor, category]);

  const validatePlatformName = (name: string) => {
    if (!name) {
      setNameError("");
      return;
    }
    if (name.length < 2) {
      setNameError("Platform name must be at least 2 characters");
      return;
    }
    if (name.length > 30) {
      setNameError("Platform name must be less than 30 characters");
      return;
    }
    if (!/^[a-zA-Z0-9\s-]+$/.test(name)) {
      setNameError("Platform name can only contain letters, numbers, spaces, and hyphens");
      return;
    }
    
    setIsCheckingName(true);
    // Simulate uniqueness check
    setTimeout(() => {
      setIsCheckingName(false);
      setNameError("");
    }, 500);
  };

  const validateSocialUrl = (platform: string, url: string) => {
    if (!url) {
      setSocialErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
      return;
    }

    const platformData = SOCIAL_PLATFORMS.find(p => p.name === platform);
    if (platformData && !platformData.pattern.test(url)) {
      setSocialErrors(prev => ({
        ...prev,
        [platform]: `Please enter a valid ${platformData.label} URL`
      }));
    } else {
      setSocialErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
    }
  };

  const handleSocialChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Logo must be less than 5MB",
          variant: "destructive"
        });
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, GIF)",
          variant: "destructive"
        });
        return;
      }
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIDescription = async (tone: string) => {
    setIsGeneratingAI(true);
    // Simulate AI generation
    setTimeout(() => {
      const descriptions = {
        casual: "Hey there! Welcome to my platform where creativity meets community. Join me on this journey as we explore, create, and connect!",
        peppy: "🌟 Ready to dive into something AMAZING? This is YOUR space to shine, create, and be part of something extraordinary!",
        professional: "A professional platform dedicated to delivering high-quality content and fostering meaningful connections with our community.",
        inspiring: "Together, we're building more than a platform—we're creating a movement. Join us in making a difference, one connection at a time."
      };
      setDescription(descriptions[tone as keyof typeof descriptions] || descriptions.casual);
      setIsGeneratingAI(false);
      toast({
        title: "Description generated!",
        description: "Feel free to edit it to make it your own."
      });
    }, 1500);
  };

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
        <div className="flex items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {["Customize Branding", "Preview", "Payment", "Connect Domain", "Stripe Access", "Launch"].map((step, idx) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                idx === 0 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {idx + 1}
              </div>
              <span className="text-xs text-center max-w-[100px] hidden md:block">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Auto-save indicator */}
        {lastSaved && (
          <div className="flex items-center justify-end gap-2 mb-4 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-green-500" />
            Draft saved {lastSaved.toLocaleTimeString()}
          </div>
        )}

        {/* Welcome Video */}
        <Card className="p-6 mb-8 bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Welcome to Your Platform Setup!</h2>
              <p className="text-sm text-muted-foreground">Watch this quick guide to get started</p>
            </div>
          </div>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Welcome video placeholder</p>
            </div>
          </div>
        </Card>

        {/* Brand Identity Section */}
        <Card className="p-6 mb-8 bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Brand Identity</h2>
          </div>

          <div className="space-y-8">
            {/* Platform Name */}
            <div>
              <Label htmlFor="platformName" className="text-base font-medium mb-2 flex items-center gap-2">
                Platform Name
                {isCheckingName && <Loader2 className="h-4 w-4 animate-spin" />}
              </Label>
              <Input
                id="platformName"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                onBlur={(e) => validatePlatformName(e.target.value)}
                placeholder="Enter your platform name"
                className={nameError ? "border-destructive" : ""}
                autoFocus
              />
              {nameError ? (
                <p className="text-sm text-destructive mt-1">{nameError}</p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  This will be your public-facing brand name (2-30 characters, no special symbols)
                </p>
              )}
            </div>

            {/* Platform Category */}
            <div>
              <Label htmlFor="category" className="text-base font-medium mb-2">
                Platform Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select your platform category" />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORM_CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Selector */}
            <div>
              <Label className="text-base font-medium mb-3 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Brand Color
              </Label>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {PRESET_COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-lg transition-all ${
                        selectedColor === color 
                          ? "ring-2 ring-primary ring-offset-2" 
                          : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Label htmlFor="customColor" className="text-sm">Custom color:</Label>
                  <Input
                    id="customColor"
                    type="color"
                    value={customColor || selectedColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      setSelectedColor(e.target.value);
                    }}
                    className="w-20 h-10 cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground">{selectedColor}</span>
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <Label className="text-base font-medium mb-3 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Logo
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                {logoPreview ? (
                  <div className="space-y-4">
                    <img src={logoPreview} alt="Logo preview" className="max-h-32 mx-auto" />
                    <Button variant="outline" size="sm" onClick={() => {
                      setLogo(null);
                      setLogoPreview("");
                    }}>
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-2">Drop your logo here</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      or <label htmlFor="logo-upload" className="text-primary cursor-pointer hover:underline">browse</label> to choose a file
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports: JPG, PNG, GIF (Max 5MB)
                    </p>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Social Media Links */}
        <Card className="p-6 mb-8 bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Connect Your Social Media</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SOCIAL_PLATFORMS.map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.name}>
                  <Label htmlFor={platform.name} className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {platform.label}
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
                    <p className="text-sm text-destructive mt-1">{socialErrors[platform.name]}</p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Profile Description */}
        <Card className="p-6 mb-8 bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Profile Description</h2>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Write with AI:</span>
              {TONE_PRESETS.map(preset => (
                <Button
                  key={preset.value}
                  variant="outline"
                  size="sm"
                  onClick={() => generateAIDescription(preset.value)}
                  disabled={isGeneratingAI}
                >
                  {isGeneratingAI ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  {preset.label}
                </Button>
              ))}
            </div>

            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your platform and what makes it unique..."
              className="min-h-[120px] resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Tell your audience what makes your platform special
              </p>
              <span className="text-sm text-muted-foreground">{description.length}/500</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate("/auth")}>Back</Button>
          <Button 
            className="bg-primary hover:bg-primary/90"
            disabled={!!nameError || Object.keys(socialErrors).length > 0}
            onClick={() => navigate("/onboarding/preview")}
          >
            Save & Next
          </Button>
        </div>
      </div>
    </div>
  );
}
