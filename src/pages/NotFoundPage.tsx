import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'
export default function NotFoundPage() {
  usePageTitle('Страница не найдена')
  return (
    <div className="container not-found page-space">
      <span className="eyebrow">ВЫ НЕМНОГО ОПЕРЕДИЛИ ТЕХНОЛОГИИ</span>
      <strong>
        4<span>0</span>4
      </strong>
      <h1>Здесь пока ничего нет.</h1>
      <p>
        Зато в каталоге есть много интересного.
        <br />
        Давайте вернёмся к открытиям.
      </p>
      <Link className="btn btn-primary" to="/catalog">
        Перейти в каталог <ArrowRight size={18} />
      </Link>
    </div>
  )
}
