// Configuració compartida dels panells de 512x256
// (left.html, right.html, horizontal.html, vertical.html)
// Tot en pixels absoluts: el panell no es responsive, funciona nomes a la mida donada.
// Les imatges PNG es mostren a mida natural, multiplicada per image_scale.
var config = {
  time_dospunts: 400,
  time_next_xifra: 1200,
  time_next: 1500,
  time_stop: 5,
  debug: false, //pinta la linia vermella de la mida.. posar a false per desactivar
  show_hora: true,                     // mostra la hora digital (independent de debug)
  hora_only_two_hands: false,           // la hora només surt quan hi ha dues mans pintades
  panel_width_px: 512,                 // panel width (px)
  panel_height_px: 256,                // panel height (px)

  // -- refinament de la posició de les mans --
  image_scale: 1,                      // escala de totes les imatges (1 = mida natural)
  hands_margin_px: 10,                // marge exterior quan hi ha 2 mans (esquerra→límit 0, dreta→límit dret)
  hands_align: 'flex-end',             // alineació vertical: flex-start | center | flex-end
  hands_center_offset_px: 0,           // desplaçament horitzontal del grup (+ dreta, - esquerra)
  hands_offset_y_px: 0,                // desplaçament vertical del grup (+ avall, - amunt)

  // -- dos punts (:) --
  dospunts_left_px: -130,                 // offset horitzontal respecte el centre del panell
  dospunts_top_px: 80,                 // posició vertical des de dalt (px)
  dospunts_zoom_margin_left_px: 5,     // desplaçament del "zoom" dels dos punts

  // -- hora de debug --
  hora_font_size: 14,                  // clock digits font size (px)
  hora_font_family: 'Arial',           // clock digits font family
  hora_font_weight: 900,               // clock digits font weight: normal | bold | 100-900
  hora_bottom_px: 10,                  // clock digits distance from bottom
  hora_left_px: 256                    // clock digits horizontal position from panel left
};

function applyPanelLayout() {
  const root = document.documentElement;
  root.style.setProperty('--panel-width', config.panel_width_px + 'px');
  root.style.setProperty('--panel-height', config.panel_height_px + 'px');
  root.style.setProperty('--image-scale', config.image_scale);
  root.style.setProperty('--hands-margin', config.hands_margin_px + 'px');
  root.style.setProperty('--hands-align', config.hands_align);
  root.style.setProperty('--hands-center-offset', config.hands_center_offset_px + 'px');
  root.style.setProperty('--hands-offset-y', config.hands_offset_y_px + 'px');
  root.style.setProperty('--dospunts-left', config.dospunts_left_px + 'px');
  root.style.setProperty('--dospunts-zoom-margin-left', config.dospunts_zoom_margin_left_px + 'px');
  root.style.setProperty('--dospunts-top', config.dospunts_top_px + 'px');
  root.style.setProperty('--hora-font-size', config.hora_font_size + 'px');
  root.style.setProperty('--hora-font-family', config.hora_font_family);
  root.style.setProperty('--hora-font-weight', config.hora_font_weight);
  root.style.setProperty('--hora-bottom', config.hora_bottom_px + 'px');
  root.style.setProperty('--hora-left', config.hora_left_px + 'px');

  if (config.debug) {
    var rect = document.createElement('div');
    rect.className = 'panel-debug-rect';
    document.body.appendChild(rect);
  }
}

applyPanelLayout();
