
let blackjackgame = {
    'you':{
        'scorespan': '#your-res',
        'div' :'#your-box',
        'score' : 0,
        'wins' : 0,
        'draws' : 0
    },
    'dealer' : {
        'scorespan': '#dealer-res',
        'div' :'#dealer-box',
        'score' : 0,
        'wins' : 0
    }
};
let numberbasedoncard = {
    '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'K':10,'A':[1,11],'Q':10
}

const YOU = blackjackgame['you'];
const DEALER = blackjackgame['dealer'];
const hitSound = "static/sounds/aww.mp3";
const flopSound  = "static/sounds/swish.m4a";
const drawSound  = "static/sounds/cash.mp3";

document.querySelector('#dealb.btn.btn-danger').addEventListener('click',blackjackDealer);
document.querySelector('#hitb.btn.btn-primary').addEventListener('click', blackjackHit);
document.querySelector('#standb.btn.btn-warning').addEventListener('click', blackjackStand);
var activeUser = YOU;
function blackjackStand(){
    activeUser = DEALER;
    var x = document.getElementById('hitb');
    x.click();
    for(let i =0;i<1000000;i++){

    }
    var x = document.getElementById('hitb');
    x.click();
    for(let i =0;i<100000;i++){

    }
    var x = document.getElementById('hitb');
    x.click();
    scorecompare(YOU,DEALER);

}
function syncDelay(milliseconds){
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }
   }
function blackjackHit(){
    var card = randcard();
    if(scorecheck(activeUser) == 0){
        scorecompare(YOU,DEALER);
        blackjackDealer();
    }
    else if(scorecheck(activeUser) && cardsindiv(activeUser)<3){ 
        showcard(card,activeUser); 
        updateScore(card,activeUser);
    }
    
}
function blackjackDealer(){
    deleteall(YOU['div']);
    deleteall(DEALER['div']);
    makescoretozero(YOU,0);
    makescoretozero(DEALER,0);
    activeUser = YOU;
    document.querySelector('#bj-res').innerHTML = "Lets play";
}

function scorecheck(user) {
    //console.log(user['score']);
    if(user['score'] > 21){
        return 0;
    }
    else{
        return 1;
    }  
}

function scorecompare(user,dealer) {
    var yod = 0;
    if(user['score'] > 21 && dealer['score'] >21){
        document.querySelector('#bj-res').innerHTML = "Draw";
        yod = -1;
    }
    else if(user['score'] > 21){
        document.querySelector('#bj-res').innerHTML = "You lost";
        yod = 0;
    }
    else if(dealer['score'] >21){
        document.querySelector('#bj-res').innerHTML = "You Won";
        yod = 1;
    }
    else if(user['score']>dealer['score']){
        document.querySelector('#bj-res').innerHTML = "You Won";
        yod = 1;
    }
    else if(user['score']<dealer['score'])
    {
        document.querySelector('#bj-res').innerHTML = "You Lost";
        yod = 0;
    }
    else{
        document.querySelector('#bj-res').innerHTML = "Draw";
        yod = -1;
    }
    updatewins(yod);
}

function updatewins(yod) {
    if(yod == 0){
        DEALER['wins'] = DEALER['wins'] +1;
        flopSound.play();
    }
    else if(yod == 1){
        YOU['wins'] = YOU['wins'] +1;
        hitSound.play();
    }
    else{
        YOU['draws'] = YOU['draws'] +1;
        drawSound.play();

    }
    //updating in the ui
    var w = document.querySelector('#wins').innerHTML = YOU['wins'];
    var l = document.querySelector('#losses').innerHTML = DEALER['wins'];
    var d = document.querySelector('#draws').innerHTML = YOU['draws'];
    
}

function cardsindiv(user) {
    var countarr = document.querySelector(user['div']).querySelectorAll('img');
    var len = 0;
    len = countarr.length;
    return len;
    
}

function updateScore(card,user){
    //if score less than or equal to 10 add 11
    //else add 1 for A
    var temp = numberbasedoncard[card];
    if(card == 'A'){
        if(user['score']<=10){
            temp = numberbasedoncard['A'][1];
        }
        else{
            temp = numberbasedoncard['A'][0]; 
        }
    }
    var number = user['score']+ temp;
    user['score'] = number; 
    var x = document.querySelector(user['scorespan']);
    x.innerHTML = number;
}

function makescoretozero(user,score){
    var x = document.querySelector(user['scorespan']);
    x.innerHTML = score;
    user['score'] = 0;
}
function deleteall(divtaken){
    var cards = document.querySelector(divtaken).querySelectorAll('img');
    for(let i =0;i<cards.length;i++){
        cards[i].remove();
    }
}
function showcard(card,user){
    var scard = document.createElement('img');
    scard.src = 'static/images/'+card+'.png';
    document.querySelector(user['div']).appendChild(scard);
}

function randcard(){
    let r = Math.floor(Math.random() * 13);
    var card = ['10','2','3','4','5','6','7','8','9','A','K','J','Q'][r];
    return card;
}