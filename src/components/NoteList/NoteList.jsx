import { useSelector } from 'react-redux'
import useFilter from '../../hooks/useFilter'
import NoteItem from '../NoteItem/NoteItem'

import styles from "./NoteList.module.sass"

const NoteList = () => {
    const { error } = useSelector(({notesState}) => notesState)
    const notes = useFilter()

    if(error.length !== 0) {
        return <h1 className={styles.error}>{error}</h1>
    }

    return (
        <div className={styles.note__list} >
            {
                notes.map(item => {
                    return <NoteItem key={item.id}
                     title={item.title}
                     tags={item.tags}
                     id={item.id}
                     />
                })
            }
        </div>
    )
}

export default NoteList
