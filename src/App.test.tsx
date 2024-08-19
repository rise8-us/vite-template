import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'
import Chance from 'chance';

const chance = Chance()

describe('App.tsx', () => {
    it('should change count when clicked', async () => {
        // ARRANGE
        render(<App />)
        const expectedClickCount: number = chance.d6()

        // ACT
        expect(screen.getByRole('button', {
            name: /count is*/
        })).toBeDefined()
        await Promise.all(chance.n(() => userEvent.click(screen.getByRole('button', {
            name: /count is*/
        })), expectedClickCount))

        // ASSERT
        expect(screen.getByText(`count is ${expectedClickCount}`)).toBeDefined()
    })
})