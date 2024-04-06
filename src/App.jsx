import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import CustomModal from './components/modal'
import handleAPIRequests from './helpers/handleApiRequest'
import {
  useAddTodoMutation,
  useGetTodosQuery,
  useEditTodoMutation,
  useDeleteTodoMutation,
} from './lib/api/todo'

function App() {
  const { data: todos, isFetching: isLoading } = useGetTodosQuery({})
  const [addTodo] = useAddTodoMutation()
  const [editTodo] = useEditTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const [adding, setIsadding] = useState(false)
  const initialState = {
    title: '',
  }
  const [state, setState] = useState(initialState)
  const [nextId, setNextId] = useState(0)
  const [edit, setEdit] = useState(false)
  const [editValues, setEditValues] = useState({})

  const Add = (e) => {
    e.preventDefault()
    setIsadding(true)
  }

  const onSuccess = () => {
    setState({ ...state, title: '' })
    setEditValues({ ...editValues, title: '' })
    setEdit(false)
    setIsadding(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      id: edit ? editValues?.id : nextId.toString(),
      title: edit ? editValues.title : state.title,
    }
    handleAPIRequests({
      request: edit ? editTodo : addTodo,
      id: editValues?.id,
      ...data,
      onSuccess: onSuccess,
    })
  }

  useEffect(() => {
    if (todos && todos.length > 0) {
      const maxId = Math.max(...todos.map((todo) => todo.id))
      setNextId(maxId + 1)
    }
  }, [todos])

  const onChange = (e) => {
    if (edit) {
      setEditValues({ ...editValues, title: e.target.value })
    }
    setState({ ...state, title: e.target.value })
  }

  const editToogle = (value) => {
    setEdit(true)
    setEditValues(value)
  }

  const handleDelete = (value) => {
    handleAPIRequests({
      request: deleteTodo,
      id: value.id,
    })
  }

  return (
    <div className='flex justify-center '>
      <div className='text-center w-[20%]  '>
        {adding && (
          <CustomModal
            modalIsOpen={adding}
            closeModal={() => setIsadding(false)}
          >
            <Form
              onSubmit={onSubmit}
              value={state.title}
              onChange={onChange}
              text={'Add'}
              placeholder={'Add todo'}
            />
          </CustomModal>
        )}
        <div className='mb-10 mt-20'>
          <button onClick={Add} className=' bg-blue-950 p-2 text-white'>Add todo</button>
        </div>
        {isLoading ? (
          <div>Loading .................</div>
        ) : (
          todos?.map((todo, idx) => {
            return (
              <div key={idx} className='flex justify-between items-center m-2'>
                <p> {todo?.title} </p>
                <div className='flex flex-row items-center gap-5'>
                  <button
                    className=' bg-green-500 p-2'
                    onClick={() => editToogle(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className=' bg-red-500 p-2'
                    onClick={() => handleDelete(todo)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
      {edit && (
        <CustomModal modalIsOpen={edit} closeModal={() => setEdit(false)}>
          <Form
            onSubmit={onSubmit}
            value={editValues.title}
            onChange={onChange}
            text={'Edit'}
            placeholder={'Edit todo'}
          />
        </CustomModal>
      )}
    </div>
  )
}

export default App
