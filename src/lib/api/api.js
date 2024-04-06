import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = 'http://localhost:3000/';

export const baseAPI = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	tagTypes: [
		"GetTodos",
	],
	endpoints: () => ({}),
});
