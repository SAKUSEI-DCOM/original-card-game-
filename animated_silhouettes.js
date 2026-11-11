/* Original vector silhouette animations. No external assets. */
(function(){
const NS='http://www.w3.org/2000/svg';
const el=(tag,attrs={},parent)=>{const x=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>x.setAttribute(k,v));if(parent)parent.appendChild(x);return x};
const palettes={
'究極拳巫女パンチ':['#090b2b','#344c90','#ffe8ae'],
'眠気があってちゃんと良かったなぽ':['#17152c','#8a7cb4','#fffdf2'],
'必殺ファン●ション':['#142334','#667c94','#d7edf8'],
'春風と木音':['#274e47','#e4a5b7','#ffe8da'],
'やかましいわ':['#080b18','#30344e','#9b7df3'],
'癒し系アイドル':['#241039','#9a46bc','#f3b9ff'],
'ピカ犬':['#c0f1fc','#65b9e7','#f8feff'],
'タイダル・ウィンド':['#13507d','#70c4db','#ffe6aa'],
'コールドスリープ':['#55407c','#f1a4c9','#fff3fd'],
'ドラゴン•エール':['#3c2359','#ef9ec7','#ffdfec'],
'電脳世界ハリケーン':['#24225a','#7f9fff','#ffb8e6'],
'怪異':['#040509','#30313a','#d7d5d8']};
const paths={person:'M-15 -30 Q-19 -49 0 -51 Q19 -49 15 -30 Q10 -19 11 -12 L23 0 L29 56 L13 56 L9 18 L7 69 L-7 69 L-9 18 L-13 56 L-29 56 L-23 0 L-11 -12 Q-10 -19 -15 -30Z',bird:'M-38 4 Q-30 -29 5 -30 Q35 -26 38 2 L53 10 L35 19 Q13 39 -15 26 L-35 44 L-27 17Z',dog:'M-36 -8 Q-48 -42 -27 -40 L-13 -25 Q0 -35 13 -25 L27 -40 Q48 -42 36 -8 Q49 25 23 39 Q0 50 -23 39 Q-49 25 -36 -8Z',dragon:'M-26 -26 L-33 -67 L-8 -47 L0 -58 L10 -47 L34 -67 L27 -25 Q47 5 31 35 L48 59 L16 50 Q0 62 -16 50 L-48 59 L-31 35 Q-47 5 -26 -26Z',robot:'M-29 -39 L29 -39 L35 5 L24 39 L-24 39 L-35 5Z',snake:'M-70 40 C-110 -22 -10 -55 20 -15 S-5 40 52 10 S70 -35 55 -43',tapir:'M-42 -21 Q-37 -43 0 -42 Q38 -40 39 -14 L56 5 Q63 31 32 34 L18 48 L-18 48 L-34 28 Q-55 10 -42 -21Z'};
function animate(host,name){if(!host)return;host.replaceChildren();const palette=palettes[name]||['#141323','#584b80','#d9c6f5'];const svg=el('svg',{viewBox:'0 0 640 270',role:'img','aria-label':name+'：動く影絵アニメーション',class:'vector-shadow-scene'},host);const defs=el('defs',{},svg);const grad=el('radialGradient',{id:'vsg'+Math.random().toString(36).slice(2)},defs);el('stop',{offset:'0%', 'stop-color':'#514269'},grad);el('stop',{offset:'100%','stop-color':'#090b18'},grad);el('rect',{width:640,height:270,fill:palette[0]},svg);const sky=el('rect',{width:640,height:270,fill:palette[1],opacity:.22},svg);const ground=el('path',{d:'M0 232 Q160 218 320 235 T640 230 L640 270 L0 270Z',fill:palette[0],opacity:.7},svg);
for(let i=0;i<25;i++){const x=(i*97+43)%640,y=(i*61+21)%220;el('circle',{cx:x,cy:y,r:1+(i%3)*.5,fill:palette[2],opacity:.55,class:'vs-twinkle'},svg)}
const figure=(kind,x,y,s,cls,fill='#08090e')=>{const g=el('g',{transform:`translate(${x} ${y}) scale(${s})`,class:cls},svg);el('path',{d:paths[kind],fill:kind==='snake'?'none':fill,stroke:kind==='snake'?'#ece4ff':palette[2],'stroke-width':kind==='snake'?12:1.6,'stroke-linecap':'round','stroke-linejoin':'round'},g);
if(kind==='person'){
  const costume=name==='究極拳巫女パンチ'?(x<230?'bunny':x>410?'short':'miko'):name==='ドラゴン•エール'?'dragonGirl':name==='癒し系アイドル'?'idol':name==='春風と木音'?'spring':'person';
  if(costume==='miko'||costume==='idol'||costume==='spring')el('path',{d:'M-18 -7 Q0 1 18 -7 L29 42 Q0 53 -29 42Z',fill:costume==='miko'?'#e5c9d1':palette[1],opacity:.78},g);
  if(costume==='bunny'){el('path',{d:'M-13 -46 L-18 -94 Q-7 -105 -2 -49 M9 -46 L14 -94 Q25 -105 20 -49',fill:'#0b0b13',stroke:palette[2],'stroke-width':5},g);el('path',{d:'M18 16 Q49 6 41 38 Q33 50 49 65',fill:'none',stroke:'#c1bdc7','stroke-width':4,'stroke-dasharray':'4 3',class:'vs-chain-move'},g)}
  if(costume==='short')el('path',{d:'M-15 19 L-19 43 L-4 43 L0 20 M3 20 L8 43 L22 43 L17 19',fill:'#28324d'},g);
  if(costume==='dragonGirl')el('path',{d:'M-16 -45 L-28 -83 L-6 -57 M13 -46 L27 -83 L7 -58',fill:'#edb0d2',stroke:palette[2],'stroke-width':2},g);
  const armL=el('g',{class:'vs-arm vs-arm-left'},g);el('path',{d:'M-15 -2 L-33 22 L-27 39',fill:'none',stroke:fill,'stroke-width':12,'stroke-linecap':'round'},armL);
  const armR=el('g',{class:'vs-arm vs-arm-right'},g);el('path',{d:'M15 -2 L34 13 L41 -9',fill:'none',stroke:fill,'stroke-width':12,'stroke-linecap':'round'},armR);
  el('path',{d:'M-7 38 L-12 67 M7 38 L12 67',fill:'none',stroke:fill,'stroke-width':9,'stroke-linecap':'round',class:'vs-legs'},g);
  if(costume==='idol'||costume==='dragonGirl')el('circle',{cx:42,cy:-10,r:7,fill:palette[2],class:'vs-mic'},g);
}
if(kind==='bird'){el('path',{d:'M-7 0 Q-44 -47 -34 3 Q-22 27 4 9Z',fill:palette[1],stroke:palette[2],'stroke-width':2,class:'vs-wing'},g);el('circle',{cx:23,cy:-10,r:3,fill:palette[2]},g);el('path',{d:'M-8 29 L-10 40 M5 29 L6 40',stroke:palette[2],'stroke-width':3},g)}
if(kind==='dog'){el('path',{d:'M34 14 Q65 -32 71 5 Q71 27 45 25',fill:palette[1],stroke:palette[2],'stroke-width':3,class:'vs-tail'},g);el('path',{d:'M-22 31 L-24 49 M18 31 L20 49',stroke:fill,'stroke-width':12,'stroke-linecap':'round',class:'vs-paws'},g);el('circle',{cx:-12,cy:-4,r:3,fill:palette[2]},g);el('circle',{cx:13,cy:-4,r:3,fill:palette[2]},g)}
if(kind==='dragon'){el('path',{d:'M-22 -2 Q-88 -66 -72 19 Q-45 37 -12 13Z M22 -2 Q88 -66 72 19 Q45 37 12 13Z',fill:palette[1],stroke:palette[2],'stroke-width':2,class:'vs-dragon-wings'},g);el('path',{d:'M-7 30 Q4 43 16 28',fill:'none',stroke:palette[2],'stroke-width':3,class:'vs-singing'},g)}
if(kind==='tapir'){el('path',{d:'M38 -2 Q70 14 52 43 Q42 54 27 40',fill:'none',stroke:palette[1],'stroke-width':13,'stroke-linecap':'round',class:'vs-trunk'},g);el('path',{d:'M-25 32 L-28 49 M18 31 L19 49',stroke:fill,'stroke-width':12,'stroke-linecap':'round',class:'vs-paws'},g)}
return g};
const shape=(d,fill,cls='',opacity=1)=>el('path',{d,fill,class:cls,opacity},svg);const ornament=(symbol,x,y,cls)=>{const t=el('text',{x,y,'text-anchor':'middle','font-size':30,fill:palette[2],class:cls},svg);t.textContent=symbol;return t};
if(name==='怪異') {shape('M0 232 L640 232 L640 270 L0 270Z','#030306');for(let i=0;i<8;i++){const x=58+i*74;const a=figure('person',x,152,.9,'vs-human vs-h'+i);const b=figure('bird',x,169,.65,'vs-bird vs-h'+i);b.style.opacity='0';}ornament('···',320,245,'vs-float')}
else if(name==='ピカ犬'){figure('dog',310,134,2,'vs-bounce','#10394e');const tail=el('path',{d:'M378 146 Q470 96 425 60',fill:'none',stroke:'#9adff7','stroke-width':23,'stroke-linecap':'round',class:'vs-wag'},svg);ornament('✦',440,80,'vs-twinkle')}
else if(name==='眠気があってちゃんと良かったなぽ'){figure('person',320,146,1.65,'vs-float','#1c162e');shape('M220 170 Q320 60 420 170 Q320 225 220 170Z','none','vs-ward');figure('snake',320,160,1.7,'vs-sway');ornament('✧',420,80,'vs-twinkle')}
else if(name==='必殺ファン●ション'){
  // Six-second cinematic loop: charge, aim, finisher, impact, afterglow.
  const r=el('g',{class:'vs-mecha-hero',transform:'translate(238 144)'},svg);
  const piece=(d,fill,stroke='#d7edf8',width=2,parent=r,cls='')=>el('path',{d,fill,stroke,'stroke-width':width,'stroke-linejoin':'round',class:cls},parent);
  // Distinct mechanical silhouette, not the earlier activation pose.
  piece('M-39 -41 L-24 -61 L24 -61 L39 -41 L29 -9 L-29 -9Z','#111c2d');
  piece('M-27 -52 L27 -52 L19 -28 L-19 -28Z','#2b4d6b');
  piece('M-16 -41 L16 -41 L9 -35 L-9 -35Z','#b5f4ff','#a4eaff',1.5,r,'vs-mecha-visor');
  piece('M-37 -6 L-26 -24 L26 -24 L37 -6 L30 41 L-30 41Z','#111b2b');
  piece('M-19 -11 L19 -11 L12 21 L-12 21Z','#2b4c67');
  el('circle',{cx:0,cy:3,r:9,fill:'#b4f5ff',class:'vs-mecha-core'},r);
  piece('M-25 34 L-4 34 L-11 83 L-35 83Z','#0c1828');
  piece('M4 34 L25 34 L35 83 L11 83Z','#0c1828');
  const left=el('g',{class:'vs-mecha-arm-left'},r);
  piece('M-31 -18 L-52 -26 L-69 3 L-49 23 L-31 4Z','#111a29','#b4e5ff',2,left);
  piece('M-60 11 L-74 32 L-54 41 L-43 21Z','#22374f','#b4e5ff',2,left);
  const right=el('g',{class:'vs-mecha-arm-right'},r);
  piece('M31 -18 L51 -29 L73 -2 L57 18 L31 5Z','#121e30','#b4e5ff',2,right);
  piece('M62 3 L103 -4 L122 16 L99 34 L62 25Z','#243f5a','#b4e5ff',2,right);
  piece('M104 -3 L136 5 L145 20 L119 29Z','#d7efff','#e6fbff',2,right);
  el('circle',{cx:132,cy:13,r:13,fill:'#8feaff',class:'vs-mecha-muzzle'},right);
  // Speed lines, energy spiral, a beam that expands from the cannon, and an impact shockwave.
  for(let i=0;i<7;i++){
    const y=52+i*27;
    el('path',{d:`M${340+i*8} ${y} L${550+i*5} ${y-17}`,stroke:'#8acfff','stroke-width':i%2?2:4,opacity:.7,class:'vs-mecha-speed'},svg);
  }
  const charge=el('g',{class:'vs-mecha-charge'},svg);
  for(let i=0;i<12;i++){
    const a=i*Math.PI/6;
    el('circle',{cx:388+Math.cos(a)*54,cy:156+Math.sin(a)*54,r:2+i%3,fill:'#d9f9ff'},charge);
  }
  el('path',{d:'M355 150 Q460 110 635 85 L635 226 Q460 186 355 165Z',fill:'#7ddfff',opacity:.8,class:'vs-mecha-beam'},svg);
  el('path',{d:'M357 155 Q470 139 640 132 L640 179 Q470 174 357 161Z',fill:'#f3ffff',class:'vs-mecha-beam-core'},svg);
  el('circle',{cx:575,cy:154,r:42,fill:'none',stroke:'#c9f7ff','stroke-width':9,class:'vs-mecha-impact'},svg);
  el('circle',{cx:575,cy:154,r:18,fill:'#ffffff',class:'vs-mecha-flash'},svg);
  // Shimaenaga spectator at the edge of the stage.
  const bird=figure('bird',92,194,.72,'vs-mecha-bird','#e8f4ff');
  el('path',{d:'M65 221 Q92 215 119 221',fill:'none',stroke:'#9ac7dc','stroke-width':2},svg);
  const title=el('text',{x:470,y:39,'text-anchor':'middle',fill:'#e5faff','font-size':23,'font-weight':900,'letter-spacing':3,class:'vs-mecha-title'},svg);
  title.textContent='FINISHER';
}
else if(name==='コールドスリープ'){figure('tapir',315,140,1.7,'vs-float','#e7a4cb');for(let i=0;i<5;i++)ornament('☁',90+i*105,200-i%2*38,'vs-cloud')}
else if(name==='ドラゴン•エール'){figure('dragon',320,145,1.65,'vs-sway','#4e255b');for(let i=0;i<5;i++)ornament('♪',400+i*36,140-i*18,'vs-notes')}
else if(name==='究極拳巫女パンチ'){shape('M240 107 L240 91 L400 91 L400 107 M270 91 L270 185 M370 91 L370 185','#d7b0a4','vs-gate');figure('person',320,148,1.5,'vs-punch');figure('person',155,160,1.15,'vs-sway');figure('person',490,160,1.15,'vs-sway');shape('M463 104 Q488 114 490 146 Q491 175 513 182','none','vs-chain');ornament('✦',320,45,'vs-twinkle')}
else if(name==='春風と木音'){figure('person',320,150,1.6,'vs-sway');el('ellipse',{cx:410,cy:210,rx:40,ry:21,fill:'#503b36',class:'vs-drum'},svg);for(let i=0;i<7;i++)ornament('✿',70+i*80,65+i%3*35,'vs-petal')}
else if(name==='やかましいわ'){shape('M0 0 L150 0 L150 230 L0 230 Z','#10121b');shape('M490 0 L640 0 L640 230 L490 230 Z','#10121b');figure('person',320,150,1.65,'vs-beat');shape('M292 98 Q320 58 348 98','none','vs-headphones');for(let i=0;i<5;i++)ornament('♫',80+i*115,105+i%2*35,'vs-beat')}
else if(name==='癒し系アイドル'){figure('person',320,150,1.65,'vs-dance');shape('M320 125 L320 215','none','vs-microphone');figure('bird',470,150,.65,'vs-ghost');for(let i=0;i<5;i++)ornament(i%2?'✦':'♪',90+i*110,70+i%3*25,'vs-notes')}
else if(name==='タイダル・ウィンド'){shape('M0 222 L640 222 L640 270 L0 270 Z','#f1d6a0');shape('M260 65 L390 65 L390 203 L260 203 Z','#4e3930');shape('M248 65 L400 65 L375 38 L275 38Z','#292d3e');figure('person',450,135,1.25,'vs-sway');el('path',{d:'M0 220 Q80 192 160 220 T320 220 T480 220 T640 220',stroke:'#8ad8e8','stroke-width':12,fill:'none',class:'vs-wave'},svg);for(let i=0;i<4;i++)ornament('▤',80+i*135,90+i%2*40,'vs-petal')}
else if(name==='電脳世界ハリケーン'){shape('M55 30 L585 30 L585 238 L55 238Z','#1a225c');figure('person',320,150,1.55,'vs-float');for(let i=0;i<9;i++)ornament(['♥','✦','★','▣'][i%4],60+i*66,60+i%3*65,'vs-sticker')}
else {figure('bird',320,145,1.8,'vs-float')}
// Scene-specific cinematic layers. The same rendering function is used by BOT and online.
const fx=el('g',{class:'vs-cinematic-fx'},svg);
const line=(d,color,cls,width=3,opacity=1)=>el('path',{d,fill:'none',stroke:color,'stroke-width':width,'stroke-linecap':'round',opacity,class:cls},fx);
const glow=(x,y,r,color,cls)=>el('circle',{cx:x,cy:y,r,fill:color,class:cls},fx);
const beam=(d,color,cls)=>el('path',{d,fill:color,class:cls},fx);
const ring=(x,y,r,color,cls)=>el('circle',{cx:x,cy:y,r,fill:'none',stroke:color,'stroke-width':4,class:cls},fx);
const sparks=(x,y,color,count=12,cls='vs-cine-spark')=>{for(let i=0;i<count;i++){const a=i*2*Math.PI/count;line(`M${x+Math.cos(a)*16} ${y+Math.sin(a)*16} L${x+Math.cos(a)*(43+i%4*13)} ${y+Math.sin(a)*(43+i%4*13)}`,color,cls,1.5+i%3)}};
if(name==='究極拳巫女パンチ'){
  ring(385,143,24,'#fff3cf','vs-cine-punch-ring');sparks(385,143,'#fff6d0',18,'vs-cine-punch-spark');
  beam('M340 139 L590 88 L565 147 L630 171 L352 155Z','#fff3d0','vs-cine-punch-wave');
  for(let i=0;i<6;i++)line(`M${30+i*19} ${188-i*17} L${165+i*16} ${161-i*13}`,'#f6d5ad','vs-cine-wind',2);
}else if(name==='眠気があってちゃんと良かったなぽ'){
  for(let i=0;i<4;i++)ring(320,157,38+i*25,'#e9e4ff','vs-cine-ward-ring');
  beam('M320 43 Q375 83 425 147 Q350 114 320 43Z','#fff9e4','vs-cine-protection');
  for(let i=0;i<9;i++)glow(150+i*38,72+i%3*31,2+i%3,'#fffdf0','vs-cine-spirit');
}else if(name==='必殺ファン●ション'){
  for(let i=0;i<5;i++)ring(373,156,12+i*12,'#9eeaff','vs-cine-mecha-charge');
  beam('M365 149 L640 15 L640 264 L365 166Z','#d8faff','vs-cine-mecha-finisher');
  sparks(570,151,'#f5ffff',20,'vs-cine-mecha-shock');
}else if(name==='春風と木音'){
  for(let i=0;i<10;i++)beam(`M${i*70} ${50+i%3*36} Q${i*70+13} ${40+i%3*36} ${i*70+28} ${59+i%3*36} Q${i*70+9} ${77+i%3*36} ${i*70} ${50+i%3*36}Z`,'#ffd2df','vs-cine-petal');
  for(let i=0;i<4;i++)line(`M${40+i*10} ${160+i*18} Q300 ${95+i*15} 610 ${130+i*20}`,'#fff3db','vs-cine-wind',2);
  ring(409,207,21,'#ffe7c9','vs-cine-drum-ring');
}else if(name==='やかましいわ'){
  for(let i=0;i<7;i++)line(`M${35+i*93} 235 L${35+i*93} ${175-(i%3)*42}`,'#a98dff','vs-cine-equalizer',9);
  for(let i=0;i<4;i++)ring(320,134,48+i*39,'#b6a4ff','vs-cine-bass');
  beam('M210 0 L235 0 L435 270 L400 270Z','#b4a0ff','vs-cine-strobe');
}else if(name==='癒し系アイドル'){
  for(let i=0;i<5;i++)beam(`M${55+i*120} 0 L${85+i*120} 0 L${330+i*25} 230 L${305+i*25} 230Z`,i%2?'#ffb9ff':'#d5aaff','vs-cine-spotlight');
  for(let i=0;i<12;i++)glow(35+i*52,230-(i%3)*12,4+i%4,'#ffdbff','vs-cine-crowd');
  sparks(330,92,'#f9d2ff',12,'vs-cine-idol-spark');
}else if(name==='ピカ犬'){
  for(let i=0;i<3;i++)beam(`M${240+i*34} 208 Q${320+i*30} 180 ${385+i*33} 214 Q${320+i*30} 202 ${240+i*34} 208Z`,'#e8fbff','vs-cine-dog-dust');
  for(let i=0;i<9;i++)line(`M${260+i*15} ${74-i%3*9} L${275+i*15} ${52-i%3*9}`,'#fff','#vs-cine-dog-spark'.replace('#',''),3);
  ring(318,142,80,'#e9fcff','vs-cine-dog-halo');
}else if(name==='タイダル・ウィンド'){
  for(let i=0;i<4;i++)line(`M-40 ${187+i*18} Q85 ${156+i*17} 180 ${187+i*18} T400 ${187+i*18} T680 ${187+i*18}`,'#e5faff','vs-cine-tidal',5-i%2);
  for(let i=0;i<8;i++)glow(45+i*78,210+i%2*14,3+i%3,'#eaffff','vs-cine-spray');
  beam('M470 0 L515 0 L400 190 L382 190Z','#fff4cd','vs-cine-sunray');
}else if(name==='コールドスリープ'){
  for(let i=0;i<6;i++)ring(315,139,35+i*18,'#ffe2f4','vs-cine-dream-ring');
  for(let i=0;i<7;i++)glow(60+i*86,72+i%3*26,6+i%3*3,'#fff4fd','vs-cine-dream-bubble');
  beam('M190 225 Q320 180 450 225 Q320 256 190 225Z','#fbd6f1','vs-cine-dream-mist');
}else if(name==='ドラゴン•エール'){
  for(let i=0;i<6;i++)ring(322,143,35+i*22,'#ffd3f2','vs-cine-song-ring');
  for(let i=0;i<8;i++)beam(`M${375+i*29} ${160-i*12} Q${385+i*29} ${142-i*12} ${399+i*29} ${154-i*12} Q${382+i*29} ${165-i*12} ${375+i*29} ${160-i*12}Z`,'#ffe8f5','vs-cine-song-note');
  beam('M270 140 Q320 42 370 140 Q320 105 270 140Z','#ffb8e2','vs-cine-dragon-flare');
}else if(name==='電脳世界ハリケーン'){
  for(let i=0;i<9;i++)line(`M${45+i*67} 0 L${130+i*53} 270`,'#b3d6ff','vs-cine-digital-rain',1.5);
  for(let i=0;i<6;i++)ring(320,137,24+i*29,'#f8bdf4','vs-cine-data-ring');
  beam('M210 85 L385 35 L350 115 L460 180 L235 225 L295 150Z','#ffb5e8','vs-cine-sticker-burst');
}else if(name==='怪異'){
  for(let i=0;i<8;i++){const x=58+i*74;ring(x,170,19,'#e5e6ef',`vs-cine-morph vs-cine-morph-${i}`)}
  for(let i=0;i<5;i++)line(`M${i*145} 0 L${i*145+65} 270`,'#c6c8d4','vs-cine-horror-scratch',1.5);
  beam('M0 0 L640 0 L640 270 L0 270Z','#fff','vs-cine-horror-flash');
}
return svg}
window.renderMovingSilhouettes=animate;
})();
