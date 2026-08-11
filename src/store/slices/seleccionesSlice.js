import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  listaSelecciones: []
}

export const seleccionesSlice = createSlice({
  name: 'selecciones',
  initialState,
    reducers: {
        setContenidoSelecciones: (state, action) => {
            state.listaSelecciones = action.payload;
        }
    }
})

export const { setContenidoSelecciones } = seleccionesSlice.actions;

export default seleccionesSlice.reducer;