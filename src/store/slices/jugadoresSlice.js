 import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
    listaJugadores: [],
    cargadosJ: false
 }

 export const jugadoresSlice = createSlice({
    name: 'jugadores',
    initialState,
    reducers:{
        cargarJugadores: (state, action) => {
            state.listaJugadores = action.payload;
            state.cargadosJ = true;
        },
        agregarJugador: (state, action) => {
            state.listaJugadores.push(action.payload)
        },
        eliminarJugador: (state, action) =>{
            state.listaJugadores = state.listaJugadores.filter(jugador => jugador.id !== action.payload)
        }
    }
 })

 export const { cargarJugadores, agregarJugador, eliminarJugador } = jugadoresSlice.actions;

 export default jugadoresSlice.reducer;