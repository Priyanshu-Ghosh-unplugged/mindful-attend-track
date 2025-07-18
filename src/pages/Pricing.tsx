import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for small events and testing",
      icon: Star,
      features: [
        "Basic QR code tracking",
        "Up to 50 participants",
        "Simple engagement scoring",
        "Basic analytics dashboard",
        "Email support"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Complete solution for regular events",
      icon: Zap,
      features: [
        "RFID/NFC + QR tracking",
        "Up to 500 participants",
        "Dynamic scoring system",
        "Live heatmaps & 3D globes",
        "Participant timelines",
        "Multi-event management",
        "Priority support"
      ],
      cta: "Start Professional",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "Advanced features for large organizations",
      icon: Crown,
      features: [
        "All Professional features",
        "Unlimited participants",
        "AI mentor chat system",
        "VR metrics tracking",
        "Fraud detection",
        "GDPR compliance tools",
        "Custom integrations",
        "Dedicated support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const addOns = [
    { name: "AI Mentor Premium", price: "$15/month", description: "Advanced skill-based matching" },
    { name: "VR Analytics", price: "$25/month", description: "Virtual reality engagement tracking" },
    { name: "Custom Branding", price: "$50/month", description: "White-label solution" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Choose Your{" "}
              <span className="bg-gradient-brass bg-clip-text text-transparent">
                Engagement
              </span>{" "}
              Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start with basic tracking and scale up to AI-powered engagement analytics. 
              All plans include our core tracking engine.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card 
                  key={plan.name}
                  className={`p-8 relative ${
                    plan.popular 
                      ? 'border-brass shadow-brass bg-gradient-card' 
                      : 'bg-gradient-card border-accent/20'
                  } hover:shadow-elegant transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-brass text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-brass/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-brass" />
                    </div>
                    <h3 className="text-2xl font-bold font-poppins mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-brass">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-5 h-5 text-brass mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.popular ? "brass" : "outline"}
                    className="w-full"
                    size="lg"
                    onClick={() => alert(`Selected ${plan.name} plan - Redirecting to checkout...`)}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Add-ons */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-poppins text-center mb-8">
              Premium <span className="text-brass">Add-ons</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {addOns.map((addon) => (
                <Card key={addon.name} className="p-6 bg-gradient-card border-accent/20 hover:shadow-elegant transition-all duration-300">
                  <h4 className="font-semibold font-poppins mb-2">{addon.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{addon.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-brass">{addon.price}</span>
                    <Button variant="outline" size="sm">Add</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass">
            <h3 className="text-2xl font-bold font-poppins text-center mb-6">
              Questions? We're here to help
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Can I upgrade anytime?</h4>
                <p className="text-muted-foreground">Yes, upgrade or downgrade your plan at any time with immediate effect.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Is there a setup fee?</h4>
                <p className="text-muted-foreground">No setup fees. Start tracking engagement in minutes with our quick setup.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What about data privacy?</h4>
                <p className="text-muted-foreground">Full GDPR compliance with data encryption and privacy controls included.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Need custom features?</h4>
                <p className="text-muted-foreground">Contact our team for custom integrations and enterprise solutions.</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button variant="brass" onClick={() => alert('Contact form opened - Our team will reach out!')}>
                Contact Sales Team
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Pricing;