import { configureStore } from '@reduxjs/toolkit'
import spinnerReducer from './slices/spinnerSlice'
import paisesReducer from './slices/paisesSlice'
import posicionesReducer from './slices/posicionesSlice'

export const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    paises: paisesReducer,
    posiciones: posicionesReducer
  }
})