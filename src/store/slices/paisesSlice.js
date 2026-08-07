import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  listaPaises: [],
  cargados: false
}

export const paisesSlice = createSlice({
  name: 'paises',
  initialState,
    reducers: {
        setContenidoPaises: (state, action) => {
            state.listaPaises = action.payload;
            state.cargados = true;
        }
    }
})

export const { setContenidoPaises } = paisesSlice.actions;

export default paisesSlice.reducer;