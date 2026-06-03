import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";

export type TUser = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	role: string;
	image_url: string;
	isVerified: boolean;
}

export type TverifyUser = {
	email: string
	code: string
}

export const usersAPI = createApi ({
	reducerPath: 'usersAPI',
	baseQuery: fetchBaseQuery({
			baseUrl: ApiDomain,
			//preparing headers - todos
			prepareHeaders: (headers, {getState}) => {
				//RootState should be from .app/store
				const token = (getState() as RootState).user.token;
				// console.log("Token", token)
				if (token) {
					headers.set('Authorization', `Bearer ${token}`);
				} 
				headers.set('Content-Type', 'application/json');
				return headers;
			} 
	}),
	tagTypes: ['Users'],
	endpoints: (builder)=>({
			createUsers: builder.mutation<TUser, Partial<TUser>>({
					query: (newUser) => ({
							url: '/auth/register',
							method: 'POST',
							body: newUser
					}),
					invalidatesTags: ['Users']
			}),
			
			//verify users
			verifyUser: builder.mutation<{ message: string }, { email: string; code: string }>({
					query: (verificationData) => ({
							url: '/auth/verify',
							method: 'POST',
							body: verificationData,
					}),
			}),

			// get users
			getUsers: builder.query<TUser[], void>({
				query: ()=> '/auth/users',
				transformResponse: (response: { data: TUser[] }) => response.data,
				providesTags: ['Users'],
			}),

			//update user
			updateUser: builder.mutation<TUser, Partial<TUser> & { id: number }>({
					query: (user) => ({
							url: `/auth/user/${user.id}`,
							method: 'PUT',
							body: user,
					}),
				invalidatesTags: ['Users']
			}),

			//get user by their id
			getUserById: builder.query<TUser, number>({
				query: (id)=> `/user/${id}`,
				transformResponse: (response: { data: TUser }) => response.data,
			}),
	})

})
