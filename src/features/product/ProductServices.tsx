import { Truck, Package, ShieldCheck } from 'lucide-react'
import type { ProductVariant } from '../../types/product'
export default function ProductServices({ variant }: { variant: ProductVariant }) {
  return (
    <div className="detail-services">
      <div>
        <Truck size={19} />
        <span>
          Курьером по России
          <strong>
            {variant.price >= 30000 ? 'Бесплатная доставка' : '490 ₽ · бесплатно от 30 000 ₽'}
          </strong>
        </span>
      </div>
      <div>
        <Package size={19} />
        <span>
          Самовывоз<strong>Бесплатно · демо-пункт VELTRIX</strong>
        </span>
      </div>
      <div>
        <ShieldCheck size={19} />
        <span>
          Гарантия качества<strong>12 месяцев · условия демонстрационные</strong>
        </span>
      </div>
    </div>
  )
}
