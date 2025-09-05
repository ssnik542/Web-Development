import { describe, expect, it,vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from '../components/Navbar'

global.fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        value: "Testing something!"
    })
}));

describe('Navbar component Testing', () => {
    it('should render the navbar component', () => {
        render(<Navbar />)
        const heading = screen.getByText('MovieCon 🍿')
        expect(heading).toBeInTheDocument();

    })
})