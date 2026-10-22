function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getConfig') {
    return responderJSON(getConfiguracionInicial());
  } else if (action === 'getCatalogos') {
    return responderJSON(getCatalogos());
  }
  
  return responderJSON({ estatus: 'API Activa' });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'login') {
      return responderJSON(loginUsuario(data.pin));
    } else if (data.action === 'guardarCotizacion') {
      return responderJSON(guardarCotizacion(data.payload));
    }
  } catch (err) {
    return responderJSON({ exito: false, mensaje: err.toString() });
  }
}

function responderJSON(contenido) {
  return ContentService.createTextOutput(JSON.stringify(contenido))
    .setMimeType(ContentService.MimeType.JSON);
}
