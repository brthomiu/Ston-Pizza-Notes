import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pizzaService from "./pizzaService";

const initialState = {
  pizza: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create pizza
export const createPizza = createAsyncThunk(
  "pizza/createPizza",
  async (pizza, thunkAPI) => {
    try {
      return await pizzaService.createPizza(pizza);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Like pizza
export const likePizza = createAsyncThunk(
  "pizza/likePizza",
  async (pizzaId, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user._id;
      return await pizzaService.likePizza(pizzaId, userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete pizza
export const deletePizza = createAsyncThunk(
  "pizza/deletePizza",
  async (_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await pizzaService.deletePizza(_id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      //createPizza
      .addCase(createPizza.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPizza.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pizza = action.payload;
      })
      .addCase(createPizza.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.pizza = null;
      })

      .addCase(deletePizza.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePizza.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = state.pizza.splice(
          state.pizza.indexOf(action.payload),
          1
        );
      })
      .addCase(deletePizza.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = pizzaSlice.actions;
export default pizzaSlice.reducer;
