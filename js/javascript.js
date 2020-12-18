
const text = document.querySelector('#text');
const srtText = text.textContent;
const splitText = srtText.split("");
text.textContent = "";
for (let i =0 ; i <  srtText.length; i++ ) {
text.innerHTML += "<span>" + splitText[i] + "</span>";  
}

let char = 0;
let timer = setInterval(onTick,50);

function onTick(){
  const span = text.querySelectorAll('span')[char];
  span.classList.add('faded');
  char++
  if(char === splitText.length){
    complete();
    return;
  }
}

function complete(){
  clearInterval(timer);
  timer = null;
}



let boton =document.getElementById('btn');

boton.addEventListener('click',()=>{

   // 1º vamos a capturar el valor del input
    let box=document.getElementById('box').value

    // 2º vamos a tomar la imagen y texto de informacion del pokemon
    let img=document.getElementById('imagen')

    // 3º vamos a traenos la info (nombre)
    let p=document.getElementById('info')

    // 4º saber la habilidad
    let span=document.getElementById('habilidad')

    // 5º saber la estadísticas
    // let cont=document.getElementById('chartContainer')

    const estadisticas = [];

    // vamos hacer el llamado a la API
    let xhttp =new XMLHttpRequest()
    xhttp.open("GET",`https://pokeapi.co/api/v2/pokemon/${box}`)
    xhttp.send()

    xhttp.onreadystatechange=function() {
        if(this.readyState== 4 && this.status==200){

            let datePokemon=JSON.parse(this.responseText)
            img.setAttribute("src",datePokemon.sprites.front_default)
            p.textContent=datePokemon.name
            span.textContent=datePokemon.id

            statsLength = (datePokemon.stats).length;

            for (var i = 0; i < statsLength; i++) {
              estadisticas.push({
                y: parseInt(datePokemon.stats[i].base_stat),
                label: (datePokemon.stats[i].stat.name)
              });
            }

          chart.render();

        }

    }

    // console.log(estadisticas);

    /// testing general graficos
    var chart = new CanvasJS.Chart("chartContainer",
        {
            backgroundColor: "#FFCC00",
            animationEnabled: true,
            animationDuration: 1800,

          title:{
            text: "Estadísticas Base",
            fontFamily: "Impact",
            fontWeight: "normal"
          },
          
          legend:{
            verticalAlign: "bottom",
            horizontalAlign: "center"
          },
          data: [
          {
           startAngle: 55,
           indexLabelFontSize: 20,
           indexLabel: "{label} - #percent%",
           indexLabelFontFamily: "Garamond",
           indexLabelFontColor: "white",
           indexLabelLineColor: "white",
           indexLabelPlacement: "outside",
           toolTipContent: "<b>{label}:</b> {y} (#percent%)",
           type: "doughnut",
           // showInLegend: true,
           dataPoints: estadisticas
         }
         ]
       });

       // chart.render();

  })
