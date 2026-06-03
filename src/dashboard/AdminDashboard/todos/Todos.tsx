import { todoAPI, type TTodo } from '../../../features/todos/todosApi'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever  } from "react-icons/md";
import CreateTodo from './CreateTodo';
import { useState } from 'react'
import UpdateTodo from './UpdateTodo';
import DeleteTodos from './DeleteTodos';

const Todos = () => {
  const {data: todosData, isLoading: todosLoading, error: todoError} = todoAPI.useGetTodosQuery(
  undefined,  
  {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000
  }
)

  const [selectedTodo, setSeletedTodo] = useState<TTodo | null>(null)
  const [todoToDelete, setTodoToDelete] = useState<TTodo | null>(null)
  
  const handleEdit = (todo: TTodo) => {
    setSeletedTodo(todo)
  }
 
  console.log('Todos:', todosData);
  // console.error(todoError);
  
  return (
    <div className='md:overflow-x-auto'>
      {/*Create Todo button  */}
       <div className="flex justify-center my-3">
        <button 
        data-test="create-todo-btn"
        className='btn bg-gray-600 text-white hover:bg-gray-700 border-gray-400 rounded-lg px-4 py-2 text-lg' onClick={()=> (document.getElementById('create_todo')as HTMLDialogElement)?.showModal()}>Create Todo</button>
      </div>

      {/* Modals */}
      <CreateTodo />
      <UpdateTodo todo={selectedTodo} />
      <DeleteTodos todo={todoToDelete} />
     
      {/* Display Todos */}
      {todosLoading && <p>loading todos...</p>}
      {todoError && <p className='text-red-500'> Error fetching the Todos! </p>}
      {
        todosData && todosData.data && todosData.data.length > 0 ? (

       <div className="overflow-x-auto">
        <table className='table table-xs table-pin-rows table-pin-cols'>
          <thead>
            <tr className='bg-gray-600 text-white text-md lg:text-lg'>
              <th className='px-4 py-2'>Todo Name</th>
              <th className='px-4 py-2'>Description</th>
              <th className='px-4 py-2'>Due Date</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              todosData.data.map((todo: TTodo) => (
                <tr key={todo.id} className='hover:bg-gray-300 border-b border-gray-400'>
                  <td className='px-4 py-2 border-r border-gray-400 lg:text-base'>{todo.todoName}</td>
                  <td className='px-4 py-2 border-r border-gray-400 lg:text-base'>{todo.description}</td>
                  <td className='px-4 py-2 border-r border-gray-400 lg:text-base'>{new Date(todo.dueDate).toLocaleDateString()}</td>
                  <td className='px-4 py-2 border-r border-gray-400 lg:text-base'>
                    <span className={`badge ${todo.isCompleted ? "badge-success" : "badge-warning"}`}>
                      {
                        todo.isCompleted ? (
                          <span className='text-green-700 lg:text-base'>Completed</span>
                        ) : (
                          <span className='text-yellow-700 lg:text-base'>Pending</span>
                        )
                      }
                    </span>
                  </td>
                    {/* Actions to Delete and Edit */}
                  <td>
                    <button className='btn btn-sm btn-primary mr-4 text-blue-500'
                      onClick={()=> {
                        handleEdit(todo);
                        (document.getElementById("update_modal") as HTMLDialogElement)?.showModal()
                      }}
                      > <FaEdit size={20} />
                      </button>

                    <button
                      data-test="delete-todo-btn"
                      onClick={()=>{
                        setTodoToDelete(todo);
                        (document.getElementById('delete_modal')as HTMLDialogElement)?.showModal();
                      }}
                      className='btn btn-sm btn-danger text-red-500'> <MdDeleteForever size={20} /> </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
       </div>
        ) : (
          <p> No todos found! </p>
        )
      }
    </div>
  )
}

export default Todos