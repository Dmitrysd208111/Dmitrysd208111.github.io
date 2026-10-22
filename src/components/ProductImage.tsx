import { useState } from 'react'
import { ImageOff } from 'lucide-react'
export default function ProductImage({
  src,
  alt,
  className = '',
  eager = false,
}: {
  src: string
  alt: string
  className?: string
  eager?: boolean
}) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <span className={`image-fallback ${className}`} role="img" aria-label={alt}>
      <ImageOff size={32} />
      <span>Фото скоро появится</span>
    </span>
  ) : (
    <img
      className={`product-image ${className}`}
      src={src}
      alt={alt}
      width="600"
      height="600"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
