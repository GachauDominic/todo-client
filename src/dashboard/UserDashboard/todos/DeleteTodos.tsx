import { todoAPI, type TTodo } from '../../../features/todos/todosApi';
import { toast } from 'sonner';

type DeleteTodoProps = {
  todo: TTodo | null;
} 

const DeleteTodos = ({todo}: DeleteTodoProps) => {
  const [deleteTodo, {isLoading}]= todoAPI.useDeleteTodoMutation(
    // { fixedCacheKey: "deleteTodo" } //used to prevent cache invalidation issues - in simple terms, it helps to keep the cache consistent
  )

  const handleDelete = async ()=>{
    try {
      if (!todo) {
        toast.error("No todo selected for deletion")
        return;        
      } 
      await deleteTodo(todo.id)
      toast.success("Todo deleted successfully!");
      (document.getElementById('delete_modal')as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error deleting todo.", error);
      toast.error("Failed to delete todo. Please try again.");
    }
  }
  
  return (
    <dialog id='delete_modal' className='modal modal-bottom sm:modal-middle'>
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs size-max-w-lg mx-auto rounded-lg">
        <h3 className='font-bold text-lg mb-4'>Delete Todo</h3>
        <p className="mb-6">
          Are you sure you want to delete <span className='font-semibold'>{todo?.todoName}</span>?
        </p>

        <div className="modal-action">
          <button 
          data-test="delete-todo-confirm-btn"
          className="btn btn-primary" 
          onClick={handleDelete}
          disabled={isLoading}>
              {isLoading ? (
                  <>
                      <span className="loading loading-spinner text-primary" /> Deleting...
                  </>
              ) : "Yes, Delete"}
          </button>
          <button
              className="btn"
              type="button"
              onClick={() => 
                  (document.getElementById('delete_modal') as HTMLDialogElement)?.close()}
          >
              Cancel
          </button>
        </div>
        
      </div>
    </dialog>
  )
}

export default DeleteTodos