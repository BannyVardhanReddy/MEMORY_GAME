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

window.onload = ()=>{
    const cards = Array.from(document.querySelectorAll(".card"));
    shuffle(cards);
    cards.forEach(card => {
        grid.appendChild(card);
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
    console.log(target);
    if(target.className != 'card_front'){
        return;
    }
    if(lockBoard){
        return;
    }
    if(flipped_cards[0] === target.closest('.card')){
        return;
    }
    flip(target.closest('.card'));
})
function flip(target){
    target.classList.add('active')
    flipped_cards.push(target);
    if(flipped_cards.length === 2){
        lockBoard = true
        isSafe()
    }
    console.log(flipped_cards)
}

function isSafe(){
    let [card1,card2] = flipped_cards;
    console.log(card1,card2);
    if(card1.getAttribute('data-value') === card2.getAttribute('data-value')){
        card1.classList.add('matched');
        card2.classList.add('matched');
        flipped_cards = []
        lockBoard = false;
    }else{
        setTimeout(()=>{
            card1.classList.remove('active');
            card2.classList.remove('active');
            flipped_cards = [];
            lockBoard = false;
        },1100)
    }
}


