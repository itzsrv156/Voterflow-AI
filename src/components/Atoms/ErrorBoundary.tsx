import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Sovereign Error Boundary
 * Ensures application resilience by catching UI-level crashes and providing a graceful recovery path.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full glass p-10 rounded-[3rem] shadow-2xl border border-white">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-display font-bold text-civic-navy mb-4">Sovereign Recovery Mode</h1>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              An unexpected logic disruption occurred. Don't worry—your VoterFlow data is safe.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-civic-navy text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Reset Interface
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
