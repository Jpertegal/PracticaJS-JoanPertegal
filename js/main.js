document.addEventListener('DOMContentLoaded', (bolas) => {
    const pantalla = document.querySelector("#pantalla");
    const neco = document.querySelector(".neco");
    let bola = [];
    var contador = 0;
    var aciertos = 0;
    var amarillo = 0;
    neco.style.top  = pantalla.clientHeight/2 - neco.clientHeight/2 + "px";
    neco.style.left = pantalla.clientWidth/2 - neco.clientHeight/2 + "px";
    bola=generateBall();
    function controlarLimits(){
        if(neco.offsetLeft < 0) 
            neco.style.left = 0;
        if(neco.offsetTop < 0)  
            neco.style.top  = 0;
        if(neco.offsetTop+neco.clientHeight > pantalla.clientHeight) 
            neco.style.top  = (pantalla.clientHeight - neco.clientHeight) + "px";
        if(neco.offsetLeft+neco.clientWidth > pantalla.clientWidth)
            neco.style.left = (pantalla.clientWidth - neco.clientWidth) + "px";
    }

    function generateBall(){
        let foto;
        let contenedor = [];
        for(let i=0; i<20; i++) {
            foto = Math.floor(1+4*Math.random());
            contenedor[i] = document.createElement('img');
            switch (foto) {
                case 1:
                    contenedor[i].src="https://static.miraheze.org/hololivewiki/thumb/9/93/Watson_Amelia_-_Portrait_Mini.png/290px-Watson_Amelia_-_Portrait_Mini.png"
                    amarillo++;

                    break;
                case 2:
                    contenedor[i].src="https://static.miraheze.org/hololivewiki/thumb/5/5e/Ninomae_Ina%27nis_-_Portrait_Mini.png/290px-Ninomae_Ina%27nis_-_Portrait_Mini.png"

                    break;
                case 3:
                    contenedor[i].src='https://static.miraheze.org/hololivewiki/thumb/0/00/Takanashi_Kiara_-_Portrait_Mini.png/290px-Takanashi_Kiara_-_Portrait_Mini.png'

                    break;  
                case 4:
                    contenedor[i].src='https://static.miraheze.org/hololivewiki/thumb/1/17/Gawr_Gura_-_Portrait_Mini.png/290px-Gawr_Gura_-_Portrait_Mini.png'

                    break;  
                default:
                    break;
            }
            contenedor[i].style.width=Math.floor(50+100*Math.random())+"px";
            contenedor[i].style.borderRadius='100%';
            contenedor[i].style.border='3px black solid';
            contenedor[i].style.position='absolute';
            contenedor[i].style.top=Math.floor(1+90*Math.random())+"vh";
            contenedor[i].style.left=Math.floor(1+90*Math.random())+"vw";
            document.body.appendChild(contenedor[i]);
        }
        return contenedor;
    }

     function detectarXoc(){
        for (let i = 0; i < 20; i++) {
            const latDret = neco.offsetLeft+neco.clientWidth > bola[i].offsetLeft;
            const latEsq  = neco.offsetLeft < bola[i].offsetLeft+bola[i].clientWidth;
            const altSup  = neco.offsetTop < bola[i].offsetTop+bola[i].clientHeight;
            const altInf  = neco.offsetTop+neco.clientHeight > bola[i].offsetTop;
   
            if(latDret && latEsq && altSup && altInf){
                bola[i].remove();
                if (bola[i].src == "https://static.miraheze.org/hololivewiki/thumb/9/93/Watson_Amelia_-_Portrait_Mini.png/290px-Watson_Amelia_-_Portrait_Mini.png") {
                    aciertos++;
                    contador++;
                }
                else{
                    contador--;
                }
            }

        }         
           
     }

    window.addEventListener('mousemove', (e) => {                  
        neco.style.top  = e.clientY - neco.clientHeight/2 + "px";
        neco.style.left = e.clientX - neco.clientWidth/2  + "px";
        controlarLimits();
        detectarXoc();
        if (aciertos == amarillo) {
            final();
        }   
    });

    function final(){
        pantalla.replaceChildren();
        const titol = document.createElement("h1");
        const punts = document.createElement("h1");
        titol.style.display="flex";
        titol.style.justifyContent="center";
        titol.style.alignContent="row";
        punts.style.display="flex";
        punts.style.justifyContent="center";
        punts.style.alignContent="row";
        document.body.appendChild(titol);
        document.body.appendChild(punts);
        if (contador<0) {
            titol.innerHTML="GAME OVER!"
            punts.innerHTML="Punts totals: "+contador;
        }
        else if(contador>0){
            titol.innerHTML="VICTORY!"
            punts.innerHTML="Punts totals: "+contador;
        }
        else if (contador == 0){
            titol.innerHTML="Nothing..."
            punts.innerHTML="Punts totals: "+contador;
        }
        setTimeout('document.location.reload()',3000);
    }
});