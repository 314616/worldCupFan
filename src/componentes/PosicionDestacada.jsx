import { useSelector } from 'react-redux';

const PosicionDestacada = () => {
  const { listaJugadores = [] } = useSelector((state) => state.jugadores);


  if (listaJugadores.length === 0) {
    return (
      <div className="card p-3 border-0 shadow-sm text-center" style={{ backgroundColor: '#ffffff', borderRadius: '4px', minHeight: '160px' }}>
        <p className="mb-0 fw-semibold text-muted mt-2" style={{ fontSize: '15px' }}>No hay jugadores registrados</p>
      </div>
    );
  }

  // 2. CONTADORES DE BALANZA
  let totalArqueros = 0;
  let totalJugadoresCampo = 0;

  // 3. CLASIFICACIÓN UTILIZANDO LOS IDS REALES DE LA API
  listaJugadores.forEach((jugador) => {
    // Convertimos a número por seguridad para que la comparación estricta de tipos funcione siempre
    const idPosicionActual = Number(jugador.posicion);

    if (idPosicionActual === 1) {
      totalArqueros++;
    } else if (idPosicionActual === 2 || idPosicionActual === 3 || idPosicionActual === 4) {
      totalJugadoresCampo++;
    }
  });

  // 4. COMPARACIÓN Y CONFIGURACIÓN VISUAL (Requerimiento del obligatorio)
  // Evaluamos si hay más jugadores de campo que arqueros, o viceversa
  const masJugadoresDeCampo = totalJugadoresCampo >= totalArqueros;
  
  const emojiVisual = masJugadoresDeCampo ? "⚽" : "🥅";
  const tituloVisual = masJugadoresDeCampo ? "Jugadores de Campo" : "Goleros";
  const detalleVisual = masJugadoresDeCampo 
    ? `${totalJugadoresCampo} en el campo vs ${totalArqueros} bajo los tres palos`
    : `${totalArqueros} arqueros vs ${totalJugadoresCampo} en el campo`;

  return (
    <div className="card p-3 border-0 shadow-sm h-100" style={{ backgroundColor: '#ffffff', borderRadius: '4px', minHeight: '160px'  }}>
      <div className="d-flex align-items-center justify-content-center mt-2">
        {/* Renderizado de Pelota o Arco segun el conteo */}
        <span style={{ fontSize: '2.5rem', marginRight: '12px' }} aria-hidden="true">
          {emojiVisual}
        </span>
        <div className="text-start">
          <p className="mb-0 fw-bold text-dark" style={{ fontSize: '18px', lineHeight: '1.2' }}>
            {tituloVisual}
          </p>
          <small className="text-muted">
            {detalleVisual}
          </small>
        </div>
      </div>
    </div>
  );
};

export default PosicionDestacada;
