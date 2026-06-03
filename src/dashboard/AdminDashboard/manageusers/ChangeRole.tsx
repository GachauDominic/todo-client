import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { usersAPI, type TUser } from "../../../features/users/usersAPI";
import { useEffect } from "react";
import { toast } from "sonner";

type ChangeRoleInputs = {
  role: "user" | "admin";
};

type ChangeRoleProps = {
  user: TUser | null;
};

const schema = yup.object({
  role: yup.string().oneOf(['user', 'admin']).required("Role is required"),
})


const ChangeRole = ({user}: ChangeRoleProps) => {
  const [updateUser, {isLoading}] = usersAPI.useUpdateUserMutation(
    {fixedCacheKey: "updateUser"}
  );

  const {
    register, 
    handleSubmit,
    reset,
    setValue,
    formState : {errors},
  } = useForm<ChangeRoleInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: user ? (user.role as "user" | "admin") : "user", // Default to user's current role or "user"
    },
  })

  // Update form value when user changes
    // (so the modal always shows the correct role)
  useEffect(()=>{
    if (user) {
      setValue("role", user.role as "user" | "admin"); // sets the role based on the current role
    } else {
      reset();
    }
  }, [user, setValue, reset]);

  const onSubmit: SubmitHandler<ChangeRoleInputs> = async (data)=>{
  try {
    if(!user){
      toast.error('No user was selected for role change.');
      return;
    }
    await updateUser({id: user.id, role: data.role}).unwrap();
    toast.success('Role updated successfully!');
    reset({role: data.role});
    (document.getElementById('role_modal')as HTMLDialogElement)?.close();
  } catch (error) {
  console.error('Error updating role', error);
  toast.error('Failed to update role. Please try again.')    
  }
}

  return (
    <dialog id="role_modal" className="modal sm:modal-middle">
       <div  className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
          <h3 className="font-bold text-lg mb-4">Change Role</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-white font-semibold">Select Role:</label>
          <select
            {...register("role")}
            className="select select-bordered w-full bg-white text-black dark"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <span className="text-sm text-red-700">{errors.role.message}</span>
          )}
          <div className="modal-action">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className='loading loading-spinner text-primary'/> Updating...
                    </>
                  ) : "Update Role"}
                </button>
                <button 
                className='btn w-full sm:w-auto'
                type='button'
                onClick={()=>{
                  (document.getElementById('role_modal') as HTMLDialogElement)?.close();
                  reset();
                }}>
                  Cancel
                </button>
              </div>
        </form>
       </div>
    </dialog>
  )
}

export default ChangeRole
