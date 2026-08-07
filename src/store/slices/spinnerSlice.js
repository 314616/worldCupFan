import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false
}

export const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload //true or false
        }
    }
})

export const { setLoading } = spinnerSlice.actions;

export default spinnerSlice.reducer;