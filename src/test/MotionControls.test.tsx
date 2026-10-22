import { beforeEach, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MotionProvider from '../components/MotionProvider'
import MotionControls from '../components/MotionControls'
import { useMotionSettings } from '../store/motion'

beforeEach(() => {
  window.history.replaceState({}, '', '/')
  useMotionSettings.setState({ preference: 'reduced', revision: 0 })
})

it('включает эффекты явно, повторяет их и позволяет уменьшить движение', async () => {
  const user = userEvent.setup()
  render(
    <MotionProvider>
      <MotionControls />
    </MotionProvider>,
  )
  expect(document.documentElement).toHaveAttribute('data-motion', 'reduced')
  await user.click(screen.getByRole('button', { name: 'Включить анимации' }))
  expect(document.documentElement).toHaveAttribute('data-motion', 'full')
  expect(useMotionSettings.getState().revision).toBe(1)
  await user.click(screen.getByRole('button', { name: 'Повторить анимации' }))
  expect(useMotionSettings.getState().revision).toBe(2)
  await user.click(screen.getByRole('button', { name: 'Уменьшить анимации' }))
  expect(document.documentElement).toHaveAttribute('data-motion', 'reduced')
})

it('специальная ссылка включает эффекты и перезапускает появление', () => {
  window.history.replaceState({}, '', '/?motion=full')
  render(
    <MotionProvider>
      <MotionControls />
    </MotionProvider>,
  )
  expect(useMotionSettings.getState().preference).toBe('full')
  expect(useMotionSettings.getState().revision).toBe(1)
  expect(document.documentElement).toHaveAttribute('data-motion', 'full')
})
