// GitHub Pages has no SPA rewrites. Give every known route a real HTML entry
// so a direct visit or refresh returns the application with an HTTP 200.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve, join } from 'node:path'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const outputRoot = resolve(projectRoot, 'dist')
const html = await readFile(join(outputRoot, 'index.html'), 'utf8')
const products = JSON.parse(await readFile(join(projectRoot, 'src/data/products.json'), 'utf8'))
const routes = [
  'catalog',
  'cart',
  'favorites',
  'checkout',
  'info/about',
  'info/delivery',
  'info/warranty',
  ...products.map((product) => `product/${product.slug}`),
]

for (const route of routes) {
  if (!/^[a-z0-9/-]+$/.test(route)) throw new Error(`Invalid static route: ${route}`)
  const directory = resolve(outputRoot, route)
  if (!directory.startsWith(outputRoot + '\\') && !directory.startsWith(outputRoot + '/'))
    throw new Error('Route is outside dist')
  await mkdir(directory, { recursive: true })
  await writeFile(join(directory, 'index.html'), html)
}
await writeFile(join(outputRoot, '404.html'), html)
await writeFile(join(outputRoot, '.nojekyll'), '')
console.log(`GitHub Pages: ${routes.length} route entries, 404 fallback and .nojekyll ready`)
