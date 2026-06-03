import { useSelector } from "react-redux"
import type { RootState } from "../app/store"; 

const Welcome = () => {
    const currentUser = useSelector((state: RootState) => state.user)
    console.log("currentUser", currentUser);
    const name = currentUser.user?.first_name
    console.log("name", name);
    return (
        <div>Welcome!
            {name ? `, ${name}` : ''}
            <p>Here you can manage your account, view your profile, and access other features.</p>
        </div>
    )
}

export default Welcome