import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Truck } from 'lucide-react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import MobileNavigation from './MobileNavigation'
import ToastRegion from './ToastRegion'
import { LoadingState } from './States'
import { useMotionSettings } from '../store/motion'
export default function Layout() {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const motionRevision = useMotionSettings((state) => state.revision)
  useEffect(() => {
    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [location.pathname, motionRevision])
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <div className="announcement">
        <span>
          Техника, которая вдохновляет.{' '}
          <span className="announcement-secondary">Доставка бесплатно от 30 000 ₽</span>
        </span>
        <Truck size={14} />
      </div>
      <SiteHeader />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Suspense fallback={<LoadingState />}>
          <div key={`${location.pathname}:${motionRevision}`} className="page-transition">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <SiteFooter />
      <MobileNavigation />
      <ToastRegion />
    </>
  )
}
