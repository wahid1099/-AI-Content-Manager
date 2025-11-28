import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      // OAuth failed
      if (window.opener) {
        window.opener.postMessage({ type: 'oauth-error', error }, '*');
        window.close();
      } else {
        setTimeout(() => navigate('/connected-accounts'), 2000);
      }
      return;
    }

    if (code && state) {
      // OAuth successful - notify parent window
      if (window.opener) {
        window.opener.postMessage({ type: 'oauth-success', code, state }, '*');
        window.close();
      } else {
        // If not in popup, redirect to connected accounts
        setTimeout(() => navigate('/connected-accounts'), 2000);
      }
    }
  }, [code, state, error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {error ? 'Connection Failed' : 'Connecting Account'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {error ? (
            <>
              <XCircle className="w-16 h-16 text-red-500" />
              <p className="text-center text-muted-foreground">
                Failed to connect account. Please try again.
              </p>
              <p className="text-sm text-red-600">{error}</p>
            </>
          ) : code ? (
            <>
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <p className="text-center text-muted-foreground">
                Account connected successfully!
              </p>
              <p className="text-sm">This window will close automatically...</p>
            </>
          ) : (
            <>
              <Loader2 className="w-16 h-16 animate-spin text-primary" />
              <p className="text-center text-muted-foreground">
                Processing authentication...
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
