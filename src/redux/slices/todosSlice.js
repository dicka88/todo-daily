import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs from 'dayjs';
import { todoService } from "../../services/todoService";

// Redux thunk async
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (id) => {
    const todos = await todoService.getTodos(id);

    return todos;
  }
);

export const subscribeTodosChange = createAsyncThunk(
  'todos/subscribeTodosChange',
  async (uid, { dispatch }) => {
    todoService.subscribeTodosChange(uid, (snapshot) => {
      // prevent add 2x
      if (snapshot.metadata.hasPendingWrites) return;

      snapshot.docChanges().forEach((change) => {
        const { type } = change;
        const data = change.doc.data();

        const todo = {
          id: change.doc.id,
          ...data,
          createdAt: data.createdAt.toDate()
        };

        if (type == "added") {
          dispatch(addTodo(todo));
        }
      });
    });
  }
);

export const fetchAddTodo = createAsyncThunk(
  'todos/fetchAddTodo',
  async (data, { dispatch }) => {
    data.completed = false;
    data.date = data.date ? dayjs(data.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
    data.createdAt = new Date();

    try {
      const { id } = await todoService.addTodo(data);
      data.id = id;
      dispatch(addTodo(data));
    } catch (e) {
      console.log(err);
    }
  }
);

export const fetchUpdateTodo = createAsyncThunk(
  'todos/fetchUpdateTodo',
  async (data, { dispatch }) => {
    const { id, todo } = data;
    dispatch(updateTodo(data));

    await todoService.updateTodo(id, todo);
  }
);

export const fetchRemoveTodo = createAsyncThunk(
  'todos/fetchRemoveTodo',
  async (id, thunkApi) => {
    thunkApi.dispatch(removeTodo({ id }));
    const res = await todoService.removeTodo(id);
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    replaceState(state, { payload }) {
      return payload;
    },
    addTodo(state, action) {
      const { id, task, description, date, createdAt } = action.payload;

      state.push({
        id: id,
        task,
        description,
        date,
        createdAt,
        completed: false,
      });
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
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const { addTodo, updateTodo, removeTodo, replaceState } = todosSlice.actions;

export const selector = {
  getTodos: (date) => {
    return (state) => {
      const todos = state.todos.filter(item => {
        return date == item.date;
      });

      return todos;
    };
  },
  getAllTodo: (state) => state.todos
};

export default todosSlice.reducer;