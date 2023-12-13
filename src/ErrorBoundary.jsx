import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('[Error Caught]: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p className="p-1">{ this.props.fallback || 'Something went wrong...' }</p>
    }

    return this.props.children
  }
}

export default ErrorBoundary
