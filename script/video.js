console.log('added successfully');
function getTimeString(time){
    // get hour and rest seconds..
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}
// 1.fetch , load and categories on html

const removeActiveClass = () =>{
const buttons = document.getElementsByClassName("category-btn");
console.log(buttons);
for(let btn of buttons){
    btn.classList.remove("active");
}
}
// create load categories .........
const loadCategories =() => {
// fetch Data ...
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then((res) => res.json())
.then((data) => displayCategories(data.categories))
.catch((error) => console.log(error));

};

// create videos ......

const loadVideos =(searchText = "") => {
    // fetch Data ...
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
    
    };
    const loadCategoriesVideos = (id) =>{
        // alert(id);
        // fetch.
        fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // active class remove....
            removeActiveClass();
            // id class active ........
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active");
            // console.log(activeBtn);
           displayVideos(data.category);
        })
        .catch((error) => console.log(error));
    };
    // const cardDemo = {
    //     category_id: "1001",
    //     video_id: "aaad",
    //     thumbnail: "https://i.ibb.co/f9FBQwz/smells.jpg",
    //     title: "Smells Like Teen Spirit",
    //     authors: [
    //     {
    //     profile_picture: "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
    //     profile_name: "Oliver Harris",
    //     verified: true,
    //     },
    //     ],
    //     others: {
    //     views: "5.4K",
    //     posted_date: "1672656000",
    //     }, 
    //     description:   
    //  "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit "};

    const loadDetails = async(videoId) => {
        console.log(videoId);
        const uri =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
        const res = await fetch(uri);
        const data =await res.json();
        displayDetails(data.video)
    };
    const displayDetails = (video) =>{
        console.log(video);
        const DetailsContainer = document.getElementById("modal-content")
        DetailsContainer.innerHTML =`
        <img src=${video.thumbnail} />
        <p>${video.description}</p>`
        // way number one____  this is easy way......
        document.getElementById("showModalData").click()
    };
    const displayVideos = (videos) => {
        const videoContainer = document.getElementById("videos");
        videoContainer.innerHTML = "";
        if(videos.length == 0 ){
            videoContainer.classList.remove("grid");
         videoContainer.innerHTML = `
         <div class= "min-h-[300px] w-full flex flex-col gap-5 justify-center items-center ">
         <img src = "assets/Icon.png"/>
         <h2 class=" text-center font-bold text-xl"> NO CONTENT HERE IN THIS CATEGORY</h2>
         </div>`;
         return;
        }
        else{
            videoContainer.classList.add("grid");
        }

        videos.forEach((videos) => {
            console.log(videos);
            const card = document.createElement("div");
            card.classList = "card card-compact";
            card.innerHTML = `
     <figure class=" h-[200px] relative" >
    <img 
      src= ${videos.thumbnail}
      class= "h-full w-full object-cover"
      alt="Shoes" />
      ${
        videos.others.posted_date?.length ==  0 ? "" : `<span class= "absolute right-2 bottom-2 bg-black text-xs rounded p-1 text-white"> ${getTimeString(videos.others.posted_date)}</span>`
      }
      
  </figure >
  <div class="px-0 py-2 flex gap-2">
    <div>

    <img class="w-10 h-10 rounded-full object-cover" src=${videos.authors[0].profile_picture} />
    </div>
    <div>
    <h2 class="font-bold"> ${videos.title} </h2>
   <div class="flex items-center"> 
   <p class= "text-gray-400"> ${videos.authors[0].profile_name} </p>

   ${videos.authors[0].verified == true?` <img class="w-5 " src ="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` 
    : ""}

   </div>
    <p> <button onclick="loadDetails('${videos.video_id}')" class="btn btn-sm btn-error">Details</button> </p>
    </div>

  </div>
     `;
         videoContainer.append(card);
        }) 
    }
    
// create display categories.....
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')
 categories.forEach((item) => {
    console.log(item);
    // create a btn....
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn category-btn">
       ${item.category}
      </button>
    `;
 
    // add btn categories container....
categoryContainer.append(buttonContainer);

 });  
}

document.getElementById("search-input").addEventListener("keyup",(e)=>{
loadVideos(e.target.value);
})
loadCategories();
loadVideos();