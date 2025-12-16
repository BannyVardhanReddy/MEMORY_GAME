const grid = document.getElementById('grid-container');
let flipped_cards = []
let lockBoard = false;
const cards = document.querySelectorAll(".card_back");
const images = [];
for(let i = 1;i<=6;i++){
    images.push("/IMAGES/"+i+".png");
    images.push("/IMAGES/"+i+".png");
}
let i = 1;
cards.forEach(card => {
    card.style.backgroundImage = `url(${images[i-1]})`;
    i++;
});

document.getElementById("start-Game").addEventListener("click",()=>{
    document.getElementById('start').style.top = "100%";
    document.getElementById('start').style.transform =  "translate(-50%,0%)";
    document.getElementById('mask').style.height = '0%';
})
let matched;
let clicks;
window.onload = ()=>{
    matched = 0;
    clicks = 0;
    newGame();
}
document.getElementById("new-Game").addEventListener("click",()=>{
    matched = 0;
    clicks = 0;
    newGame();
})
function newGame(){
    const cards = Array.from(document.querySelectorAll(".card"));
    clicks = 0;
    shuffle(cards);
    cards.forEach(card => {
        grid.appendChild(card);
        if(card.classList.contains("active")){
            card.classList.remove("active");
        }
        if(card.classList.contains("matched")){
            card.classList.remove("matched");
        }
    });
}
function shuffle(cards){
    for(let i = cards.length-2;i>=0;i--){
        const j = Math.floor(Math.random() * (i+1));
        [cards[i],cards[j]] = [cards[j],cards[i]]
    }
}
grid.addEventListener("click",(e)=>{
    let target = e.target;
    if(target.className != 'card_front'){
        return;
    }
    if(lockBoard){
        return;
    }
    if(flipped_cards[0] === target.closest('.card')){
        return;
    }
    clicks++;
    flip(target.closest('.card'));
})
function flip(target){
    target.classList.add('active')
    flipped_cards.push(target);
    if(flipped_cards.length === 2){
        lockBoard = true
        isSafe()
    }
    // console.log(flipped_cards)
}

function isSafe(){
    let [card1,card2] = flipped_cards;
    // console.log(card1,card2);
    if(card1.getAttribute('data-value') === card2.getAttribute('data-value')){
        card1.classList.add('matched');
        card2.classList.add('matched');
        matched += 2;
        // alert(matched);
        flipped_cards = []
        lockBoard = false;
        if(matched === 12){
            setTimeout(()=>{
                document.getElementById("popup").style.display = "flex";
                document.getElementById("win-text").innerHTML = `You Wooon! <br> in<h3>${clicks}</h3>..clicks`;
                document.getElementById("play-again").addEventListener('click',()=>{
                document.getElementById("popup").style.display = 'none';
                newGame();
                })
            },1000)
        }
    }else{
        setTimeout(()=>{
            card1.classList.remove('active');
            card2.classList.remove('active');
            flipped_cards = [];
            lockBoard = false;
        },1100)
    }
}


