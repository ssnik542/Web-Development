import { screen, render } from "@testing-library/react";
import Navbar from './Navbar'
describe("Navbar component testing", () => {
    it("onClick button should logout the user", () => {
        render(<Navbar />)
        const btnElement = screen.getAllByRole("listitem")
        expect(btnElement.length).toBe(2)
    })
})
