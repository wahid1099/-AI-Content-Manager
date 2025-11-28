import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSocialAuth } from "@/hooks/useSocialAuth";
import { 
  Linkedin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  MessageCircle,
  Music2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Unplug
} from "lucide-react";

const platformIcons: Record<string, any> = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  whatsapp: MessageCircle,
  tiktok: Music2,
};

const platformColors: Record<string, string> = {
  linkedin: "bg-blue-600",
  facebook: "bg-blue-700",
  instagram: "bg-gradient-to-r from-purple-600 to-pink-600",
  twitter: "bg-sky-500",
  youtube: "bg-red-600",
  whatsapp: "bg-green-600",
  tiktok: "bg-black",
};

interface AccountCardProps {
  platform: string;
  account?: any;
  onConnect: () => void;
  onDisconnect: () => void;
  onRefresh: () => void;
  onCheckHealth: () => void;
}

export function AccountCard({ 
  platform, 
  account, 
  onConnect, 
  onDisconnect,
  onRefresh,
  onCheckHealth 
}: AccountCardProps) {
  const Icon = platformIcons[platform.toLowerCase()] || MessageCircle;
  const colorClass = platformColors[platform.toLowerCase()] || "bg-gray-600";
  const isConnected = !!account;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`${colorClass} p-3 rounded-lg text-white`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="capitalize">{platform}</CardTitle>
              {isConnected && (
                <CardDescription className="flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Connected as @{account.username}
                </CardDescription>
              )}
            </div>
          </div>
          {isConnected ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-50 text-gray-700">
              Not Connected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Followers</p>
                <p className="font-semibold">{account.follower_count?.toLocaleString() || 'N/A'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Posts</p>
                <p className="font-semibold">{account.posts_count?.toLocaleString() || 'N/A'}</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Last synced: {new Date(account.last_sync_date).toLocaleDateString()}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRefresh}
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onCheckHealth}
                className="flex-1"
              >
                Check Health
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={onDisconnect}
              >
                <Unplug className="w-4 h-4 mr-1" />
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={onConnect} className="w-full">
            Connect {platform}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function ConnectedAccountsPage() {
  const { 
    connectedAccounts, 
    isLoading, 
    connectAccount, 
    disconnectAccount,
    refreshAccount,
    checkHealth 
  } = useSocialAuth();

  const platforms = ['linkedin', 'facebook', 'instagram', 'twitter', 'youtube', 'whatsapp', 'tiktok'];

  const getAccountForPlatform = (platform: string) => {
    return connectedAccounts.find((acc: any) => acc.platform === platform);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Connected Accounts</h1>
        <p className="text-muted-foreground mt-2">
          Connect your social media accounts to start posting and tracking insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <AccountCard
            key={platform}
            platform={platform}
            account={getAccountForPlatform(platform)}
            onConnect={() => connectAccount(platform)}
            onDisconnect={() => disconnectAccount(platform)}
            onRefresh={() => refreshAccount(platform)}
            onCheckHealth={() => checkHealth(platform)}
          />
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <ol className="list-decimal list-inside space-y-2">
            <li>Click "Connect" on any platform to authorize access</li>
            <li>Complete the OAuth flow in the popup window</li>
            <li>Once connected, you can post content and view insights</li>
            <li>Use "Refresh" to update account data</li>
            <li>Use "Check Health" to verify connection status</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
