/* Shared deterministic state transitions for online and local demo. Prototype subset of card effects. */
(function(root){'use strict';
const CARDS=root.ONLINE_CARDS||[];
const byName=Object.fromEntries(CARDS.map((c,i)=>[c[0],i]));
const supported=new Set(['buncho','draw','hit','special3','special5','mill','heal','shino','chitose','miko','sleepmagic','dreammore','massage','nap','mugi','coldsleep','otomo','mochi','nice','funfun','love','star','napo','sbff','zodia','dragon','flamingo','ambassador','gamingjuice']);
function shuffle(a,random=Math.random){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function makeDeck(names){if(!names||typeof names!=='object')throw Error('デッキがありません');let result=[];for(const [name,count] of Object.entries(names)){if(!Number.isInteger(count)||count<0||count>5||byName[name]===undefined)throw Error('不正なカード: '+name);if(!supported.has(CARDS[byName[name]][2]))throw Error('オンライン未対応カード: '+name);result.push(...Array(count).fill(byName[name]));}if(result.length!==20)throw Error('20枚のデッキを選択してください');return result}
function starter(){return {'ﾌﾞﾝﾁｮｳｱﾀｯｸ':3,'観測者の悪ノリ':3,'必殺ファン●ション':1,'小森アタック':5,'まずはありがとう':3,'チトセニウム':3,'人手不足の魔導書':2}}
// Starter contains advanced effects, so use a separately labeled supported-only demo deck.
function sleepDeck(){return {'睡魔の術':1,'夢の続きをまた':3,'ゲーミングジュース':2,'夢紡ぐバグのアンバサダー':3,'コールドスリープ':3,'むぎむぎｱﾀｯｸ':3,'寝かしつけマッサージ':2,'お昼寝(昼夜逆転)':3}}
function demoDeck(){return {'ﾌﾞﾝﾁｮｳｱﾀｯｸ':3,'観測者の悪ノリ':3,'小森アタック':5,'星色の推し活':3,'お転婆お嬢様！！':3,'むぎむぎｱﾀｯｸ':3}}
function player(deck){return {deck:shuffle(deck),hand:[],used:[],life:7,sleepy:false,asleep:false,cold:false,napUntil:0,ownTurns:0,wakePenalty:0,sleepBonus:0,ratePenalty:0,funfun:0,love:0}}
function draw(g,who,n=1){let p=g.players[who];for(let i=0;i<n;i++){if(!p.deck.length){g.winner=1-who;g.over=true;g.log.push('山札切れ：'+(who+1)+'Pの敗北');return;}p.hand.push(p.deck.pop())}}
function start(decks,random=Math.random){let g={version:1,players:decks.map(player),turn:random()<.5?0:1,acted:false,round:0,over:false,winner:null,pending:null,log:['対戦開始'],lastAction:null};for(let i=0;i<2;i++)draw(g,i,2);begin(g,true,random);return g}
function begin(g,first=false,random=Math.random){if(g.over)return;let p=g.players[g.turn];g.acted=false;g.round++;p.ownTurns++;g.log.push((g.turn+1)+'Pのターン');if(!first)draw(g,g.turn,1);}
function damage(g,who,n){let p=g.players[who];if(p.asleep&&p.cold){g.log.push('コールドスリープ：ダメージ無効');return;}p.life=Math.max(0,p.life-n);if(!p.life){g.over=true;g.winner=1-who}}
function heal(g,who,n){let p=g.players[who];p.life=Math.min(7,p.life+n)}
function sleepy(p){if(!p.asleep)p.sleepy=true}
function sleep(p,cold=false){p.asleep=true;p.sleepy=false;p.cold=!!cold}
function end(g,random=Math.random){if(g.over||g.pending)throw Error('選択待ちです');let p=g.players[g.turn];if(p.asleep){if(p.ownTurns>=p.napUntil&&random()<Math.max(0,.2-p.wakePenalty)){p.asleep=false;p.cold=false;g.log.push('自然に目が覚めた')}}else if(p.sleepy&&random()<Math.min(1,.2+p.sleepBonus)){sleep(p);g.log.push('眠気で眠ってしまった')}g.turn=1-g.turn;begin(g,false,random)}
function colorPair(id){let c=CARDS[id],n=c?.[0]||'';let kind=c?.[2]||'';const mapping={miko:'紅>白',mugi:'薄紫>桃',coldsleep:'薄紫>桃',sleepmagic:'紫>黒',dreammore:'紫>桃',nap:'紫>白',hit:'銀>灰',buncho:'薄紫>橙',draw:'紺>水',mill:'桃>桃'};return mapping[kind]||'カード:'+n}
function category(id){let k=colorPair(id).split('>');return k[k.length-1]}
function haunt(g,who,id){let c=category(id),opp=1-who,p=g.players[who],q=g.players[opp];if(['赤','紅'].includes(c))damage(g,opp,2);else if(['青','紺'].includes(c)){if(q.hand.length)q.used.push(q.hand.splice(0,1)[0])}else if(['緑','黄'].includes(c)){for(let i=0;i<2&&q.deck.length;i++)q.used.push(q.deck.pop())}else if(['桃','紫'].includes(c)){damage(g,opp,1);heal(g,who,1)}else{damage(g,opp,1);if(!g.over)draw(g,who,1)}const title=['赤','紅'].includes(c)?'怨霊との遭遇':['青','紺'].includes(c)?'幽霊の囁き':['緑','黄'].includes(c)?'神隠し':['桃','紫'].includes(c)?'怪異の憑依':'正体不明の怪異';g.fx={id:(g.fx?.id||0)+1,type:'haunt',title,color:c,card:CARDS[id][0],who};g.log.push('👻 逸般巫女：'+title+'（'+CARDS[id][0]+'／'+c+'）')}
function play(g,who,index,random=Math.random){if(g.over||g.turn!==who||g.acted||g.pending)throw Error('現在はカードを使用できません');let p=g.players[who],id=p.hand[index];if(id===undefined)throw Error('カードがありません');let [name,desc,kind]=CARDS[id];if(!supported.has(kind))throw Error('未対応カードです');if(kind==='gamingjuice')throw Error('ゲーミングジュースは通常使用できません');if(p.asleep&&!['mugi','coldsleep','ambassador'].includes(kind))throw Error('睡眠中は使用できません');if(kind==='chitose'&&p.hand.length<4)throw Error('手札4枚以上が必要です');p.hand.splice(index,1);p.used.push(id);g.acted=true;g.lastAction={who,name};g.log.push((who+1)+'P：'+name);g.luxurySeq=(g.luxurySeq||0)+1;g.luxuryEvents=[...(g.luxuryEvents||[]).slice(-29),{seq:g.luxurySeq,who,name}];let opp=1-who,q=g.players[opp],opponentWasSleepy=p.sleepy&&!p.asleep;
if(kind==='ambassador'){if(p.asleep){damage(g,opp,2);heal(g,who,1)}else sleep(p);if(!g.over&&opponentWasSleepy&&q.hand.some(x=>CARDS[x][2]==='gamingjuice'))g.pending={type:'juice',who:opp,source:who};return}
if(kind==='miko') {let top=[];for(let i=0;i<2&&p.deck.length;i++)top.push(p.deck.pop());if(top.length===2&&colorPair(top[0])!==colorPair(top[1])){g.pending={type:'miko',who,cards:top};g.fx={id:(g.fx?.id||0)+1,type:'haunt-reveal',who,cards:top.map(x=>({name:CARDS[x][0],pair:colorPair(x)}))};g.log.push('逸般巫女：2枚の区分が異なるため選択待ち')}else{p.deck.unshift(...top);g.fx={id:(g.fx?.id||0)+1,type:'haunt-fail',who,reason:top.length<2?'山札のカードが不足':'2枚の区分が完全一致'};g.log.push('逸般巫女：区分一致またはカード不足で不発')}return}
if(['hit','otomo','mochi','buncho','mugi'].includes(kind))damage(g,opp,1);
if(['draw','chitose'].includes(kind))draw(g,who,kind==='chitose'?2:1);
if(kind==='mill')for(let i=0;i<2&&q.deck.length;i++)q.used.push(q.deck.pop());
if(kind==='heal')heal(g,who,1);
if(kind==='shino'){heal(g,who,1);if(p.deck.length)p.used.push(p.deck.pop())}
if(kind==='sleepmagic')sleepy(q);
if(kind==='dreammore'){sleepy(p);sleepy(q);q.wakePenalty=Math.min(.2,q.wakePenalty+.1);q.sleepBonus+=.1;q.ratePenalty+=.1}
if(kind==='massage'){sleepy(p);heal(g,who,2)}
if(kind==='nap'){heal(g,who,3);sleep(p);p.napUntil=p.ownTurns+2}
if(kind==='coldsleep')sleep(p,true);
if(kind==='mugi'){p.asleep=false;p.sleepy=false;p.cold=false;p.napUntil=0}
if(kind==='funfun')p.funfun++;
if(kind==='love')p.love++;
if(kind==='star'){draw(g,who,2);if(p.hand.length<=2){p.used.push(...p.hand);p.hand=[]}}
if(kind==='special3'&&p.hand.length===0)damage(g,opp,3);
if(kind==='special5'&&p.hand.length>=6)damage(g,opp,5);
if(kind==='nice'&&q.life>p.life||kind==='nice'&&q.life<=1)damage(g,opp,1);
if(kind==='napo'){let used=p.used.filter(x=>x!==id).slice(-2);for(const x of used){p.used.splice(p.used.indexOf(x),1);p.deck.unshift(x)}}
if(kind==='buncho'){let i=p.hand.findIndex(x=>CARDS[x][0].includes('ﾌﾞﾝﾁｮｳ'));if(i>=0){p.used.push(p.hand.splice(i,1)[0]);damage(g,opp,1)}}
// Opponent may discard Gaming Juice as a reaction; resolution happens after the played card.
if(!g.over&&opponentWasSleepy){let ji=q.hand.findIndex(x=>CARDS[x][2]==='gamingjuice');if(ji>=0){g.pending={type:'juice',who:opp,source:who,index:ji};g.log.push('ゲーミングジュース：相手のリアクション待ち')}}
if(p.funfun&&random()<Math.min(1,p.funfun*.3))damage(g,opp,1);
if(p.love&&random()<Math.min(1,p.love*.5))draw(g,who,1);
}
function choose(g,who,index){if(!g.pending||g.pending.type!=='miko'||g.pending.who!==who)throw Error('選択権がありません');if(index!==0&&index!==1)throw Error('選択肢が不正です');let p=g.players[who],top=g.pending.cards;let chosen=top[index],other=top[1-index];p.used.push(chosen);p.deck.unshift(other);g.pending=null;haunt(g,who,chosen);if(!g.over&&g.players[who].sleepy&&!g.players[who].asleep){let q=g.players[1-who];if(q.hand.some(x=>CARDS[x][2]==='gamingjuice'))g.pending={type:'juice',who:1-who,source:who}}}
function react(g,who,accept){let r=g.pending;if(!r||r.type!=='juice'||r.who!==who)throw Error('リアクションの選択権がありません');g.pending=null;if(accept){let p=g.players[who],i=p.hand.findIndex(x=>CARDS[x][2]==='gamingjuice');if(i<0)throw Error('ゲーミングジュースが手札にありません');p.used.push(p.hand.splice(i,1)[0]);sleepy(g.players[r.source]);g.log.push('ゲーミングジュース：使用後に相手へ眠気を付与')}}
function attack(g,who,indices){if(g.over||g.turn!==who||g.acted||g.pending)throw Error('攻撃できません');let p=g.players[who];if(p.asleep)throw Error('睡眠中です');if(!Array.isArray(indices)||indices.length!==2||indices[0]===indices[1]||indices.some(i=>!Number.isInteger(i)||i<0||i>=p.hand.length))throw Error('手札2枚が必要です');for(let i of [...indices].sort((a,b)=>b-a))p.used.push(p.hand.splice(i,1)[0]);g.acted=true;damage(g,1-who,1);g.log.push((who+1)+'P：USED攻撃')}
function apply(g,who,action,random=Math.random){let copy=JSON.parse(JSON.stringify(g));let oldFx=copy.fx?.id||0;if(action.type==='play')play(copy,who,action.index,random);else if(action.type==='choose')choose(copy,who,action.index);else if(action.type==='react')react(copy,who,action.accept===true);else if(action.type==='attack')attack(copy,who,action.indices);else if(action.type==='end'){if(copy.turn!==who||copy.over)throw Error('ターン外です');end(copy,random)}else throw Error('不明な操作');if(copy.fx&&copy.fx.id!==oldFx){copy.fxSeq=(copy.fxSeq||0)+1;copy.fxEvents=[...(copy.fxEvents||[]).slice(-19),{...copy.fx,seq:copy.fxSeq}]}return copy}
root.OnlineEngine={CARDS,byName,supported,makeDeck,demoDeck,sleepDeck,start,apply,colorPair,category};
})(typeof globalThis!=='undefined'?globalThis:this);
