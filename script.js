const startDate=new Date("2026-03-08T00:00:00");
const intro=document.getElementById("intro"),main=document.getElementById("main"),open=document.getElementById("open");
open.addEventListener("click",()=>{
  intro.style.display="none";main.classList.add("show");document.body.classList.remove("lock");window.scrollTo(0,0);
  const a=document.getElementById("audio");if(a&&a.src)a.play().catch(()=>{});
});
function updateCounter(){let d=Math.max(0,Date.now()-startDate.getTime()),s=Math.floor(d/1000);
document.getElementById("days").textContent=Math.floor(s/86400).toLocaleString("pl-PL");
document.getElementById("hours").textContent=String(Math.floor(s%86400/3600)).padStart(2,"0");
document.getElementById("minutes").textContent=String(Math.floor(s%3600/60)).padStart(2,"0");
document.getElementById("seconds").textContent=String(s%60).padStart(2,"0")}
updateCounter();setInterval(updateCounter,1000);
const o=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add("on")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>o.observe(x));

// Muzyka: start od Nieskonczonosc i automatyczne przechodzenie przez cala playliste.
document.addEventListener("DOMContentLoaded",()=>{
  const audio=document.getElementById("bgAudio");
  const files=["caly-ja.mp3","jeszcze-raz.mp3","nieskonczonosc.mp3","ten-stan.mp3","wrazenie.mp3"];
  let current=2;if(!audio)return;
  const url=i=>"audio/"+files[i]+"?v=5";
  const play=()=>{audio.src=url(current);audio.load();audio.play().catch(()=>{});};
  audio.addEventListener("ended",()=>{current=(current+1)%files.length;play()});
  play();
  window.addEventListener("pointerdown",play,{once:true});
});

// Nadpisz funkcje z inline scriptu w index.html, aby przyciski tez omijaly stary cache MP3.
setTimeout(()=>{
  const audio=document.getElementById("bgAudio");
  const files=["caly-ja.mp3","jeszcze-raz.mp3","nieskonczonosc.mp3","ten-stan.mp3","wrazenie.mp3"];
  if(!audio)return;
  window.playLocal=(i)=>{
    audio.pause();
    audio.src="audio/"+files[i]+"?v=5";
    audio.load();
    audio.play().catch(()=>{});
  };
},0);