import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteNote, editNote } from "../../services/services"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { addEditingNote, removeEditingNote } from "../../redux/actions/actions"

import styles from "./NoteItem.module.sass"

const NoteItem = ({title, tags, id}) => {
    const [ edit, setEdit ] = useState(false)
    const { editingNote } = useSelector(({notesState}) => notesState)
    const dispatch = useDispatch()
    
    const handleDeleteNote = () => {
        dispatch(deleteNote(id))
        if(id === editingNote.id) {
            dispatch(removeEditingNote())
        }
    }

    useEffect(() => {
        if(Object.keys(editingNote).length) {
            setEdit(true)
        } else {
            setEdit(false)
        }
    }, [setEdit, editingNote])
    
    return (
        <div className={styles.note__list__item}>
            <div className={styles.note__list__item__content}>
                <div className={styles.note__list__item__content__title}>
                    {
                        edit && editingNote.tags !== null && Object.keys(editingNote).length && editingNote.id === id ?
                        title.split(" ").map((word, id) =>
                            editingNote.tags.some(tag => word === tag.replace(/#/g, "")) ?
                                <span key={id} className={styles.note__list__item__content__title__active}> {word}</span> :
                                ` ${word} `
                        ) :
                        title
                    }
                </div>
                <div className={styles.note__list__item__content__tags__list}>
                    {
                        tags !== null &&
                            tags.map((tag, key) => {
                                return (
                                    <div key={key} className={styles.note__list__item__content__tags__list__item}>
                                        {tag}
                                        <FontAwesomeIcon
                                        onClick={() => dispatch(editNote({id, title, tags: tags.filter(item => item !== tag)}))}
                                        icon={faTimes} />
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
            <div className={styles.note__list__item__icons}>
                <div className={styles.note__list__item__icons__edit}>
                    {
                        !edit && 
                        <FontAwesomeIcon onClick={() => dispatch(addEditingNote({id, title, tags}))} icon={faPencilAlt} />
                    }
                </div>
                <div
                    className={styles.note__list__item__icons__trash}
                    onClick={handleDeleteNote}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            </div>
        </div>
    )
}

export default NoteItem
