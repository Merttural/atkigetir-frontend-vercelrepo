import React from 'react';
import ErrorState from './ErrorState';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // Burada error tracking servisine gönderebilirsiniz (Sentry, LogRocket, vb.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <ErrorState
              type="generic"
              title="Beklenmeyen Bir Hata Oluştu"
              message="Üzgünüz, bir şeyler ters gitti. Lütfen sayfayı yenileyin veya ana sayfaya dönün."
              error={this.state.error}
              onRetry={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              showHomeButton={true}
              showWhatsApp={true}
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
