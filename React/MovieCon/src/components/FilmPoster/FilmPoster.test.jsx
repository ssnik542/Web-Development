import { fireEvent, render, screen } from "@testing-library/react";
import { it } from "vitest";
import FilmPoster from "./FilmPoster";

it('filmposter component render', () => {
    render(<FilmPoster />)

    const poster = screen.getByTestId('fimposter');
    fireEvent.click(poster)
})