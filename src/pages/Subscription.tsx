import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Crown,
  Check,
  X,
  Zap,
  Users,
  BarChart3,
  Calendar,
  Loader2,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { authAPI, Subscription, SubscriptionPlan } from "@/lib/auth";
import { toast } from "sonner";

const SubscriptionPage = () => {
  const [currentSubscription, setCurrentSubscription] =
    useState<Subscription | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    setIsLoading(true);
    try {
      const [subscriptionResponse, plansResponse] = await Promise.all([
        authAPI.getCurrentSubscription(),
        authAPI.getSubscriptionPlans(),
      ]);

      if (subscriptionResponse.success && subscriptionResponse.data) {
        setCurrentSubscription(subscriptionResponse.data);
      }

      if (plansResponse.success && plansResponse.data) {
        setPlans(plansResponse.data);
      }
    } catch (error) {
      console.error("Failed to load subscription data:", error);
      toast.error("Failed to load subscription information");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async (planId: string) => {
    setIsUpgrading(true);
    setSelectedPlan(planId);
    try {
      const response = await authAPI.createSubscription(planId);
      if (response.success) {
        toast.success("Subscription upgraded successfully!");
        await loadSubscriptionData();
      } else {
        toast.error(response.message || "Failed to upgrade subscription");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      toast.error("Failed to upgrade subscription");
    } finally {
      setIsUpgrading(false);
      setSelectedPlan(null);
    }
  };

  const handleCancel = async () => {
    try {
      const response = await authAPI.cancelSubscription();
      if (response.success) {
        toast.success("Subscription cancelled successfully");
        await loadSubscriptionData();
      } else {
        toast.error(response.message || "Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("Failed to cancel subscription");
    }
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "past_due":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-responsive animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-responsive-3xl font-bold gradient-text">
              Subscription Management
            </h1>
            <p className="text-muted-foreground text-responsive-base mt-2">
              Manage your subscription and billing preferences
            </p>
          </div>
        </div>

        {/* Current Subscription */}
        {currentSubscription && (
          <Card className="card-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="w-5 h-5 text-primary" />
                    <span>Current Plan: {currentSubscription.planName}</span>
                  </CardTitle>
                  <CardDescription>
                    {currentSubscription.status === "active"
                      ? `Active until ${new Date(
                          currentSubscription.currentPeriodEnd
                        ).toLocaleDateString()}`
                      : `Status: ${currentSubscription.status}`}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(currentSubscription.status)}>
                  {currentSubscription.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Usage Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Posts Created</span>
                    <span className="font-medium">
                      {currentSubscription.usage.postsUsed} /{" "}
                      {currentSubscription.limits.postsPerMonth}
                    </span>
                  </div>
                  <Progress
                    value={getUsagePercentage(
                      currentSubscription.usage.postsUsed,
                      currentSubscription.limits.postsPerMonth
                    )}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      AI Generations
                    </span>
                    <span className="font-medium">
                      {currentSubscription.usage.aiGenerationsUsed} /{" "}
                      {currentSubscription.limits.aiGenerationsPerMonth}
                    </span>
                  </div>
                  <Progress
                    value={getUsagePercentage(
                      currentSubscription.usage.aiGenerationsUsed,
                      currentSubscription.limits.aiGenerationsPerMonth
                    )}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Team Members</span>
                    <span className="font-medium">
                      {currentSubscription.usage.teamMembersUsed} /{" "}
                      {currentSubscription.limits.teamMembers}
                    </span>
                  </div>
                  <Progress
                    value={getUsagePercentage(
                      currentSubscription.usage.teamMembersUsed,
                      currentSubscription.limits.teamMembers
                    )}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Social Accounts
                    </span>
                    <span className="font-medium">
                      {currentSubscription.usage.socialAccountsUsed} /{" "}
                      {currentSubscription.limits.socialAccounts}
                    </span>
                  </div>
                  <Progress
                    value={getUsagePercentage(
                      currentSubscription.usage.socialAccountsUsed,
                      currentSubscription.limits.socialAccounts
                    )}
                    className="h-2"
                  />
                </div>
              </div>

              {/* Plan Features */}
              <div>
                <h4 className="font-semibold mb-3">Plan Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentSubscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4 pt-4 border-t">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    ${currentSubscription.amount / 100} /{" "}
                    {currentSubscription.interval}
                  </p>
                </div>
                {currentSubscription.status === "active" &&
                  !currentSubscription.cancelAtPeriodEnd && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Cancel Subscription
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Cancel Subscription
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel your subscription?
                            You'll lose access to premium features at the end of
                            your current billing period.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Keep Subscription
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleCancel}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Cancel Subscription
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Plans */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`card-interactive relative ${
                  plan.popular ? "ring-2 ring-primary shadow-glow" : ""
                } ${
                  currentSubscription?.planId === plan.id ? "bg-primary/5" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">
                      /{plan.interval}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Plan Limits */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Posts per month</span>
                      </div>
                      <span className="font-medium">
                        {plan.limits.postsPerMonth}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-muted-foreground" />
                        <span>AI Generations</span>
                      </div>
                      <span className="font-medium">
                        {plan.limits.aiGenerationsPerMonth}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>Team Members</span>
                      </div>
                      <span className="font-medium">
                        {plan.limits.teamMembers}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-muted-foreground" />
                        <span>Social Accounts</span>
                      </div>
                      <span className="font-medium">
                        {plan.limits.socialAccounts}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 4 && (
                      <p className="text-xs text-muted-foreground">
                        +{plan.features.length - 4} more features
                      </p>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    {currentSubscription?.planId === plan.id ? (
                      <Button disabled className="w-full">
                        <Check className="w-4 h-4 mr-2" />
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={isUpgrading}
                        className="w-full gradient-primary"
                      >
                        {isUpgrading && selectedPlan === plan.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Upgrading...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4 mr-2" />
                            {currentSubscription ? "Upgrade" : "Subscribe"}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing Information */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-primary" />
              <span>Billing Information</span>
            </CardTitle>
            <CardDescription>
              Manage your payment methods and billing history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Payment method and billing history will be available soon
                </p>
              </div>
              <Button variant="outline" disabled>
                Manage Billing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SubscriptionPage;
