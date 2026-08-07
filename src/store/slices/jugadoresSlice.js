 import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
    listaJugadores: []
 }

 export const jugadoresSlice = createSlice({
    name: 'jugadores',
    initialState,
    reducers:{
        cargarJugadores: (state, action) => {
            state.listaJugadores = action.payload;
        },
        agregarJugador: (state, action) => {
            state.listaJugadores.push(action.payload)
        }
    }
 })

 export const { cargarJugadores, agregarJugador } = jugadoresSlice.actions;

 export default jugadoresSlice.reducer;