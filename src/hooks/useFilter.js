import { useMemo } from "react"
import { useSelector } from "react-redux"

const useFilter = () => {
    const { value, notes } = useSelector(({notesState}) => notesState)

    const sortedNotes = useMemo(() => {
        if(value) {
            return notes.filter(note =>
                note.tags !== null ? note.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
                :
                false
            )
        }

        return notes
    }, [notes, value])

    return sortedNotes
}

export default useFilter