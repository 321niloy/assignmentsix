const loadingfristApi = (more) => {
    // toggle spiner working start //
    togglespiner(true);
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCardData(data.data.tools,more))
}
const displayCardData = (cardData,more) =>{
    // console.log(cardData)
    const cardContainer = document.getElementById('cardContainer')
    cardContainer.innerHTML="";
 
    const seeMore = document.getElementById('seeMorebtnClicked')
    if(cardData.length> 6 && more !==true){
        cardData=cardData.slice(0,6);
        seeMore.classList.remove('d-none')
    }

    else{
        seeMore.classList.add('d-none')
    }
    
    
    cardData.forEach(cardLoop => {
        //console.log(cardLoop);
        const Mydiv = document.createElement('div');
        Mydiv.classList.add('col')
        Mydiv.innerHTML=`
        <div class="card h-100">
                    <img src="${cardLoop.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Features
                      </h5>
                      <p class="card-text">1 ${cardLoop.features[0]?cardLoop.features[0]:"No features"}</p>
                      <p class="card-text">2 ${cardLoop.features[1]?cardLoop.features[1]:"No features"}</p>
                      <p class="card-text">3 ${cardLoop.features[2]?cardLoop.features[2]:"No features"}</p>
                    </div>
                    <div class="card-footer ">
                   <div class="d-flex  justify-content-between align-items-center">
                   <div >
                   <h4> ${cardLoop.name}</h4>
                   <p><span><i class="fa-regular fa-calendar-days"></i></span> ${cardLoop.published_in}</p>
                   
                    </div>
                    <div><button onclick="loaddetailsModal('${cardLoop.id}')" class="border-0 rounded-circle p-3 bg-danger" data-bs-toggle="modal" data-bs-target="#AIdeTailsBackdrop"><i class=" fa-xl  fa-solid fa-arrow-right-long aria-hidden="true" style="color:#FFFFFF""></i></button></div>
                
                   </div>
                  </div>
                  </div>
        
        `
        cardContainer.appendChild(Mydiv)
    });
    // toggle spiner end //
    togglespiner(false);
}
document.getElementById('seeMorebtnClicked').addEventListener('click', function(){
    loadingfristApi(true)
})
// ////////////////toggle spiner function///////////////////////
 const togglespiner = isLoadding =>{
    const loaderSection = document.getElementById('loaderstr');
   if(isLoadding){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
/////////////////////Toggle spiner end//////////////////////////////////
//-----------------------Modal start------------------------------------ //
const loaddetailsModal = async  id=>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    modalDisplayData(data.data);
    
}
//modal start //

const modalDisplayData = modal =>{
    console.log(modal)
    
    document.getElementById('fristCardParagraph').innerText=modal.description;
    document.getElementById('spanpricing').innerText=modal.pricing?.price ? modal.pricing[0]?.price==='0'?'free cost': modal.pricing[0].price:'free cost';
    document.getElementById('spanprizingO').innerText=modal.pricing?modal.pricing[0].plan:'Basic';
    document.getElementById('spanpricingt').innerText=modal.pricing[1].price?modal.pricing[1].price:'Free of cost';
    document.getElementById('spanprizingOt').innerText=modal.pricing[1].plan;
    document.getElementById('spanpricingth').innerText=modal.pricing[2].price?modal.pricing[2].price:'Free of cost';
    document.getElementById('spanprizingOth').innerText=modal.pricing[2].plan;
    document.getElementById('lio').innerText=modal.features['1'].feature_name;
    document.getElementById('lion').innerText=modal.features['2'].feature_name;;
    document.getElementById('lioe').innerText=modal.features['3'].feature_name;;
    document.getElementById('liot').innerText=modal.integrations?modal.integrations[0] :"No Integration";
    document.getElementById('liow').innerText=modal.integrations?modal.integrations[1] :"No Integration";
    document.getElementById('lioo').innerText=modal.integrations?modal.integrations[2] :"No Integration";
    

   const cardInnerdiv = document.getElementById('cardinner');
   cardInnerdiv.innerHTML="";
    const opdiv = document.createElement('div')
opdiv.innerHTML=`
<img class=" position-relative img-fluid" src="${modal.image_link[0]?modal.image_link[0]:modal.image_link[1]}" class="card-img-top" alt="...">
<div class="card-body  text-center">
<h5 class="card-title">${modal.input_output_examples?modal.input_output_examples[0].input:'no data found'}</h5>
<p class="card-text">${modal.input_output_examples?modal.input_output_examples[0].output:'No! Not Yet, take a break!!'} </p>
</div>
<span class="position-absolute  top-0 ps-3 pe-3  end-0 bg-danger  rounded-pill" >
   ${modal.accuracy.score?modal.accuracy.score*100+'% Accuracy':""}
  </span>

`
cardInnerdiv.appendChild(opdiv)
}
//------------------------Modal End------------------------------------ //
loadingfristApi()


