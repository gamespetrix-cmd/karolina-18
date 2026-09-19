document.addEventListener("DOMContentLoaded",function(){
  var intro=document.getElementById("intro");
  var mainPage=document.getElementById("main");
  var openButton=document.getElementById("open");

  if(openButton){
    openButton.onclick=function(){
      intro.style.display="none";
      mainPage.classList.add("show");
      document.body.classList.remove("lock");
      window.scrollTo(0,0);
    };
  }

  var startDate=new Date("2026-03-08T00:00:00");

  function updateCounter(){
    var d=Math.max(0,Date.now()-startDate.getTime());
    var s=Math.floor(d/1000);
    document.getElementById("days").textContent=Math.floor(s/86400).toLocaleString("pl-PL");
    document.getElementById("hours").textContent=String(Math.floor(s%86400/3600)).padStart(2,"0");
    document.getElementById("minutes").textContent=String(Math.floor(s%3600/60)).padStart(2,"0");
    document.getElementById("seconds").textContent=String(s%60).padStart(2,"0");
  }

  updateCounter();
  setInterval(updateCounter,1000);

  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting) entry.target.classList.add("on");
    });
  },{threshold:.12});

  document.querySelectorAll(".reveal").forEach(function(el){
    observer.observe(el);
  });

  var audio=document.getElementById("bgAudio");
  var files=["caly-ja.mp3","jeszcze-raz.mp3","nieskonczonosc.mp3","ten-stan.mp3","wrazenie.mp3"];
  var current=2;

  if(!audio)return;

  function playTrack(i){
    current=i;
    audio.pause();
    audio.src="audio/"+files[i]+"?v=8";
    audio.load();

    audio.addEventListener("loadedmetadata",function startTrack(){
      audio.removeEventListener("loadedmetadata",startTrack);
      audio.currentTime=(i===2)?26:0;
      audio.play().catch(function(){});
    });
  }

  audio.addEventListener("ended",function(){
    playTrack((current+1)%files.length);
  });

  window.playLocal=function(i){
    playTrack(i);
  };

  playTrack(current);
});