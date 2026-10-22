// One-time, reproducible import. Runtime never depends on DummyJSON.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
const source = JSON.parse(
  await readFile(new URL('../products-source.json', import.meta.url), 'utf8'),
)
const prices = {
  78: 169990,
  79: 159990,
  80: 119990,
  81: 89990,
  82: 109990,
  99: 12990,
  100: 16990,
  101: 54990,
  102: 4990,
  103: 12990,
  104: 2490,
  105: 9990,
  106: 24990,
  107: 6990,
  108: 4990,
  109: 1490,
  110: 3490,
  111: 1990,
  112: 39990,
  121: 7990,
  122: 9990,
  123: 64990,
  124: 24990,
  125: 13990,
  126: 23990,
  127: 15990,
  128: 12990,
  129: 19990,
  130: 21990,
  131: 11990,
  132: 15990,
  133: 27990,
  134: 13990,
  135: 12990,
  136: 18990,
  159: 49990,
  160: 69990,
  161: 19990,
}
const names = {
  78: 'MacBook Pro 14″',
  79: 'ASUS Zenbook Pro Duo',
  80: 'HUAWEI MateBook X Pro',
  81: 'Lenovo Yoga 920',
  82: 'Dell XPS 13',
  99: 'Amazon Echo Plus',
  100: 'Apple AirPods',
  101: 'AirPods Max',
  102: 'Apple AirPower',
  103: 'HomePod mini',
  104: 'Адаптер Apple USB',
  105: 'MagSafe Battery Pack',
  106: 'Apple Watch Series 4',
  107: 'Beats Flex',
  108: 'Чехол MagSafe для iPhone 12',
  109: 'Монопод TechGear',
  110: 'Кольцевая лампа GadgetMaster',
  111: 'Монопод SnapTech',
  112: 'Стойка ProVision Studio',
  123: 'iPhone 13 Pro',
  159: 'iPad mini',
  160: 'Galaxy Tab S8+',
  161: 'Samsung Galaxy Tab',
}
const categories = {
  smartphones: 'Смартфоны',
  laptops: 'Ноутбуки',
  tablets: 'Планшеты',
  audio: 'Аудио',
  watches: 'Часы',
  accessories: 'Аксессуары',
}
const featureIds = [101, 78, 123, 106, 160, 103, 79, 107]
const products = source.map((p, i) => {
  const category =
    p.category === 'mobile-accessories'
      ? [99, 100, 101, 103, 107].includes(p.id)
        ? 'audio'
        : p.id === 106
          ? 'watches'
          : 'accessories'
      : p.category
  const name = names[p.id] ?? p.title
  const price = prices[p.id]
  const stock = p.id === 112 ? 0 : 3 + (i % 9)
  const specs = {
    Бренд: p.brand,
    Модель: name,
    Категория: categories[category],
    Комплектация: 'Устройство, документация, фирменная упаковка',
    Гарантия: '12 месяцев (демо)',
    Состояние: 'Новое',
  }
  if (category === 'smartphones')
    Object.assign(specs, {
      'Тип устройства': 'Смартфон',
      Экран: 'Сенсорный',
      Связь: 'Wi-Fi, Bluetooth',
      Память: 'Базовая версия',
    })
  if (category === 'laptops')
    Object.assign(specs, {
      'Тип устройства': 'Ноутбук',
      Подключение: 'Wi-Fi, Bluetooth',
      Клавиатура: 'С подсветкой',
    })
  if (category === 'audio')
    Object.assign(specs, { Подключение: 'Беспроводное', Интерфейс: 'Bluetooth / Wi-Fi' })
  const slug = p.images[0].split('/').at(-2)
  return {
    id: String(p.id),
    slug,
    name,
    brand: p.brand,
    category,
    price,
    oldPrice: i % 3 === 0 ? Math.round((price * 1.13) / 100) * 100 : undefined,
    rating: Math.round((4.5 + (i % 5) * 0.1) * 10) / 10,
    reviews: 18 + i * 7,
    popularity: featureIds.includes(p.id) ? 1000 - featureIds.indexOf(p.id) * 10 : 100 - i,
    isNew: [78, 79, 101, 123, 160, 103].includes(p.id),
    tag: p.id === 101 ? 'Выбор VELTRIX' : undefined,
    subtitle:
      category === 'laptops'
        ? 'Мощность в каждой детали'
        : category === 'audio'
          ? 'Ваш личный мир звука'
          : category === 'smartphones'
            ? 'Всё важное — в ваших руках'
            : category === 'watches'
              ? 'Ваш ритм. Ваши правила.'
              : category === 'tablets'
                ? 'Больше пространства для идей'
                : 'Продумано до мелочей',
    description: `${name} — ${category === 'audio' ? 'любимые треки, новые открытия и удовольствие от каждой детали звучания' : category === 'laptops' ? 'инструмент для работы, творчества и смелых идей' : category === 'smartphones' ? 'общение, фотографии и любимые приложения в одном устройстве' : 'продуманная техника для комфортного дня'}. Лаконичный дизайн, удобство каждый день и внимание к деталям. Выберите комплект, который подходит именно вам.`,
    images: p.images.slice(0, 3).map((_, j) => `/images/products/${p.id}-${j + 1}.webp`),
    specs,
    variants: [
      { id: 'standard', label: 'Стандартный', price, stock },
      { id: 'gift', label: 'Подарочный', price: price + 990, stock: stock ? 2 : 0 },
    ],
    source: p.images[0],
  }
})
await mkdir('public/images/products', { recursive: true })
await mkdir('src/data', { recursive: true })
await writeFile('src/data/products.json', JSON.stringify(products, null, 2) + '\n')
let done = 0
const assets = source.flatMap((p) =>
  p.images
    .slice(0, 3)
    .map((url, j) => ({ url, path: `public/images/products/${p.id}-${j + 1}.webp` })),
)
for (let i = 0; i < assets.length; i += 6) {
  await Promise.all(
    assets.slice(i, i + 6).map(async (a) => {
      const response = await fetch(a.url)
      if (!response.ok) throw new Error(`${response.status}: ${a.url}`)
      await writeFile(a.path, Buffer.from(await response.arrayBuffer()))
      done++
    }),
  )
  console.log(`${done}/${assets.length} images`)
}
await writeFile(
  'src/data/image-sources.json',
  JSON.stringify(
    {
      provider: 'DummyJSON',
      documentation: 'https://dummyjson.com/docs/products',
      repository: 'https://github.com/Ovi/DummyJSON',
      retrieved: '2026-10-20',
      assets,
    },
    null,
    2,
  ) + '\n',
)
console.log(`${products.length} products ready`)
