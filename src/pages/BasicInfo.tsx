import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import OnboardingLayout from "@/components/OnboardingLayout";
import {
  Upload,
  User,
  Palette,
  Video,
  Sparkles,
  Check,
  Loader2,
  Lightbulb,
  Target,
  Calendar,
  MessageSquare,
  RefreshCw
} from "lucide-react";

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

const EMOTION_CONTROLS = [
  { id: "casual", label: "Casual", icon: "😊" },
  { id: "flirty", label: "Flirty", icon: "😘" },
  { id: "fun", label: "Fun", icon: "🎉" },
  { id: "serious", label: "Serious", icon: "😐" },
  { id: "angry", label: "Angry", icon: "😠" },
  { id: "happy", label: "Happy", icon: "😄" }
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
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [nameError, setNameError] = useState("");
  const [isCheckingName, setIsCheckingName] = useState(false);
  const [emotionValues, setEmotionValues] = useState<Record<string, number>>({
    casual: 50,
    flirty: 0,
    fun: 50,
    serious: 0,
    angry: 0,
    happy: 50
  });

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (platformName || description) {
        setLastSaved(new Date());
        // In real app, save to backend here
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [platformName, description, selectedColor, category]);

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

  const generateAIDescription = async () => {
    setIsGeneratingAI(true);
    // Simulate AI generation based on emotion controls
    setTimeout(() => {
      const activeEmotions = Object.entries(emotionValues)
        .filter(([_, value]) => value > 0)
        .sort(([_, a], [__, b]) => b - a);
      
      let generatedText = "Welcome to my platform! ";
      
      if (activeEmotions[0]?.[0] === "casual" || activeEmotions[0]?.[0] === "fun") {
        generatedText += "Join me on this exciting journey where creativity meets community. Let's explore, create, and connect together!";
      } else if (activeEmotions[0]?.[0] === "happy") {
        generatedText += "I'm thrilled to share my passion with you! This is a space for positivity, growth, and amazing experiences.";
      } else if (activeEmotions[0]?.[0] === "serious") {
        generatedText += "A professional platform dedicated to delivering high-quality content and fostering meaningful connections.";
      } else {
        generatedText += "Discover exclusive content, behind-the-scenes moments, and join a vibrant community of like-minded individuals!";
      }
      
      setDescription(generatedText);
      setIsGeneratingAI(false);
      toast({
        title: "Description generated!",
        description: "Feel free to edit it to make it your own."
      });
    }, 1500);
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
    <OnboardingLayout currentStep={2} steps={steps}>
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-6xl">
        {/* Auto-save indicator */}
        {lastSaved && (
          <div className="flex items-center justify-end gap-2 mb-4 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-green-500" />
            Draft saved {lastSaved.toLocaleTimeString()}
          </div>
        )}

        {/* Welcome Video */}
        <div className="mb-8">
          <Card className="p-6 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Welcome to Your Platform Setup!</h2>
                <p className="text-sm text-muted-foreground">Watch this quick guide to get started</p>
              </div>
            </div>
            <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Welcome video placeholder</p>
              </div>
            </div>
          </Card>
        </div>

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

        {/* Profile Description */}
        <Card className="p-6 mb-6 bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Profile Description</h2>
          </div>

          <div className="space-y-6">
            {/* Textarea */}
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-[120px] resize-none"
              maxLength={500}
            />
            <div className="flex justify-end">
              <span className="text-sm text-muted-foreground">{description.length}/500</span>
            </div>

            {/* Emotion Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-pink-500 text-white px-4 py-2 rounded-lg">
                <span className="font-medium">Emotion Controls</span>
                <span className="text-sm">({Object.values(emotionValues).filter(v => v > 0).length} active)</span>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {EMOTION_CONTROLS.map((emotion) => (
                  <div key={emotion.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{emotion.icon}</span>
                        <Label className="font-medium">{emotion.label}</Label>
                      </div>
                      <span className="text-sm text-muted-foreground">{emotionValues[emotion.id]}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={emotionValues[emotion.id]}
                      onChange={(e) => setEmotionValues(prev => ({
                        ...prev,
                        [emotion.id]: parseInt(e.target.value)
                      }))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${emotionValues[emotion.id]}%, hsl(var(--muted)) ${emotionValues[emotion.id]}%, hsl(var(--muted)) 100%)`
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateAIDescription}
              disabled={isGeneratingAI}
              className="w-full bg-pink-400 hover:bg-pink-500 text-white"
              size="lg"
            >
              {isGeneratingAI ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <Sparkles className="h-5 w-5 mr-2" />
              )}
              Generate with AI
            </Button>

            {/* Tip */}
            <p className="text-sm text-center text-muted-foreground">
              Tip: Adjust emotion controls to change the tone of your content
            </p>
          </div>
        </Card>

        {/* Pro Tips */}
        <Card className="p-6 mb-8 bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Pro tips for better results</h2>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <span className="font-medium">Lead with outcomes:</span> Tell fans what they'll get (e.g., "weekly behind-the-scenes + early drops").
              </p>
            </div>
            <div className="flex gap-3">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <span className="font-medium">Add specifics:</span> Mention format or cadence ("2 live sessions/month").
              </p>
            </div>
            <div className="flex gap-3">
              <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <span className="font-medium">Match your tone to your niche:</span> Casual/Fun for lifestyle; Serious/Casual for education.
              </p>
            </div>
            <div className="flex gap-3">
              <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <span className="font-medium">Keep it short:</span> 1–2 short paragraphs convert best.
              </p>
            </div>
            <div className="flex gap-3">
              <RefreshCw className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <span className="font-medium">Iterate:</span> Tweak sliders and regenerate to compare variants.
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate("/onboarding/verify-identity")}>Back</Button>
          <Button 
            className="bg-primary hover:bg-primary/90"
            disabled={!!nameError}
            onClick={() => navigate("/onboarding/preview")}
          >
            Save & Next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
