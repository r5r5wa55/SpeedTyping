const wordEl=document.getElementById('word');
const textEl=document.getElementById('text');
const scoreEl=document.getElementById('score');
const timeEl=document.getElementById('time');
const levelbtnEl=document.getElementById('level-btn');
const settingEl=document.getElementById('setting');
const levelFormEl=document.getElementById('level-form');
const levelEl=document.getElementById('level');
const gameoverEl=document.getElementById('gameover');

let level='medium';

const  saveMode=localStorage.getItem('mode') !== null ? localStorage.getItem('mode'): 'medium'; 


const apiURL="https://pokeapi.co/api/v2/pokemon/"
async function apifet(){
   
    const res = await fetch(apiURL);
    const namepoke = await res.json();
    const rename = namepoke.results
   
    return rename
    
}
  
apifet();

const words =["กำ","ยำ","ดำ","ไก่"];

let randomText;
let score=0;
let time=15; //easy =15 medium=10 hard=5



const timeInterval=setInterval(UpdataTime,1000);



function getRandomword(){
    
    return words[Math.floor(Math.random()*words.length)]
}
function displayWordUI(){
    randomText=getRandomword();
    wordEl.innerHTML=randomText;
    timeEl.innerHTML=time;

}

textEl.addEventListener('input',(e)=>{

    const inputText=e.target.value;
   
    if(inputText === randomText){
        e.target.value = "";
        
        if(saveMode=='easy'){
            time+=5;
        }else if(saveMode=='medium'){
            time+=3;
        }else{
            time+=1;
        }
        displayWordUI();
        UpdataScore();
        

    }else{

    }
       
})
function UpdataScore(){
    score+=10;
    scoreEl.innerHTML=score;
}
function UpdataTime(){
    time--;
    timeEl.innerHTML=time;
    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}
function gameOver(){
    gameoverEl.innerHTML=`<h1>จบเกมแล้วนะครับ</h1><p>คะแนนของคุณ = ${score} แต้ม</p>
    <button onclick="location.reload()" class="btn-reload">เล่นอีกครั้ง</button>`
    gameoverEl.style.display="flex"
}

levelbtnEl.addEventListener('click',()=>{
    settingEl.classList.toggle('hide');
});

levelEl.addEventListener('change',(e)=>{
    level=e.target.value;
    localStorage.setItem('mode',level);
   
});
function startGame(){
   
    levelEl.value=saveMode;

    if(saveMode=='easy'){
        time=15;
    }else if(saveMode=='medium'){
        time=10;
    }else{
        time=5
    }
    displayWordUI();
    
}
startGame();
textEl.focus()
displayWordUI();