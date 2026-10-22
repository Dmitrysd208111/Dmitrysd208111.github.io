import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
export default class RouteErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('VELTRIX render error', error, info.componentStack)
  }
  render() {
    return this.state.failed ? (
      <div className="empty-state" role="alert">
        <h1>Что-то пошло не так</h1>
        <p>Обновите страницу, чтобы продолжить выбор.</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Обновить страницу
        </button>
      </div>
    ) : (
      this.props.children
    )
  }
}
