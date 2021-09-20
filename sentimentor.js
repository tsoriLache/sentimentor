"use strict"
document.querySelector("#submit-button").addEventListener("click",getTextSentim);

async function sendTextToSentimentorAPI(element){
    const text = document.querySelector("#input").value;
    const sentiment = await fetch("https://sentim-api.herokuapp.com/api/v1/", {
        method:"POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body : JSON.stringify({ "text":  text })
    })
    return await sentiment.json();
}

async function getTextSentim(){
    try{
        // let loading = createElement("p",["loading"],[],{id:"loading"})
        document.getElementById("result-section").insertAdjacentHTML("afterbegin" ,'<div class="container"><span class="circle"></span><span class="circle"></span><span class="circle"></span><span class="circle"></span> </div>');
        let apiAnalysis = await sendTextToSentimentorAPI();
        let polarity = apiAnalysis.result.polarity;
        let classOfAnalysis= polarity===0? "neutral":polarity>0? "positive":"negative";
        let type = apiAnalysis.result.type;
        let analysis = createElement("p",[createElement("span",[type],[classOfAnalysis]), createElement("span",[polarity],[classOfAnalysis])],["answer"])
        document.querySelector("#result-section > div").remove();
        document.querySelector("#result-section").append(analysis);
    }
    catch{
        let error=createElement("p",["there was an error"])
        document.querySelector("#result-section").append(error);
    }
}

function createElement(tagName, children = [], classes = [], attributes = {}) {
    const el = document.createElement(tagName);
    // Children
    for(const child of children) {
        el.append(child);
    }
    // Classes
    for(const cls of classes) {
      el.classList.add(cls);
    }
    // Attributes
    for (const attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }
    return el;
  }

