import { NavLink } from 'react-router-dom'
import { Home, Grid2X2, Heart, ShoppingBag } from 'lucide-react'
import { useShop } from '../store/shop'
export default function MobileNavigation() {
  const count = useShop((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const favorites = useShop((s) => s.favorites.length)
  return (
    <nav className="mobile-bottom-nav" aria-label="Быстрая навигация">
      <NavLink to="/" end>
        <Home size={21} />
        <span>Главная</span>
      </NavLink>
      <NavLink to="/catalog">
        <Grid2X2 size={21} />
        <span>Каталог</span>
      </NavLink>
      <NavLink to="/favorites">
        <Heart size={21} />
        <span>Избранное{favorites ? ` · ${favorites}` : ''}</span>
      </NavLink>
      <NavLink to="/cart">
        <ShoppingBag size={21} />
        <span>Корзина{count ? ` · ${count}` : ''}</span>
      </NavLink>
    </nav>
  )
}
