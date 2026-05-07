let hrs = document.getElementById("hrs")
let min = document.getElementById("min")
let sec = document.getElementById("sec")
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");
let save = document.getElementById("save");
let data = document.getElementById("data");
let i;
sec.innerText = "00"
min.innerText = "00"
hrs.innerText = "00"
let s = 1;
let m = 0;
let h = 0;
start.addEventListener("click",()=>{
       i = setInterval(()=>{
              if(m>=60){
                     h++;
                     if(h>=10) hrs.innerText = h;
                     else hrs.innerText = "0"+h;
                     m=0;
                     min.innerText = m;
              }
              if(s>=60){
                     m++;
                     if(m>=10) min.innerText = m;
                     else min.innerText = "0"+m;
                     s=0;
              }
              if(s>=10) sec.innerText = s;
              else sec.innerText = "0"+s;
              s++;
       },1000)
})
stop.addEventListener("click",()=>{
       clearInterval(i);
})
reset.addEventListener("click",()=>{
       clearInterval(i);
       s = 1;
       h = 0;
       m = 0;
       sec.innerText = "00";
       min.innerText = "00";
       hrs.innerText = "00";
})
save.addEventListener("click",()=>{
       let h3 = document.createElement("h3");
       let btn = document.createElement("button");
       btn.innerText = "Clear";
       h3.innerHTML = h+":"+m+":"+(s-1);
       btn.addEventListener("click",(e)=>{
              e.target.parentElement.remove();
       })
       h3.append(btn);
       data.append(h3);
})
