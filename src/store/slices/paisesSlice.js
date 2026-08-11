import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  listaPaises: []
}

export const paisesSlice = createSlice({
  name: 'paises',
  initialState,
    reducers: {
        setContenidoPaises: (state, action) => {
            state.listaPaises = action.payload;
        }
    }
})

export const { setContenidoPaises } = paisesSlice.actions;

export default paisesSlice.reducer;