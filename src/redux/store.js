import { configureStore } from "@reduxjs/toolkit"
import { notesState } from "./"

const store = configureStore({
    reducer: {
        notesState
    }
})

export default store