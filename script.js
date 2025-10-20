// script.js
// Nội dung thư — đã theo đúng yêu cầu của bạn
const letterMessage = `Chúc ebe 20 tháng 11 vui vẻ, luôn xinh đẹp, hạnh phúc, may mắn và thành công trên con đường mình chọn ❤️ :33`;

// Elements
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const letterTextEl = document.getElementById('letterText');
const hint = document.getElementById('hint');
const fallContainer = document.getElementById('fall-container');

let opened = false;

// Typing effect for letter content
function typeText(element, text, speed = 30) {
  element.innerHTML = '';
  let i = 0;
  const t = setInterval(() => {
    element.innerHTML += text[i] === ' ' ? '&nbsp;' : text[i];
    i++;
    if (i >= text.length) clearInterval(t);
  }, speed);
}

// spawn heart element
function spawnHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  const size = 14 + Math.round(Math.random()*22);
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = Math.random() * 80 + 5 + '%';
  const duration = 5000 + Math.random()*4000;
  heart.style.animationDuration = `${duration}ms`;
  heart.style.opacity = 0.95;
  fallContainer.appendChild(heart);
  setTimeout(()=> fallContainer.removeChild(heart), duration + 200);
}

// spawn multiple hearts periodically
let heartInterval;
function startHearts(){
  if (heartInterval) return;
  heartInterval = setInterval(()=>{
    const count = 1 + Math.floor(Math.random()*3);
    for (let i=0;i<count;i++) spawnHeart();
  }, 600);
}

// small sparkle burst
function burstSparkles() {
  for (let i=0;i<12;i++){
    const s = document.createElement('div');
    s.style.position='absolute';
    s.style.width = `${4 + Math.random()*8}px`;
    s.style.height = s.style.width;
    s.style.borderRadius='50%';
    s.style.left = `${40 + Math.random()*20}%`;
    s.style.top = `${20 + Math.random()*20}%`;
    s.style.background = `rgba(255,255,255,${0.7+Math.random()*0.3})`;
    s.style.transform = `translate(-50%,-50%)`;
    s.style.zIndex = 6;
    s.style.pointerEvents = 'none';
    s.style.transition = 'transform 900ms cubic-bezier(.2,.9,.25,1), opacity 900ms';
    document.querySelector('.scene').appendChild(s);
    requestAnimationFrame(()=> {
      s.style.transform = `translate(-50%,-50%) translate(${(Math.random()-0.5)*200}px,${-150 - Math.random()*80}px) scale(${1+Math.random()})`;
      s.style.opacity = '0';
    });
    setTimeout(()=> s.remove(), 1200);
  }
}

// open envelope handler
function openEnvelope(){
  if (opened) return;
  opened = true;
  envelope.classList.add('open');
  letter.classList.add('open');
  typeText(letterTextEl, letterMessage, 25);
  hint.style.opacity = '0';
  hint.style.transform = 'translateY(8px)';
  startHearts();
  burstSparkles();
  setInterval(burstSparkles, 3200);

  // 🎵 Thêm đoạn này để phát nhạc khi mở phong bì
  try {
    const audio = new Audio('music.mp3'); // đặt file nhạc cùng thư mục với index.html
    audio.loop = true; // lặp lại nhạc
    audio.volume = 0.6; // âm lượng nhẹ
    audio.play().catch(()=>{});
  } catch(e){}
}

// envelope click to open
envelope.addEventListener('click', () => {
  openEnvelope();
});

// Also allow tapping the whole wrap area
document.querySelector('.envelope-wrap').addEventListener('click', (e)=>{
  openEnvelope();
});

// Make keyboard accessible: Enter to open
envelope.setAttribute('tabindex', '0');
envelope.addEventListener('keydown', (e)=>{
  if (e.key === 'Enter' || e.key === ' ') openEnvelope();
});

// When user taps letter, do tiny jiggle
letter.addEventListener('click', ()=>{
  const el = letter;
  el.animate([
    { transform: 'translateY(-120px) rotate(-1deg)' },
    { transform: 'translateY(-124px) rotate(2deg)' },
    { transform: 'translateY(-120px) rotate(0deg)' }
  ], { duration: 450, easing: 'ease-out' });
});

// Start a soft continuous floating of envelope (breathing)
(function floatEnvelope(){
  const el = document.querySelector('.envelope');
  let dir = 1;
  setInterval(()=>{
    el.style.transform = `translateY(${dir*4}px)`;
    dir = -dir;
  }, 2000);
})();

// Pre-spawn few hearts for visual richness
for (let i=0;i<6;i++){
  setTimeout(spawnHeart, i*300 + Math.random()*600);
}
