import { createSlice } from "@reduxjs/toolkit"
import { getNotes, postNote, deleteNote, editNote } from "../../services/services"


const initialState = {
    notes: [],
    value: "",
    editingNote: {},
    loading: true,
    error: ""
}

const notesSlice = createSlice({
    name: "notesSlice",
    initialState,
    reducers: {
        addEditingNote: (state, action) => {
            state.editingNote = {...action.payload}
        },
        removeEditingNote: (state, action) => {
            state.editingNote = {}
        },
        setValue: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: {
        [getNotes.fulfilled]: (state, action) => { // fulfilled (successful), pending (waiting), rejected (error)
            state.notes = action.payload
            state.loading = false
        },

        [getNotes.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },


        [postNote.fulfilled]: (state, action) => {
            state.notes.push(action.payload)
        },


        [deleteNote.fulfilled]: (state, action) => {
            state.notes = state.notes.filter(item => item.id !== action.payload)
        },

        [editNote.fulfilled]: (state, action) => {
            state.notes = state.notes.map(item =>
                item.id === action.payload.id ? {...item, title: action.payload.title, tags: action.payload.tags} :
                item
            )
        }
    }
})

const { actions, reducer } = notesSlice

export const { addEditingNote, removeEditingNote, setValue } = actions

export default reducer