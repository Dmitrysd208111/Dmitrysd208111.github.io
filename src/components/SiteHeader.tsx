import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Tablet,
  Cable,
} from 'lucide-react'
import { useShop } from '../store/shop'
import { categories } from '../data/categories'
import Brand from './Brand'
const icons = [Smartphone, Laptop, Headphones, Watch, Tablet, Cable]

export default function SiteHeader() {
  const [menu, setMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const count = useShop((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const favorites = useShop((s) => s.favorites.length)
  const location = useLocation()
  const navigate = useNavigate()
  const searchRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    setMenu(false)
    setSearchOpen(false)
  }, [location.pathname])
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [])
  return (
    <header className="site-header">
      <div className="container header-main">
        <Brand />
        <nav className="header-links" aria-label="Основная навигация">
          <NavLink to="/catalog">
            Каталог <ChevronDown size={13} />
          </NavLink>
          <Link to="/catalog?sort=new">Новинки</Link>
          <Link to="/catalog?max=30000">
            До 30 000 ₽ <span className="mini-dot" />
          </Link>
        </nav>
        <div className="header-actions">
          <button
            className="icon-btn"
            aria-label="Поиск по магазину"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search size={21} />
          </button>
          <Link
            className="icon-btn desktop-favorite"
            to="/favorites"
            aria-label={`Избранное, ${favorites} товаров`}
          >
            <Heart size={21} />
            {favorites > 0 && <span className="counter">{favorites}</span>}
          </Link>
          <Link className="cart-link" to="/cart" aria-label={`Корзина, ${count} товаров`}>
            <ShoppingBag size={20} />
            <span>Корзина</span>
            <span key={count} className="cart-count">
              {count}
            </span>
          </Link>
          <button
            className="icon-btn menu-toggle"
            aria-label={menu ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div className="category-nav">
        <div className="container category-nav-inner">
          <nav aria-label="Категории товаров">
            {categories.map((c, i) => {
              const Icon = icons[i]
              return (
                <Link key={c.id} to={`/catalog?category=${c.id}`}>
                  <Icon size={16} strokeWidth={1.5} />
                  {c.name}
                </Link>
              )
            })}
          </nav>
          <span className="location-label">
            <MapPin size={14} /> Доставка по России
          </span>
        </div>
      </div>
      {searchOpen && (
        <div className="search-panel">
          <form
            className="container search-form"
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              navigate(`/catalog?q=${encodeURIComponent(search.trim())}`)
              setSearchOpen(false)
            }}
          >
            <Search size={22} />
            <input
              ref={searchRef}
              placeholder="Найдём вашу следующую любимую вещь"
              aria-label="Поиск товаров"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Найти <ArrowRight size={17} />
            </button>
            <button
              type="button"
              className="icon-btn"
              aria-label="Закрыть поиск"
              onClick={() => setSearchOpen(false)}
            >
              <X size={21} />
            </button>
          </form>
        </div>
      )}
      {menu && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Мобильное меню">
          <Link onClick={() => setMenu(false)} to="/catalog">
            Весь каталог <ArrowUpRight size={19} />
          </Link>
          {categories.map((c) => (
            <Link key={c.id} onClick={() => setMenu(false)} to={`/catalog?category=${c.id}`}>
              {c.name}
            </Link>
          ))}
          <Link to="/favorites">Избранное ({favorites})</Link>
        </nav>
      )}
    </header>
  )
}
