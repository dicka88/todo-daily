import { createSlice } from "@reduxjs/toolkit";
import dayjs from 'dayjs';

const todosSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: 0,
      time: 1645614303888,
      task: "Cooking a tuna fish",
      description: "Cooking is my favorite activity",
      completed: false,
    }
  ],
  reducers: {
    addTodo(state, action) {
      const { task, description, time } = action.payload;

      console.log({
        task, description, time
      });

      state.push({
        id: state.length + 1,
        task,
        description,
        completed: false,
        time: time || new Date().getTime()
      });

      console.log(state);
    },
    updateTodo(state, action) {
      const { id, todo } = action.payload;
      const index = state.findIndex(item => item.id == id);
      state[index] = { ...state[index], ...todo };
    },
    removeTodo(state, action) {
      const { id } = action.payload;
      return state.filter(item => item.id != id);
    }
  }
});

export const { addTodo, updateTodo, removeTodo } = todosSlice.actions;

export const selector = {
  getTodos: (date) => {
    if (!date) {
      date = new Date();
    }

    return (state) => {
      const dt = dayjs(date).format('YYYY-MM-DD');
      const todos = state.todos.filter(item => {
        const formattedDate = dayjs(item.time).format('YYYY-MM-DD');
        return dt == formattedDate;
      });

      return todos;
    };
  },
  getAllTodo: (state) => state.todos
};

export default todosSlice.reducer;