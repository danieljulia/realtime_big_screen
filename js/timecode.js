

class TimeCode {
  constructor() {
    this.phases=['h',':','m',':','s','p'];
    this.cphase=0;
    this.cdata;
    this.paused=false;

    const clockPanels = document.querySelectorAll('.clock-panel');
    this.panels = clockPanels.length ? Array.from(clockPanels) : [null];

    if(!config.debug){
      this.forEachEl('hora', function(elem){
        elem.style.display = 'none';
      });
    }
    if(config.negative && this.panels[0] === null){
      document.body.classList.add("negative");
    }

    if(!document.querySelector('.clock-panel')){
      this.forEachEl('hora', function(elem){
        if(config.hora_font_size){
          elem.style.fontSize = config.hora_font_size + 'px';
        }
      });
      if(config.dospunts_height != null){
        document.documentElement.style.setProperty('--dospunts-top', config.dospunts_height + 'px');
      }
    }

    this.preload();
    this.update();
    this.toggle = this.toggle.bind(this)
  }

  getEl(panel, name){
    if(panel){
      const selectors = {
        left: '.hand-left',
        right: '.hand-right',
        dospunts: '.dospunts',
        hora: '.hora'
      };
      return panel.querySelector(selectors[name]);
    }
    const ids = {
      left: 'hand-left',
      right: 'hand-right',
      dospunts: 'hand-dospunts',
      hora: 'hora'
    };
    return document.getElementById(ids[name]);
  }

  forEachEl(name, fn){
    for(var i=0;i<this.panels.length;i++){
      var elem = this.getEl(this.panels[i], name);
      if(elem) fn(elem, this.panels[i]);
    }
  }

  preload(){
    const images=[
      '0_L','1_L','2_L','3_L','4_L','5_L',
      '0_R','1_R','2_R','3_R','4_R','5_R',
      '2punts_A','2punts_B'
    ];
    for(var i=0;i<images.length;i++){
      new Image().src = 'images/'+images[i]+'.svg';
    }


   

  }
  update(){
  
    if(this.paused) return;
    if(this.cphase==0){
      this.createData();
    }
   // console.log("update fase ",this.cdata,this.cphase);
    this.paint();

    }

    createData(){
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      if(m<10) m="0"+m;
      var s = today.getSeconds();
      if(s<10) s="0"+s;

      //this.cdata=this.translate( "11:12:20");
      this.cdata=this.translate( h + ":" + m + ":" + s);
      console.log("hora: ",h + ":" + m + ":" + s);
      var timeStr = h+":"+m+":"+s;
      this.forEachEl('hora', function(elem){
        elem.innerHTML = timeStr;
      });
    }

  translate(hora){
      var res={h:{},m:{},s:{}};
      var chunks=hora.split(':');
      var hores=chunks[0];
      res.h=this.getMans(hores);
      var minuts=parseInt(chunks[1]);
      res.m=this.getMans(minuts);
      var segons=parseInt(chunks[2]);
      res.s=this.getMans(segons);
      console.log("traduccio ",res);
      return res;
  }
  
  getMans(num){
    var mans;
    if(num>9){
      var num1=parseInt(num/10);
      var num2=num%10;
      mans=[this.getMansSimple(num1),this.getMansSimple(num2)];
    }else{
      mans=this.getMansSimple(num,true);
    }
    return mans;
  }

  getMansSimple(num,zero){
    if(zero==undefined) zero=false;
    //console.log('getMansSimple',num);
    var mans;
    if(num>5){
        mans=[5,num-5]
    }else{
      if(zero){
        mans=[0,num];
      }else{
        mans=[num,-1];
      }
      
    }
    return mans;
  }


    paint(){
       if(this.paused){
         var that=this;
         setTimeout(function(){ that.paint(); }, 100);
         return;
       }
       // console.log("pintant fase ",this.cphase,this.cdata);
        var phase=this.phases[this.cphase];
        var that=this;
          var mans;


        if(phase=="p"){
          this.esborra();
          this.next();
          return;
        }else if(phase!=":"){
           mans=this.cdata[phase];
        }else{
           mans=[":","-1"];
        }
        
       
        this.pintaMans(mans); 

    }

    pintaMans(mans){
      var that=this;

   
      if(Array.isArray(mans[0]) && mans[0].length==2){
        this.mostraMans(mans[0]);

        //pausa
        setTimeout(function eraseFirst(){
          if(that.paused){
            setTimeout(eraseFirst, 100);
            return;
          }
          that.esborra();
        },config.time_next_xifra-300)

        setTimeout(function showSecond(){
          if(that.paused){
            setTimeout(showSecond, 100);
            return;
          }
          that.mostraMans(mans[1]);
          that.next();
        },config.time_next_xifra)

      }else{
        //console.log("pintamans else ",mans);
        this.mostraMans(mans);
        this.next();
      
      }

  
    }

    next(){
     

      //console.log("seguent pas");
        var that=this;
        setTimeout(function step(){
          if(that.paused){
            setTimeout(step, 100);
            return;
          }
          that.esborra();
          that.cphase++; 
          if(that.cphase==that.phases.length){
            that.createData();
            that.cphase=0;
          }
          that.paint();
        },config.time_next);
     
    }

    esborra(){
      var that=this;
      this.forEachEl('left', function(elem){
        elem.src='';
      });
      this.forEachEl('right', function(elem){
        elem.src='';
      });
    }

    toggle(){
  
      this.paused=!this.paused;
  
    }

    mostraMans(mans){
       var that=this;
       var dospunts=false;
       var primera_ma;
       var segona_ma;

        if(mans[0]==-1 && mans[1]==-1){
          this.esborra();
          return;
        }

        if(mans[0]==":"){
          dospunts=true;
        }else{
          primera_ma='images/'+mans[0]+'_R.svg';
        }
        
        if(mans[1]==-1){
           segona_ma='';
        }else{
           segona_ma='images/'+mans[1]+'_L.svg';
        }

        for(var i=0;i<this.panels.length;i++){
          this.paintMansOnPanel(this.panels[i], dospunts, primera_ma, segona_ma, mans);
        }
    }

    paintMansOnPanel(panel, dospunts, primera_ma, segona_ma, mans){
       var handLeft = this.getEl(panel, 'left');
       var handRight = this.getEl(panel, 'right');
       var dospuntsEl = this.getEl(panel, 'dospunts');
       if(!handLeft || !handRight || !dospuntsEl) return;

       handLeft.classList.remove('zoom');
       handRight.classList.remove('zoom');
       dospuntsEl.classList.remove('zoom2');

        if(mans[1]==-1){
           handLeft.classList.add('hand-centered');
        }else{
          handLeft.classList.remove('hand-centered');
        }
        
        if(dospunts){
          dospuntsEl.src='images/2punts_B.svg';
          setTimeout(function(){
            dospuntsEl.classList.add('zoom2');
          },config.time_dospunts);
          handLeft.src='';
          handRight.src=''
        }else{
          dospuntsEl.src='';
          handLeft.src=primera_ma;
          handRight.src=segona_ma
        }
       
        setTimeout(function(){
          handLeft.classList.add('zoom');
          handRight.classList.add('zoom');
        },config.time_dospunts);
    }

}

let t;
try {
  t = new TimeCode();
} catch (error) {
  console.error('TimeCode failed to start:', error);
}



var stopped=false;

document.addEventListener('keydown', function (event) {


  if (event.key === 'p') {
    
    if(stopped) return;

    stopped=true;
    if(t) t.paused=true;

    setTimeout(function(){
      if(t) t.paused=false;
      stopped=false;
    }, config.time_stop * 1000);

  }

});