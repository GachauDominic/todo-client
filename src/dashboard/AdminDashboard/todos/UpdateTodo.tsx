import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { todoAPI, type TTodo } from '../../../features/todos/todosApi';
import { useEffect } from 'react';
import { toast } from 'sonner';

type UpdateTodoProps = {
  todo: TTodo | null
}

type UpdateTodoInputs = {
  todoName: string;
  description: string;
  userId: number;
  dueDate: string;
  isCompleted: boolean;
};

const schema = yup.object({
  todoName: yup.string().max(75, 'Max 75 characters').required('Todo name is required'),
  description: yup.string().max(255, 'Max 255 characters').required('Description is required'),
  userId: yup.number().required( 'User ID is required').positive('User ID must be a positive number'),
  isCompleted: yup.boolean().default(false),
  dueDate: yup.string().required('Due date is required')  
})

const UpdateTodo = ({todo}: UpdateTodoProps ) => {
  const [updateTodo, {isLoading}] = todoAPI.useUpdateTodoMutation()
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateTodoInputs>({
    resolver: yupResolver(schema),
  });

  //Populate form when todo changes
  useEffect(()=>{
    if (todo) {
			setValue('todoName', todo.todoName);
			setValue('description', todo.description);
			setValue('userId', todo.userId);
			setValue('dueDate', todo.dueDate.slice(0, 10));
			setValue('isCompleted', todo.isCompleted);
    } else {
			reset()
    }
  }, [todo, setValue, reset])

  const onSubmit: SubmitHandler<UpdateTodoInputs> = async (data)=>{
    try {
			if (!todo) {
				toast.error('No todo selected for update');
				return;
			}
			const response = await updateTodo({...data, id: todo.id}).unwrap();
			toast.success("Todo updated successfully!");
			console.log(response);
			reset();
			(document.getElementById('update_modal') as HTMLDialogElement)?.close();

    } catch (error) {
			console.error("Error updating todo:", error);
			toast.error("Failed to update todo. Please try again.");
    }
  }

  
  return (
	<dialog id="update_modal" className="modal sm:modal-middle modal-bottom">
			<div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg" data-test='update-todo-dialog-box'>
				<h3 className="font-bold text-lg mb-4">Update Todo</h3>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<input
							data-test='todo-name-input'
							type="text"
							{...register("todoName")}
							placeholder="Todo Name"
							className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
					/>
					{errors.todoName && (
							<span className="text-sm text-red-700">{errors.todoName.message}</span>
					)}

					<textarea
						{...register("description")}
            data-test='todo-description-input'
						placeholder="Description"
						className="textarea textarea-bordered w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
					/>
					{errors.description && (
							<span className="text-sm text-red-700">{errors.description.message}</span>
					)}

					<input
						data-test='todo-userId-input'
						type="number"
						{...register("userId")}
						placeholder="User ID"
						className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
				/>
					{errors.userId && (
						<span className="text-sm text-red-700">{errors.userId.message}</span>
					)}

					<input
						data-test='todo-date-input'
						type="date"
						{...register("dueDate")}
						className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
					/>
					{errors.dueDate && (
						<span className="text-sm text-red-700">{errors.dueDate.message}</span>
					)}

					<div className="form-control">
						<label className="label cursor-pointer">
							<span className="label-text mr-4 text-white">Status</span>
							<div className="flex gap-4">
								<label className="flex items-center gap-1">
									<input
										data-test='update-todo-status-complete'
										type="radio"
										value="true"
										{...register("isCompleted")}
										className="radio radio-primary text-green-400"
									/>
									Completed
								</label>
								<label className="flex items-center gap-1">
									<input
										data-test='update-todo-status-pending'
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
								<span className="text-sm text-red-700">{errors.isCompleted.message}</span>
						)}

						<div className="modal-action">
							<button type="submit" className="btn btn-primary" 
								disabled={isLoading} 
								data-test='confirm-update-todo-submit-btn'
							>
								{isLoading ? (
									<>
										<span className="loading loading-spinner text-primary" /> Updating...
									</>
								) : "Update"}
							</button>
							<button
								className="btn"
								data-test='reject-update-todo-close-btn'
								type="button"
								onClick={() => {
									(document.getElementById('update_modal') as HTMLDialogElement)?.close();
									reset();
								}}
							>
									Close
							</button>
						</div>
				</form>
			</div>
		</dialog>
  )
}

export default UpdateTodo
