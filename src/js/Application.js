import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  _loading = '<progress class="progress is-small is-primary" max="100" ></progress>'

  constructor() {
    super();
  //  this._loading = loading
  //let main = document.querySelector(".main")
  //main.innerHTML = el


    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = this._render({
      name: "Placeholder",
      terrain: "placeholder",
      population: 0,
    });

    document.body.querySelector(".main").appendChild(box);

    this.emit(Application.events.READY);
    //this._loading = '<progress class="progress is-small is-primary" max="100" ></progress>'
    this._loading = document.createElement("progress")
   // let main = document.querySelector(".main")
    // main.innerHTML = this._loading
   // const prot = document.querySelector(".progress.is-small.is-primary");
   // prot.setAttribute("_loading", "");
   
  }
 
  async _load(){
    let url = `https://swapi.boom.dev/api/planets`
    let allPlanets = [];
    while(url !== null){
      await fetch(url, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(data => {
         url = data.next
       // let planets = data.results
        //let box = document.querySelector(".box");
        for(let i = 0; i < data.results.length; i++){
         let planet = data.results[i]
         // box.innerHTML += this._render(planet);
         allPlanets.push(planet)
        }
      })
      
    }
     

    
      
    
  
  // let content = document.querySelector(".progress.is-small.is-primary")
   //let box2 = document.querySelector(".box").innerHTML;
  //if(box2 !== " "){
  //  content.style.display = "none"
  //}
  //console.log(allPlanets);
 // let content = document.querySelector(".progress")
 // content.style.display = "none"
  
  return allPlanets
  }
 async _create(){
    let planets = await this._load();
    let box = document.querySelector(".box");
    for(let i = 0; i < planets.length; i++){
      let planet = planets[i]
       box.innerHTML += this._render(planet)
      //allPlanets.push(planet)
    }

     
   
  if(box.innerHTML !== " "){
    let content = document.querySelector("progress")
    content.style.display = "none"
  }
  }
  
  async _startLoading(){
   let files = await this._load()
   let myPromise = new Promise(function(myResolve, myReject) {
   if(files){
    let content = document.querySelector("progress")
    content.style.display = "none"
     myResolve('true')
   }else{
     myReject('false')
   }
    
    
      
    });
  }
  _stopLoading(){
  
  }
 


  _render({ name, terrain, population }) {
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }
}
