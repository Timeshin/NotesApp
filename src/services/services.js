import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const _url = "https://notesapiheroku.herokuapp.com/api/notes"

const getNotes = createAsyncThunk(
    "notes/getNote",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(_url)
            return response.data   
        } catch (error) {
            return thunkAPI.rejectWithValue("error")
        }
    }
)

const postNote = createAsyncThunk(
    "notes/postNote",
    async ({title, tags}) => {
        const response = await axios.post(_url, {
            title: title,
            tags: tags
        })
        return response.data
    }
)

const editNote = createAsyncThunk(
    "notes/editNote",
    async ({id, title, tags = null}) => {
        await axios.patch(`${_url}/${id}`, { id, title, tags })
        return {id, title, tags}
    }
)

const deleteNote = createAsyncThunk(
    "notes/deleteNote",
    async (props) => {
        await axios.delete(`${_url}/${props}`)
        return props
    }
)

export {
    getNotes,
    postNote,
    editNote,
    deleteNote
}