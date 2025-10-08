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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  UserPlus,
  Mail,
  MoreVertical,
  Shield,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { authAPI, TeamMember, Workspace } from "@/lib/auth";
import { toast } from "sonner";

const TeamPage = () => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "editor",
  });

  const roles = [
    {
      value: "owner",
      label: "Owner",
      description: "Full access to everything",
    },
    { value: "admin", label: "Admin", description: "Manage team and content" },
    {
      value: "editor",
      label: "Editor",
      description: "Create and edit content",
    },
    { value: "viewer", label: "Viewer", description: "View content only" },
  ];

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    setIsLoading(true);
    try {
      const [workspaceResponse, membersResponse] = await Promise.all([
        authAPI.getWorkspace(),
        authAPI.getTeamMembers(),
      ]);

      if (workspaceResponse.success && workspaceResponse.data) {
        setWorkspace(workspaceResponse.data);
      }

      if (membersResponse.success && membersResponse.data) {
        setTeamMembers(membersResponse.data);
      }
    } catch (error) {
      console.error("Failed to load team data:", error);
      toast.error("Failed to load team information");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!inviteForm.email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    setIsInviting(true);
    try {
      const response = await authAPI.inviteTeamMember(
        inviteForm.email,
        inviteForm.role
      );
      if (response.success) {
        toast.success("Team member invited successfully!");
        setInviteDialogOpen(false);
        setInviteForm({ email: "", role: "editor" });
        await loadTeamData();
      } else {
        toast.error(response.message || "Failed to invite team member");
      }
    } catch (error) {
      console.error("Invite error:", error);
      toast.error("Failed to invite team member");
    } finally {
      setIsInviting(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      const response = await authAPI.removeTeamMember(memberId);
      if (response.success) {
        toast.success("Team member removed successfully");
        await loadTeamData();
      } else {
        toast.error(response.message || "Failed to remove team member");
      }
    } catch (error) {
      console.error("Remove member error:", error);
      toast.error("Failed to remove team member");
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "admin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "editor":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "viewer":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "inactive":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
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
              Team Management
            </h1>
            <p className="text-muted-foreground text-responsive-base mt-2">
              Manage your team members and workspace settings
            </p>
          </div>
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your workspace
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="colleague@company.com"
                    value={inviteForm.email}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={inviteForm.role}
                    onValueChange={(value) =>
                      setInviteForm({ ...inviteForm, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles
                        .filter((role) => role.value !== "owner")
                        .map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            <div>
                              <div className="font-medium">{role.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {role.description}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setInviteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleInvite} disabled={isInviting}>
                    {isInviting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Invite
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Workspace Info */}
        {workspace && (
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Workspace: {workspace.name}</span>
              </CardTitle>
              <CardDescription>
                {workspace.description || "No description provided"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Total Members</p>
                  <p className="text-2xl font-bold">{teamMembers.length}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Active Members</p>
                  <p className="text-2xl font-bold text-green-600">
                    {teamMembers.filter((m) => m.status === "active").length}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Pending Invites</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {teamMembers.filter((m) => m.status === "pending").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Team Members */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Team Members</span>
            </CardTitle>
            <CardDescription>
              Manage your team members and their permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {teamMembers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">
                  No team members yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Invite your first team member to start collaborating
                </p>
                <Button
                  onClick={() => setInviteDialogOpen(true)}
                  className="gradient-primary"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Member
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold text-sm">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{member.name}</h4>
                          {getStatusIcon(member.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                        {member.lastActive && (
                          <p className="text-xs text-muted-foreground">
                            Last active:{" "}
                            {new Date(member.lastActive).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>

                      {member.role !== "owner" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Role
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove Member
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Remove Team Member
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove{" "}
                                    {member.name} from the team? This action
                                    cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleRemoveMember(member.id)
                                    }
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Remove Member
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Workspace Settings */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Workspace Settings</CardTitle>
            <CardDescription>
              Configure your workspace preferences and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Approval Required</h4>
                  <p className="text-sm text-muted-foreground">
                    Require approval before publishing content
                  </p>
                </div>
                <Badge variant="secondary">
                  {workspace?.settings.approvalRequired
                    ? "Enabled"
                    : "Disabled"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Default Tone</h4>
                  <p className="text-sm text-muted-foreground">
                    Default tone for AI-generated content
                  </p>
                </div>
                <Badge variant="secondary">
                  {workspace?.settings.defaultTone || "Professional"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Allowed Platforms</h4>
                  <p className="text-sm text-muted-foreground">
                    Platforms available for content creation
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {workspace?.settings.allowedPlatforms.map((platform) => (
                    <Badge key={platform} variant="outline" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" disabled>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TeamPage;
