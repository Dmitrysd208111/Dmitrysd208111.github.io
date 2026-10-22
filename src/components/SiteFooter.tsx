import { Link } from 'react-router-dom'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import Brand from './Brand'
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Brand />
          <p>
            Технологии, которые становятся
            <br />
            частью вашей жизни.
          </p>
          <span className="footer-note">Создано с вниманием к деталям.</span>
        </div>
        <div>
          <h3>Найдите своё</h3>
          <Link to="/catalog">Каталог</Link>
          <Link to="/catalog?sort=new">Новые поступления</Link>
          <Link to="/favorites">Избранное</Link>
        </div>
        <div>
          <h3>Всегда рядом</h3>
          <Link to="/info/delivery">Доставка и оплата</Link>
          <Link to="/info/warranty">Гарантия и возврат</Link>
          <Link to="/info/about">О проекте VELTRIX</Link>
        </div>
        <div className="footer-promise">
          <ShieldCheck size={25} />
          <h3>Спокойствие в комплекте</h3>
          <p>
            Оригинальная техника.
            <br />
            Понятный выбор. Забота о вас.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 VELTRIX</span>
        <span>Портфолио-проект · Все заказы демонстрационные</span>
        <span>
          React + TypeScript <ArrowUpRight size={14} />
        </span>
      </div>
    </footer>
  )
}
