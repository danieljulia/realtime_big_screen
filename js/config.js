let config={
    time_dospunts:400, //temps que triga a fer el zoom
    time_next_xifra:1200, //temps per donar segona xifra
    time_next:1500, //temps seguent pas
    time_stop:5, //temps en segons que està aturat quan apretes "p", hauria de ser menys de 10
    negative:false, //mode negatiu
    debug:true,  //mostrar rellotge
    hora_font_size:32,  //mida de la font per a l'hora
    dospunts_height:0  //posició vertical dels dos punts des de dalt (px)
  }
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const negative = urlParams.get('negative');
if(negative){
  config.negative=1;
}else{
  
}
