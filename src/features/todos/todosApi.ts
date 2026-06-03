import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store"; 

//prop
export type TTodo = {
  id: number;
  todoName: string;
  description: string;
  userId: number;
  dueDate: string;
  createdAt: string;
  isCompleted: boolean;
}

export const todoAPI = createApi ({
  reducerPath: 'todoAPI',
  baseQuery: fetchBaseQuery ({
    baseUrl: ApiDomain,

    //preparing headers - todos
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).user.token
      console.log("Token", token)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } 
      headers.set('Content-Type', 'application/json');
      return headers;
      
    } 
  }),
  // invalidate mutations with tagTypes
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    //while changing something in the db we use the mutation
    createTodo: builder.mutation<TTodo, Partial<TTodo>> ({
      query: (newTodo) => ({
        url: '/todo',
        method: 'POST',
        body: newTodo
      }),
      invalidatesTags: ['Todos']
    }),
    //while getting something from the db we use the query
    getTodos: builder.query<{data: TTodo[]}, void> ({
      //void means no parameters are needed to fetch the todos
      query: () => '/todos',
      providesTags: ['Todos'] // this tells RTK Query that this endpoint provides the Todos tag, so it can be used to invalidate the cache when a new todo is created

    }),
    //in the mutation statement the value before the first comma is the value expected back while the value after the comma is what we give/input
    updateTodo: builder.mutation<TTodo, Partial<TTodo> & {id:number}> ({
      query: ({id, ...changes}) => ({ //THE NAME GIVEN TO THE QUERY IS DEV CHOSEN
        url: `/todo/${id}`,
        method: 'PUT',
        body: changes,
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation<{success: boolean, id: number}, number>({
      query: (id) => ({
        url: `/todo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos']
    }),
    // get todos by user id
    getTodosByUserId: builder.query<{ data: TTodo[] }, number>({
      query: (userId) => `/todos/user/${userId}`,
      providesTags: ['Todos'] // this tells RTK Query that this endpoint provides the Todos tag, so it can be used to invalidate the cache when a new todo is created
    })
  })
})