import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  listaSelecciones: [],
  cargadosS: false
}

export const seleccionesSlice = createSlice({
  name: 'selecciones',
  initialState,
    reducers: {
        setContenidoSelecciones: (state, action) => {
            state.listaSelecciones = action.payload;
            state.cargadosS = true;
        }
    }
})

export const { setContenidoSelecciones } = seleccionesSlice.actions;

export default seleccionesSlice.reducer;