import { useQuery, useMutation } from '@tanstack/react-query';
import { insightsAPI } from '../lib/api';
import { toast } from 'sonner';

export const useInsights = (postId?: string) => {
  // Get post insights
  const { data: postInsights, isLoading: insightsLoading } = useQuery({
    queryKey: ['postInsights', postId],
    queryFn: () => {
      if (!postId) return null;
      // You'll need to pass platform and platformPostId from your post data
      return insightsAPI.getPostInsights(postId, '', '');
    },
    enabled: !!postId,
  });

  // Get aggregated insights
  const { data: aggregatedInsights, isLoading: aggregatedLoading } = useQuery({
    queryKey: ['aggregatedInsights'],
    queryFn: insightsAPI.getAggregatedInsights,
  });

  // Analyze sentiment
  const analyzeSentimentMutation = useMutation({
    mutationFn: ({ postId, platform, platformPostId }: { 
      postId: string; 
      platform: string; 
      platformPostId: string;
    }) => insightsAPI.analyzeSentiment(postId, platform, platformPostId),
    onSuccess: () => {
      toast.success('Sentiment analysis completed');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to analyze sentiment');
    },
  });

  return {
    postInsights: postInsights?.data,
    aggregatedInsights: aggregatedInsights?.data,
    isLoading: insightsLoading || aggregatedLoading,
    analyzeSentiment: analyzeSentimentMutation.mutate,
    isAnalyzing: analyzeSentimentMutation.isPending,
  };
};
