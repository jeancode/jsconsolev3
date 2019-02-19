/*
    Hola querio programador espero que disfrutes es te codigo pues es muy simple y mejor que jsconsole v1 y v2 suerte
*/
function compartirConsole(e){
    
    var cop = e.getAttribute("rel");
    document.getElementById('consoleInputCopy').value = cop;
    
    document.getElementById('consoleInputCopy').select();
    
    document.execCommand('copy');
    
}
class Consola{
    constructor(element){
        if(element === undefined){
            console.log("Faltan parametros Consola");
        }
        this.element = element;
    }
}
Consola.prototype.start =  function(){
    
    var xid =  Math.floor((Math.random() * 10000) + 1);
    var meElement =  document.querySelector(this.element);
    
    var estructura = `
        <div class="consolaContenido" id="consoleContenido${xid}">
            <input type="text" value="" id="consoleInputCopy">
            <div class="consolaView"></div>
            <div class="consolaInput"><input type="text"></div>
           
        </div>
    `;
    meElement.innerHTML =  estructura;
    if (!console) {
        console = {};
    }
    var old = console.log;

    this.logger =  logger = document.querySelector(`#consoleContenido${xid} .consolaView`);
    
    var submit = document.querySelector(`#consoleContenido${xid} .consolaInput input`);
    
    submit.addEventListener('keypress',function(e){
        if(e.keyCode == 13){
            
            try{
                eval((submit.value));
                  
                submit.value =  "";
            }catch(e){
                 logger.innerHTML += `<div class="consola-result-div error">${e}<div class="compartir" rel="${e}" onclick="compartirConsole(this)"></div></div>`;
                
                 logger.scrollTop =  logger.scrollTop + 1000;
            }
        }

    });
    
    var temp;

    console.log = function (message) {
            
            
            if (typeof message == 'object') {
                logger.innerHTML += `<div class="consola-result-div object">${(JSON.stringify(message))}<div rel="${message}" class="compartir"  onclick="compartirConsole(this)"></div><div>`;
            } else if(!isNaN(message)){
                  logger.innerHTML += `<div class="consola-result-div number">${message}<div class="compartir" rel="${message}"  onclick="compartirConsole(this)"></div></div>`;     
            }else if(typeof message == 'string'){
                logger.innerHTML += `<div class="consola-result-div text">${message}<div class="compartir" rel="${message}"  onclick="compartirConsole(this)"></div></div>`;
            }else{
                logger.innerHTML += `<div class="consola-result-div">${message}<div class="compartir" rel="${message}" onclick="compartirConsole(this)"></div></div>`;
            }
        
            logger.scrollTop =  logger.scrollTop + 1000;

    }    
}
Consola.prototype.exec = function(data){
    try{
        eval(data.toString());
        
    }catch(e){
         this.logger.innerHTML += `<div class="consola-result-div error">${e}<div class="compartir" rel="${e}"  onclick="compartirConsole(this)"></div></div>`;
    }
}
Consola.prototype.clear =  function(){
    
    this.logger.innerHTML = "";
    
}




