import { baseAPI } from './api'

const todoEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      providesTags: ['GetTodos'],
      query: () => ({
        url: `tasks`,
        method: 'GET',
      }),
    }),
    addTodo: builder.mutation({
      invalidatesTags: ['GetTodos'],
      query: (DTO) => ({
        url: 'tasks',
        method: 'POST',
        body: DTO,
      }),
    }),
    editTodo: builder.mutation({
      invalidatesTags: ['GetTodos'],
      query: (DTO) => ({
        url: `tasks/${DTO?.id}`,
        method: 'PATCH',
        body: DTO,
      }),
    }),
    deleteTodo: builder.mutation({
      invalidatesTags: ['GetTodos'],
      query: (DTO) => ({
        url: `tasks/${DTO?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetTodosQuery , useAddTodoMutation ,useEditTodoMutation,useDeleteTodoMutation } = todoEndpoints
