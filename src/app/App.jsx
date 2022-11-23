import { Comments } from '../features/comments/Comments'
import { AddCommentSection } from '../components/AddCommentSection/AddCommentSection'
import { selectComments } from '../features/comments/commentsSlice'
import { useSelector } from 'react-redux'
import data from '../data/data.json'
import './App.css'

const App = () => {
  const { currentUser, comments } = data
  const currentComments = useSelector(selectComments)

  return (
    <div className="App">
      <div className="container">
        <Comments currentUser={currentUser} currentComments={currentComments} />
        <AddCommentSection currentUser={currentUser} purpose={'send'} />
      </div>
    </div>
  )
}


export default App