let map = L.map('map').setView([4.639386, -74.082412], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

document.getElementById('select-location').addEventListener('change', function (e) {
  let coords = e.target.value.split(",");
  let zoomLevel = 38; // Nivel de zoom deseado
  map.flyTo(coords, zoomLevel, {
    animate: true,
    duration: 2,
    easeLinearity: 0.25, // Ajusta la suavidad de la animación (0.25 es un buen valor por defecto)
  });
});

let selectLocation = document.getElementById('select-location');

selectLocation.addEventListener('change', function () {
  let selectedLocation = selectLocation.value.split(',').map(parseFloat);

  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  let [nombreLugar, direccion, informacionAdicional, imagenPath] = obtenerInformacionPorLugar(selectLocation.value);

  let marker = L.marker(selectedLocation).addTo(map);

  let popupContent = `
        <strong>${nombreLugar}</strong><br>
        Dirección: ${direccion}<br>
        Información adicional: ${informacionAdicional}<br>
        <img src="${imagenPath}" alt="${nombreLugar}" width="100%">
    `;

  marker.bindPopup(popupContent).openPopup();

  map.flyTo(selectedLocation, 15, {
    animate: true,
    duration: 2,
    easeLinearity: 0.25,
  });
});

function obtenerInformacionPorLugar(coordenadas) {
  switch (coordenadas) {
    case "7.07309137105379, -73.8644431485246":
      return ["Estadio Daniel Villa Zapata", "Villa Olimpica", "Apertura: 1970 (53 años)", "Imagenes/Villa zapata.jpg"];
    case "7.071230105167951, -73.86609089454116":
      return ["Coliseo Deportivo Luis Francisco Castellanos", "Villa Olimpica", "Apertura, 1988.<br> Remodelación, 3 de septiembre de 2013 (10 años)", "Imagenes/coliseo.jpg"];
    case "7.070546565787691,-73.86469241494183":
      return ["Patinódromo Municipal", "Cl. 65 #15028", "Ha sido escenario deportivo en los años 1996 y 2000 de los mundiales de patinaje de velocidad y en el 2008 escenario de la IX Copa América de patinaje. ", "Imagenes/Patrinodromo.jpg"];
    case "7.071562821329532, -73.86345132435103":
      return ["Piscina Olímpica", "Inderba", "Después de 12 años la piscina olímpica de Inderba volvió a entrar en funcionamiento gracias a la gestión del ex Alcalde Alfonso Eljach", "Imagenes/piscina.jpg"];
    case "7.071673890131004, -73.8618684374395":
      return ["Cancha de Sóftbol", "Cl. 65 #15028", "Se inauguró el 10 de diciembre de 1976", "Imagenes/soft.PNG"];
    default:
      return ["Nombre Lugar", "Dirección Lugar", "Información adicional Lugar", "ruta/imagen_default.jpg"];
  }
}