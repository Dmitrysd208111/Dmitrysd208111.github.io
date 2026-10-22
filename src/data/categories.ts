import type { CategoryId } from '../types/product'
export const categories: { id: CategoryId; name: string; imageId: string; caption: string }[] = [
  { id: 'smartphones', name: 'Смартфоны', imageId: '123', caption: 'Всегда на связи' },
  { id: 'laptops', name: 'Ноутбуки', imageId: '78', caption: 'Для больших идей' },
  { id: 'audio', name: 'Аудио', imageId: '101', caption: 'Почувствуйте звук' },
  { id: 'watches', name: 'Умные часы', imageId: '106', caption: 'В вашем ритме' },
  { id: 'tablets', name: 'Планшеты', imageId: '159', caption: 'Свобода творчества' },
  { id: 'accessories', name: 'Аксессуары', imageId: '105', caption: 'Важные детали' },
]
