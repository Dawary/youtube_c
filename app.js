let videoCardContainer = document.querySelector('.main-container')
let api_key ="AIzaSyDT_cjSN05eODL1wbQchchg6PhXznh9qO0";


let video_http =" https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart:'mostPopular',
    maxResults: 50,
    regionCode: "IN"
}))
.then(res => res.json())
.then(data =>{
    console.log(data)
    data.items.forEach(item =>{
getChannelIcon(item)
    })
}).catch(err => console.log(err))



function getChannelIcon(video_data){
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
   .then(data =>{
  console.log(data)
     video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
     makeVideoCard(video_data)
   })
}

function makeVideoCard(data){

    videoCardContainer.innerHTML +=`
    <div class="video-container" onclick="location.href='https://youtube.com/watch?v=${data.id}'">

    <img src="${data.snippet.thumbnails.high.url}" class="video" alt="">

   <div class="content">
   <img src="${data.channelThumbnail}"  class="channel-icon">
       <div class="info">
    <h4 class="title">${data.snippet.title}</h4>
    <p class="${data.snippet.channelTitle}"</p>
       </div>
   </div>


  </div>
    `

}


let serachInp = document.querySelector('.serach-inp');
let btn = document.querySelector('.search-btn');

let searchLink ="https://www.youtube.com/results?search_query=";

btn.addEventListener('click', ()=>{
    let input = serachInp.value;
    if(input.length){
        location.href= searchLink + input;
    }
    
})


