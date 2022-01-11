import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notes: []
}

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {

    },
    extraReducers: {

    }
})

const { action, reducer } = notesSlice

// export const {  } = action

export default reducer