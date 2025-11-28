import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socialAuthAPI } from '../lib/api';
import { toast } from 'sonner';

export const useSocialAuth = () => {
  const queryClient = useQueryClient();

  // Get connected accounts
  const { data: connectedAccounts, isLoading } = useQuery({
    queryKey: ['connectedAccounts'],
    queryFn: socialAuthAPI.getConnectedAccounts,
  });

  // Connect account
  const connectAccount = async (platform: string) => {
    try {
      const { data } = await socialAuthAPI.getAuthUrl(platform);
      // Open OAuth URL in popup or redirect
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const popup = window.open(
        data.url,
        `${platform} OAuth`,
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Listen for OAuth callback
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'oauth-success') {
          popup?.close();
          queryClient.invalidateQueries({ queryKey: ['connectedAccounts'] });
          toast.success(`${platform} connected successfully!`);
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to connect account');
    }
  };

  // Disconnect account
  const disconnectMutation = useMutation({
    mutationFn: (platform: string) => socialAuthAPI.disconnectAccount(platform),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectedAccounts'] });
      toast.success('Account disconnected successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to disconnect account');
    },
  });

  // Check account health
  const checkHealthMutation = useMutation({
    mutationFn: (platform: string) => socialAuthAPI.checkAccountHealth(platform),
    onSuccess: (data) => {
      if (data.data.isHealthy) {
        toast.success('Account is healthy');
      } else {
        toast.warning('Account needs reconnection');
      }
    },
  });

  // Refresh account data
  const refreshMutation = useMutation({
    mutationFn: (platform: string) => socialAuthAPI.refreshAccountData(platform),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectedAccounts'] });
      toast.success('Account data refreshed');
    },
  });

  return {
    connectedAccounts: connectedAccounts?.data || [],
    isLoading,
    connectAccount,
    disconnectAccount: disconnectMutation.mutate,
    checkHealth: checkHealthMutation.mutate,
    refreshAccount: refreshMutation.mutate,
  };
};
