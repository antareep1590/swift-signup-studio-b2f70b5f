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
    { id: 1, name: "Verify Identity", path: "/onboarding/verify-identity" },
    { id: 2, name: "Customize Branding", path: "/onboarding/basic-info" },
    { id: 3, name: "Preview", path: "/onboarding/preview" },
    { id: 4, name: "Payment", path: "/onboarding/payment" },
    { id: 5, name: "Connect Domain", path: "/onboarding/connect-domain" },
    { id: 6, name: "Stripe Access", path: "/onboarding/stripe-access" },
    { id: 7, name: "Launch", path: "/onboarding/launch" }
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

  const pages = [
    { key: "home", label: "Home", path: "" },
    { key: "about", label: "About Us", path: "/about-us/" },
    { key: "shop", label: "Shop", path: "/shop/" },
    { key: "features", label: "Features", path: "/features/" },
  ];

  const [activePage, setActivePage] = useState("home");

  const getIframeUrl = () => {
    const page = pages.find((p) => p.key === activePage);
    return `https://truefanz.com${page?.path || ""}`;
  };

  return (
    <OnboardingLayout currentStep={3} steps={steps}>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Visual Preview</h1>
          <p className="text-sm text-muted-foreground">Preview your platform design across different devices</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-1 bg-muted p-1 rounded-lg overflow-x-auto">
              {pages.map((page) => (
                <Button
                  key={page.key}
                  variant={activePage === page.key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActivePage(page.key)}
                >
                  {page.label}
                </Button>
              ))}
            </div>

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
              <iframe
                key={activePage}
                src={getIframeUrl()}
                className="w-full h-full border-0"
                title="Platform Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>

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