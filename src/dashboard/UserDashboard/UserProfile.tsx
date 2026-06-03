import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../app/store" 
import { usersAPI } from "../../features/users/usersAPI"
import UpdateProfile from "./UpdateProfile"
import { useNavigate } from "react-router"
import { logout } from "../../features/login/userSlice"

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state: RootState)=> state.user)
  const user_id = user.user?.user_id

  const {data, isLoading, error, refetch} = usersAPI.useGetUserByIdQuery(user_id ?? 0, { 
    skip: !user_id
  })

  console.log(`The loged in user is`, data);

  return (
    <div>
      {/* modal */}
      {data && <UpdateProfile user={data} refetch={refetch} />}

      {isLoading ? (
        <p>Loading...</p>

      ) : error ? (
        <p>Error Loading profile</p>
        
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md h-screen">
          <h2 className="text-xl font-semibold mb-4">User's information</h2>

          <div className="flex flex-col items-center mb-4 gap-4 border border-gray-300 p-4 rounded">

            <div className="">
              <img className="w-24 h-24 object-cover rounded-full mx-auto mb-2 border-gray-400"
              src={data?.image_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt="Image Profile" />
              <h3 className="text-lg font-bold">Name: {data?.firstName} {data?.lastName}</h3>
              <p className="text-gray-600">Id: {data?.id} </p>
              <p className="text-gray-600">Email: {data?.email} </p>
              <p className="text-gray-600">Role: {data?.role} </p>
              <p className="text-gray-600">Verified: {data?.isVerified ? `Yes` : `No`} </p>
            </div>
          </div>

          {/* update profile */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button 
              className="btn btn-primary flex mx-auto"
              onClick={()=>{
                (document.getElementById('update_profile_modal') as HTMLDialogElement)?.showModal();
              }}
            >
              Update Profile
            </button>

            <button className="btn btn-primary flex mx-auto"
              onClick={()=>{
                dispatch(logout())
                navigate("/")
              }}
            >
              Log out
            </button>
          </div>
          
        </div>
      )}

    </div>
  )
}

export default UserProfile
