import { useDispatch } from "react-redux"
import { setValue } from "../../redux/actions/actions"

import styles from "./SearchPanel.module.sass"

const SearchPanel = () => {
    const dispatch = useDispatch()

    return (
        <div className={styles.search__panel}>
            <input
                onChange={e => dispatch(setValue(e.target.value))} 
                type="text" 
                placeholder="Search..." 
                 />
        </div>
    )
}

export default SearchPanel
