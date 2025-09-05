import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trendingMovies: null,
        popularMovies: null,
        upComingMovies: null,
        gptSearchMovies: null,
        isGpt: false
    },
    reducers: {
        addNowPlayingMovies: (state, actions) => {
            state.nowPlayingMovies = actions.payload;
        },
        addTrendingMovies: (state, actions) => {
            state.trendingMovies = actions.payload;
        },
        addPopularMovies: (state, actions) => {
            state.popularMovies = actions.payload;
        },
        addUpComingMovies: (state, actions) => {
            state.upComingMovies = actions.payload;
        },
        addGptSearchMovies: (state, actions) => {
            state.gptSearchMovies = actions.payload;
        },
        toggleGpt: (state) => {
            state.isGpt = !state.isGpt
        }
    }
})


export default movieSlice.reducer

export const { addNowPlayingMovies, addGptSearchMovies, addTrendingMovies, addPopularMovies, addUpComingMovies, toggleGpt } = movieSlice.actions