import { useForm, type SubmitHandler} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { todoAPI } from '../../../features/todos/todosApi';
import { toast } from 'sonner';

type CreateTodoInputs = {
  todoName: string;
  description: string;
  userId: number;
  dueDate: string;
  isCompleted: boolean;
};

const schema = yup.object({
  todoName: yup.string().max(70, "Max is 75 characters").required("Todo name is required"),
  description: yup.string().max(70, "Max is 75 characters").required("Description is required"),
  userId: yup.number().positive("The userId must be a positive number").required("Usser ID is required").integer("User ID must be an integer"),
  isCompleted: yup.boolean().default(false),
  dueDate: yup.string().required("Due date is required"),
});

const CreateTodo = () => {

  const [createTodo, {isLoading}] = todoAPI.useCreateTodoMutation()
  
  const {
    register, 
    handleSubmit,
    reset, 
    formState: {errors},
  } = useForm<CreateTodoInputs>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<CreateTodoInputs> = async(data)=>{
    console.log(data);
    try {
      await createTodo(data).unwrap()
      toast.success("Todo created successfuly!");
      reset();
      (document.getElementById('create_todo') as HTMLDialogElement)?.close()

    } catch (error) {
      console.error("Error creating todo", error);
      toast.error("Faild to create todo. Please try again.");
    }
  }

  return (
    <dialog id='create_todo' className='modal sm:modal-middle'>
      <div  className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className='font-bold text-lg mb-4'>Create New Todo</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

          <input type="text" 
          data-test='todo-name-input'
          {...register("todoName")}
          placeholder="Todo Name"
          className="input rounded w-full p-2 focus:ring-blue-500 text-large bg-white text-gray-600"
          />
          {errors.todoName && (
            <span className='text-sm text-red-700'>{errors.todoName.message}</span>
          )}

          <textarea 
            {...register("description")}
            placeholder='Description'
            className='textarea textarea-bordered w-full p-2 focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white'
          />
          {errors.description && (
            <span className='text-sm text-red-700'>{errors.description.message}</span>
          )}

          <input type="number" 
          data-test='todo-userId-input'
          {...register("userId")}
          placeholder="User ID"
          className="input rounded w-full p-2 focus:ring-blue-500 text-large bg-white text-gray-600"
          />
          {errors.userId && (
            <span className='text-sm text-red-700'>{errors.userId.message}</span>
          )}

          <input type="date" 
          data-test='todo-date-input'
          {...register("dueDate")}
          placeholder="Due Date"
          className="input rounded w-full p-2 focus:ring-blue-500 text-large bg-white text-gray-600"
          />
          {errors.dueDate && (
            <span className='text-sm text-red-700'>{errors.dueDate.message}</span>
          )}

           <div className="form-control">
              <label className="label cursor-pointer">
                  <span className="label-text mr-4 text-white">Status</span>
                  <div className="flex gap-4">
                      <label className="flex items-center gap-1">
                          <input
                              data-test='todo-status-complete'
                              type="radio"
                              value="true"
                              {...register("isCompleted")}
                              className="radio radio-primary text-green-400"
                          />
                          Completed
                      </label>
                      <label className="flex items-center gap-1">
                          <input
                              data-test='todo-status-pending'
                              type="radio"
                              value="false"
                              {...register("isCompleted")}
                              className="radio radio-primary text-yellow-400"
                              defaultChecked
                          />
                          Pending
                      </label>
                  </div>
              </label>
            </div>
            {errors.isCompleted && (
              <span className='text-sm text-red-700'>{errors.isCompleted.message}</span>
            )}

            <div className="modal-action">
              <button 
              data-test='create-todo-submit-btn'
              className="btn btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className='loading loading-spinner text-primary'/> Creating...
                  </>
                ) : "Create"}
              </button>
              <button 
              className='btn'
              type='button'
              onClick={()=>
                (document.getElementById('create_todo') as HTMLDialogElement)?.close()}
              >
                Close
              </button>
            </div>
          
        </form>
        
      </div>

    </dialog>
  )
}

export default CreateTodo
