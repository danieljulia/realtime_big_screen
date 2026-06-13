let config={
    time_dospunts:400, //temps que triga a fer el zoom
    time_next_xifra:1200, //temps per donar segona xifra
    time_next:1500, //temps seguent pas
    time_stop:5, //temps en segons que està aturat quan apretes "p", hauria de ser menys de 10
    negative:false, //mode negatiu
    debug:true,  //mostrar rellotge
    hora_font_size:32,  //mida de la font per a l'hora
    hand_width_percent:50,
    hand_centered_margin_left_percent:25,
    hands_offset_left_px:0,
    hands_offset_bottom_px:0,
    dospunts_left_px:0,
    dospunts_zoom_margin_left_px:50,
    hora_bottom_px:20,
    hora_left_percent:50,
    debug_aspect_ratio:false
  }

function applyLayoutConfig(){
  const root = document.documentElement;
  root.style.setProperty('--hand-width', config.hand_width_percent + '%');
  root.style.setProperty('--hand-centered-margin-left', config.hand_centered_margin_left_percent + '%');
  root.style.setProperty('--hands-offset-left', config.hands_offset_left_px + 'px');
  root.style.setProperty('--hands-offset-bottom', config.hands_offset_bottom_px + 'px');
  root.style.setProperty('--dospunts-left', config.dospunts_left_px + 'px');
  root.style.setProperty('--dospunts-zoom-margin-left', config.dospunts_zoom_margin_left_px + 'px');
  root.style.setProperty('--hora-font-size', config.hora_font_size + 'px');
  root.style.setProperty('--hora-bottom', config.hora_bottom_px + 'px');
  root.style.setProperty('--hora-left', config.hora_left_percent + '%');
  applyAspectRatioDebug();
}

function applyAspectRatioDebug(){
  var el = document.getElementById('aspect-ratio-debug');
  if(config.debug_aspect_ratio){
    if(!el){
      el = document.createElement('div');
      el.id = 'aspect-ratio-debug';
      el.className = 'aspect-ratio-debug';
      document.body.appendChild(el);
    }
    el.style.display = 'block';
  }else if(el){
    el.style.display = 'none';
  }
}
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const negative = urlParams.get('negative');
if(negative){
  config.negative=1;
}else{
  
}

