import { lazy } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import MotionProvider from './components/MotionProvider'
import Layout from './components/Layout'
import RouteErrorBoundary from './components/RouteErrorBoundary'
const HomePage = lazy(() => import('./pages/HomePage'))
const CatalogPage = lazy(() => import('./pages/CatalogPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const InfoPage = lazy(() => import('./pages/InfoPage'))
function ProductRoute() {
  const { pathname } = useLocation()
  return <ProductPage key={pathname} />
}
export default function App() {
  return (
    <MotionProvider>
      <BrowserRouter>
        <RouteErrorBoundary>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="catalog" element={<CatalogPage />} />
              <Route path="product/:slug" element={<ProductRoute />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="info/:topic" element={<InfoPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </RouteErrorBoundary>
      </BrowserRouter>
    </MotionProvider>
  )
}
