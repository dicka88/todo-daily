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
  async (id, { dispatch }) => {
    todoService.subscribeTodosChange(id, (snapshot) => {
      // prevent add 2x
      if (snapshot.metadata.hasPendingWrites) return;

      snapshot.docChanges().forEach((change) => {
        const { type } = change;
        const { id } = change.doc;
        const data = change.doc.data();

        const todo = {
          ...data,
          createdAt: data.createdAt.toDate()
        };

        console.log(type, todo);

        if (type == "added") {
          dispatch(addTodo(todo));
        } else if (type == "modified") {
          dispatch(updateTodo({
            id,
            todo
          }));
        } else if (type == "removed") {
          dispatch(removeTodo({ id }));
        }
      });
    });
  }
);

// export const fetchTodosByDate = createAsyncThunk(
//   'todos/fetchTodosByDate',
//   async (date, thunkApi) => {
//     const todos = await todoService.getTodosByDate(date);
//     todos.map(todo => {
//       thunkApi.dispatch(addTodo(todo));
//     });
//     // return { date, todos };
//   }
// );

export const fetchAddTodo = createAsyncThunk(
  'todos/fetchAddTodo',
  async (data, { dispatch }) => {
    data.completed = false;
    data.date = data.date ? dayjs(data.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
    data.createdAt = new Date();

    try {
      dispatch(addTodo(data));
      const res = await todoService.addTodo(data);
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
      const { task, description, date, createdAt } = action.payload;

      state.push({
        id: state.length + 1,
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