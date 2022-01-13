import { useState } from "react"

const useInput = () => {
    const [ value, setValue ] = useState('')

    const changeHandler = (e) => {
        setValue(e)
    }

    return {
        value,
        setValue: setValue,
        onChange: changeHandler
    }
}

export default useInput