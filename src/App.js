import { useEffect } from "react"
import { useDispatch } from "react-redux"
import NoteList from "./components/NoteList/NoteList"
import ControlPanel from "./components/ControlPanel/ControlPanel"
import SearchPanel from "./components/SearchPanel/SearchPanel"
import { getNotes } from "./services/services"

import "./App.sass"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])
  
  return (
    <div className="content">
      <ControlPanel/>
      <SearchPanel/>
      <NoteList/>
    </div>
  )
}

export default App

