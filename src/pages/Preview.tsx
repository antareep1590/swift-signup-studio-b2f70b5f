import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import OnboardingLayout from "@/components/OnboardingLayout";

type DeviceType = "desktop" | "tablet" | "mobile";

const Preview = () => {
  const navigate = useNavigate();
  const [device, setDevice] = useState<DeviceType>("desktop");

  const steps = [
    { id: 1, name: "Customize Branding", path: "/onboarding/basic-info" },
    { id: 2, name: "Preview", path: "/onboarding/preview" },
    { id: 3, name: "Payment", path: "/onboarding/payment" },
    { id: 4, name: "Connect Domain", path: "/onboarding/connect-domain" },
    { id: 5, name: "Stripe Access", path: "/onboarding/stripe-access" },
    { id: 6, name: "Launch", path: "/onboarding/launch" }
  ];

  const getDeviceWidth = () => {
    switch (device) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "w-full";
    }
  };

  const MockLandingPage = () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 text-white overflow-auto">
      <header className="bg-white/10 backdrop-blur-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white/20 rounded-lg"></div>
          <span className="font-semibold">My Clinic</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#" className="hover:opacity-80">Home</a>
          <a href="#" className="hover:opacity-80">Categories</a>
          <a href="#" className="hover:opacity-80">Treatments</a>
          <a href="#" className="hover:opacity-80">How It Works</a>
        </nav>
        <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
      </header>
      <main className="p-8 md:p-16 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Personalized Wellness,<br />Scientifically Delivered
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
          Access physician-prescribed treatments for weight management, hormone optimization, 
          and longevity through our comprehensive telemedicine platform.
        </p>
        <div className="flex flex-wrap gap-4 mb-12">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Explore Treatments →
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
            ▶ How It Works
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 md:gap-8 text-sm">
          <span>• Licensed Physicians</span>
          <span>• FDA-Approved Treatments</span>
          <span>• HIPAA Compliant</span>
        </div>
      </main>
    </div>
  );

  const MockCategoryPage = () => (
    <div className="w-full h-full bg-background overflow-auto">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-lg"></div>
          <span className="font-semibold">My Clinic</span>
        </div>
        <Button>Get Started</Button>
      </header>
      <main className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Treatment Categories</h1>
        <p className="text-muted-foreground mb-8">Browse our comprehensive range of medical treatments</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Weight Management", "Hormone Therapy", "Longevity", "Mental Health", "Skin Care", "Sleep Health"].map((category) => (
            <div key={category} className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4"></div>
              <h3 className="font-semibold mb-2">{category}</h3>
              <p className="text-sm text-muted-foreground">Explore treatment options</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  const MockProductPage = () => (
    <div className="w-full h-full bg-background overflow-auto">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-lg"></div>
          <span className="font-semibold">My Clinic</span>
        </div>
        <Button>Get Started</Button>
      </header>
      <main className="p-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg"></div>
          <div>
            <h1 className="text-3xl font-bold mb-4">Weight Management Program</h1>
            <p className="text-2xl font-semibold mb-6 text-primary">Starting at $199/month</p>
            <p className="text-muted-foreground mb-6">
              Our comprehensive weight management program includes physician consultation, 
              FDA-approved medication, and ongoing support.
            </p>
            <Button size="lg" className="w-full mb-4">Start Consultation</Button>
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">What's Included:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Virtual physician consultation</li>
                  <li>• Personalized treatment plan</li>
                  <li>• Monthly medication delivery</li>
                  <li>• 24/7 support access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const MockQuestionnairePage = () => (
    <div className="w-full h-full bg-background overflow-auto">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-lg"></div>
          <span className="font-semibold">My Clinic</span>
        </div>
      </header>
      <main className="p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step 2 of 5</span>
            <span>40% Complete</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full">
            <div className="w-2/5 h-full bg-primary rounded-full"></div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Medical History</h1>
        <p className="text-muted-foreground mb-8">Please answer the following questions to help us understand your needs</p>
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2">What is your primary health goal?</label>
            <div className="space-y-2">
              {["Weight Loss", "Muscle Gain", "General Wellness", "Other"].map((option) => (
                <div key={option} className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                  {option}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="flex-1">Back</Button>
            <Button className="flex-1">Continue</Button>
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <OnboardingLayout currentStep={2} steps={steps}>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Visual Preview</h1>
          <p className="text-sm text-muted-foreground">Preview your platform design across different devices</p>
        </div>

        <Tabs defaultValue="landing" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <TabsList className="w-full md:w-auto justify-start overflow-x-auto">
              <TabsTrigger value="landing">Landing Page</TabsTrigger>
              <TabsTrigger value="category">Category Page</TabsTrigger>
              <TabsTrigger value="product">Product Page</TabsTrigger>
              <TabsTrigger value="questionnaire">Questionnaire Page</TabsTrigger>
            </TabsList>

            <div className="flex gap-2 bg-muted p-1 rounded-lg w-fit">
              <Button
                variant={device === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDevice("desktop")}
                className="gap-2"
              >
                <Monitor className="w-4 h-4" />
                Desktop
              </Button>
              <Button
                variant={device === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDevice("tablet")}
                className="gap-2"
              >
                <Tablet className="w-4 h-4" />
                Tablet
              </Button>
              <Button
                variant={device === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDevice("mobile")}
                className="gap-2"
              >
                <Smartphone className="w-4 h-4" />
                Mobile
              </Button>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 md:p-8 flex justify-center">
            <div className={cn(
              "bg-background rounded-lg shadow-2xl transition-all duration-300 overflow-hidden",
              getDeviceWidth(),
              device === "mobile" ? "h-[667px]" : device === "tablet" ? "h-[1024px]" : "h-[800px]"
            )}>
              <TabsContent value="landing" className="h-full m-0">
                <MockLandingPage />
              </TabsContent>
              <TabsContent value="category" className="h-full m-0">
                <MockCategoryPage />
              </TabsContent>
              <TabsContent value="product" className="h-full m-0">
                <MockProductPage />
              </TabsContent>
              <TabsContent value="questionnaire" className="h-full m-0">
                <MockQuestionnairePage />
              </TabsContent>
            </div>
          </div>
        </Tabs>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => navigate("/onboarding/basic-info")}>
            Back
          </Button>
          <Button onClick={() => navigate("/onboarding/payment")}>
            Save & Next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Preview;