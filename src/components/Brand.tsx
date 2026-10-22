import { Link } from 'react-router-dom'
export default function Brand() {
  return (
    <Link to="/" className="brand" aria-label="VELTRIX — главная">
      <span className="brand-mark">
        V<span />
      </span>
      VELTRIX<span className="brand-dot">®</span>
    </Link>
  )
}
