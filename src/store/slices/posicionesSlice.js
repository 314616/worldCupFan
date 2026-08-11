import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  listaPosiciones: []
}

export const posicionesSlice = createSlice({
  name: 'posiciones',
  initialState,
    reducers: {
        setContenidoPosiciones: (state, action) => {
            state.listaPosiciones = action.payload;
        }
    }
})

export const { setContenidoPosiciones } = posicionesSlice.actions;

export default posicionesSlice.reducer;