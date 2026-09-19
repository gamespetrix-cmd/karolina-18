document.addEventListener("DOMContentLoaded",()=>{
 const audio=document.getElementById("bgAudio");
 const files=[
  "caly-ja.mp3",
  "jeszcze-raz.mp3",
  "nieskonczonosc.mp3",
  "ten-stan.mp3",
  "wrazenie.mp3"
 ];

 let current=2;

 if(!audio)return;

 function playTrack(i){
  current=i;
  audio.pause();

  audio.src="audio/"+files[i]+"?v=6";
  audio.load();

  audio.addEventListener("loadedmetadata",function start(){
   audio.removeEventListener("loadedmetadata",start);

   if(i===2){
    audio.currentTime=26;
   }else{
    audio.currentTime=0;
   }

   audio.play().catch(()=>{});
  });
 }

 audio.addEventListener("ended",()=>{
  current=(current+1)%files.length;
  playTrack(current);
 });

 playTrack(current);

 window.playLocal=(i)=>{
  playTrack(i);
 };
});
