import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeEditingNote } from "../../redux/actions/actions"
import useInput from "../../hooks/useInput"
import { deleteNote, editNote, postNote } from "../../services/services"

import styles from "./ControlPanel.module.sass"

const ControlPanel = () => {
    const { value, setValue, onChange } = useInput()
    const { editingNote } = useSelector(({notesState}) => notesState)
    const dispatch = useDispatch()
    const buttonRef = useRef()

    useEffect(() => {
        if(Object.keys(editingNote).length) {
            setValue(editingNote.title)
        } else {
            setValue('')
        }
    }, [editingNote, setValue])

    const handleKeyDown = (e) => {
        if(e.keyCode === 13) {
            buttonRef.current.click()
        }
    }

    const handleEditNote = () => {
        if(value.trim().length === 0) {
            dispatch(removeEditingNote())
            dispatch(deleteNote(editingNote.id))
            return
        }

        if(value === editingNote.title) {
            dispatch(removeEditingNote())
        } else {
            const tagsReg = /#\w+/gi
            const hashtag = /#/g
            let tags = editingNote.tags

            if (tags === null) {
                tags = []
            }

            const returnedTags = value.match(tagsReg) !== null ?
             [...tags, ...value.match(tagsReg)] :
             tags
            
            dispatch(editNote({id: editingNote.id, title: value.replace(hashtag, ""), tags: returnedTags}))
            dispatch(removeEditingNote())
        }
    }

    const onClickHandler = () => {
        const tagsReg = /#\w+/gi
        const hashtag = /#/g

        if(Object.keys(editingNote).length) {
            return handleEditNote()
        }

        if(value.trim().length !== 0) {
            dispatch(postNote({title: value.replace(hashtag, ""), tags: value.match(tagsReg)}))
            setValue("")
        } else {
            alert("input is empty")
        }
    }

    return (
        <div className={styles.control__panel}>
            <input 
                type="text" 
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                placeholder={ !Object.keys(editingNote).length ? "Add note..." : "Editing..." } />
            <button 
                ref={buttonRef} 
                className={styles.control__panel__btn}
                onClick={() => onClickHandler()}
                >
                    {
                        !Object.keys(editingNote).length ? "add note" : "edit note"
                    }
                </button>
        </div>
    )
}

export default ControlPanel
