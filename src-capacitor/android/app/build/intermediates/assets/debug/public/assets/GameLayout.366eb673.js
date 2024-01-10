import{Q as Ke,a as Ue}from"./QLayout.500d8818.js";import{q as W,c as d,h as L,x as H,Y as ve,a6 as Ge,Z as fe,a7 as Je,r as E,g as me,a8 as Ze,a9 as De,aa as et,ab as tt,ac as at,ad as P,A as nt,ae as it,af as j,ag as ne,ah as _e,ai as ie,aj as de,ak as oe,al as ot,am as rt,an as ut,i as lt,s as re,t as st,ao as dt,ap as ct,w as _,o as vt,H as we,z as ft,P as ce,aq as ke,ar as mt,_ as Ee,M as $e,L as ht,l as F,m as Y,n as S,f as B,as as yt,O as Q,Q as bt,a0 as pt,F as gt,$ as qe,U as Ce,R as _t,at as wt,a4 as kt,a5 as qt,d as Ct,k as Se}from"./index.34ef79da.js";var ue=W({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:n}){const r=d(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>L("div",{class:r.value},H(n.default))}}),Be=W({name:"QItem",props:{...ve,...Ge,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:n,emit:r}){const{proxy:{$q:f}}=me(),t=fe(e,f),{hasLink:i,linkAttrs:u,linkClass:c,linkTag:m,navigateOnClick:s}=Je(),o=E(null),g=E(null),p=d(()=>e.clickable===!0||i.value===!0||e.tag==="label"),y=d(()=>e.disable!==!0&&p.value===!0),v=d(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(t.value===!0?" q-item--dark":"")+(i.value===!0&&e.active===null?c.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(y.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),C=d(()=>{if(e.insetLevel===void 0)return null;const b=f.lang.rtl===!0?"Right":"Left";return{["padding"+b]:16+e.insetLevel*56+"px"}});function w(b){y.value===!0&&(g.value!==null&&(b.qKeyEvent!==!0&&document.activeElement===o.value?g.value.focus():document.activeElement===g.value&&o.value.focus()),s(b))}function h(b){if(y.value===!0&&Ze(b,13)===!0){De(b),b.qKeyEvent=!0;const T=new MouseEvent("click",b);T.qKeyEvent=!0,o.value.dispatchEvent(T)}r("keyup",b)}function z(){const b=et(n.default,[]);return y.value===!0&&b.unshift(L("div",{class:"q-focus-helper",tabindex:-1,ref:g})),b}return()=>{const b={ref:o,class:v.value,style:C.value,role:"listitem",onClick:w,onKeyup:h};return y.value===!0?(b.tabindex=e.tabindex||"0",Object.assign(b,u.value)):p.value===!0&&(b["aria-disabled"]="true"),L(m.value,b,z())}}}),St=W({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:n}){const r=d(()=>parseInt(e.lines,10)),f=d(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(r.value===1?" ellipsis":"")),t=d(()=>e.lines!==void 0&&r.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":r.value}:null);return()=>L("div",{style:t.value,class:f.value},H(n.default))}}),Bt=W({name:"QList",props:{...ve,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:n}){const r=me(),f=fe(e,r.proxy.$q),t=d(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(f.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>L(e.tag,{class:t.value},H(n.default))}});const he={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},xt=Object.keys(he);he.all=!0;function xe(e){const n={};for(const r of xt)e[r]===!0&&(n[r]=!0);return Object.keys(n).length===0?he:(n.horizontal===!0?n.left=n.right=!0:n.left===!0&&n.right===!0&&(n.horizontal=!0),n.vertical===!0?n.up=n.down=!0:n.up===!0&&n.down===!0&&(n.vertical=!0),n.horizontal===!0&&n.vertical===!0&&(n.all=!0),n)}const Lt=["INPUT","TEXTAREA"];function Le(e,n){return n.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof n.handler=="function"&&Lt.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(n.uid)===-1)}function Mt(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),tt.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function le(e,n,r){const f=de(e);let t,i=f.left-n.event.x,u=f.top-n.event.y,c=Math.abs(i),m=Math.abs(u);const s=n.direction;s.horizontal===!0&&s.vertical!==!0?t=i<0?"left":"right":s.horizontal!==!0&&s.vertical===!0?t=u<0?"up":"down":s.up===!0&&u<0?(t="up",c>m&&(s.left===!0&&i<0?t="left":s.right===!0&&i>0&&(t="right"))):s.down===!0&&u>0?(t="down",c>m&&(s.left===!0&&i<0?t="left":s.right===!0&&i>0&&(t="right"))):s.left===!0&&i<0?(t="left",c<m&&(s.up===!0&&u<0?t="up":s.down===!0&&u>0&&(t="down"))):s.right===!0&&i>0&&(t="right",c<m&&(s.up===!0&&u<0?t="up":s.down===!0&&u>0&&(t="down")));let o=!1;if(t===void 0&&r===!1){if(n.event.isFirst===!0||n.event.lastDir===void 0)return{};t=n.event.lastDir,o=!0,t==="left"||t==="right"?(f.left-=i,c=0,i=0):(f.top-=u,m=0,u=0)}return{synthetic:o,payload:{evt:e,touch:n.event.mouse!==!0,mouse:n.event.mouse===!0,position:f,direction:t,isFirst:n.event.isFirst,isFinal:r===!0,duration:Date.now()-n.event.time,distance:{x:c,y:m},offset:{x:i,y:u},delta:{x:f.left-n.event.lastX,y:f.top-n.event.lastY}}}}let Dt=0;var se=at({name:"touch-pan",beforeMount(e,{value:n,modifiers:r}){if(r.mouse!==!0&&P.has.touch!==!0)return;function f(i,u){r.mouse===!0&&u===!0?De(i):(r.stop===!0&&ie(i),r.prevent===!0&&_e(i))}const t={uid:"qvtp_"+Dt++,handler:n,modifiers:r,direction:xe(r),noop:nt,mouseStart(i){Le(i,t)&&it(i)&&(j(t,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),t.start(i,!0))},touchStart(i){if(Le(i,t)){const u=i.target;j(t,"temp",[[u,"touchmove","move","notPassiveCapture"],[u,"touchcancel","end","passiveCapture"],[u,"touchend","end","passiveCapture"]]),t.start(i)}},start(i,u){if(P.is.firefox===!0&&ne(e,!0),t.lastEvt=i,u===!0||r.stop===!0){if(t.direction.all!==!0&&(u!==!0||t.modifiers.mouseAllDir!==!0&&t.modifiers.mousealldir!==!0)){const s=i.type.indexOf("mouse")>-1?new MouseEvent(i.type,i):new TouchEvent(i.type,i);i.defaultPrevented===!0&&_e(s),i.cancelBubble===!0&&ie(s),Object.assign(s,{qKeyEvent:i.qKeyEvent,qClickOutside:i.qClickOutside,qAnchorHandled:i.qAnchorHandled,qClonedBy:i.qClonedBy===void 0?[t.uid]:i.qClonedBy.concat(t.uid)}),t.initialEvent={target:i.target,event:s}}ie(i)}const{left:c,top:m}=de(i);t.event={x:c,y:m,time:Date.now(),mouse:u===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:c,lastY:m}},move(i){if(t.event===void 0)return;const u=de(i),c=u.left-t.event.x,m=u.top-t.event.y;if(c===0&&m===0)return;t.lastEvt=i;const s=t.event.mouse===!0,o=()=>{f(i,s);let y;r.preserveCursor!==!0&&r.preservecursor!==!0&&(y=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),s===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Mt(),t.styleCleanup=v=>{if(t.styleCleanup=void 0,y!==void 0&&(document.documentElement.style.cursor=y),document.body.classList.remove("non-selectable"),s===!0){const C=()=>{document.body.classList.remove("no-pointer-events--children")};v!==void 0?setTimeout(()=>{C(),v()},50):C()}else v!==void 0&&v()}};if(t.event.detected===!0){t.event.isFirst!==!0&&f(i,t.event.mouse);const{payload:y,synthetic:v}=le(i,t,!1);y!==void 0&&(t.handler(y)===!1?t.end(i):(t.styleCleanup===void 0&&t.event.isFirst===!0&&o(),t.event.lastX=y.position.left,t.event.lastY=y.position.top,t.event.lastDir=v===!0?void 0:y.direction,t.event.isFirst=!1));return}if(t.direction.all===!0||s===!0&&(t.modifiers.mouseAllDir===!0||t.modifiers.mousealldir===!0)){o(),t.event.detected=!0,t.move(i);return}const g=Math.abs(c),p=Math.abs(m);g!==p&&(t.direction.horizontal===!0&&g>p||t.direction.vertical===!0&&g<p||t.direction.up===!0&&g<p&&m<0||t.direction.down===!0&&g<p&&m>0||t.direction.left===!0&&g>p&&c<0||t.direction.right===!0&&g>p&&c>0?(t.event.detected=!0,t.move(i)):t.end(i,!0))},end(i,u){if(t.event!==void 0){if(oe(t,"temp"),P.is.firefox===!0&&ne(e,!1),u===!0)t.styleCleanup!==void 0&&t.styleCleanup(),t.event.detected!==!0&&t.initialEvent!==void 0&&t.initialEvent.target.dispatchEvent(t.initialEvent.event);else if(t.event.detected===!0){t.event.isFirst===!0&&t.handler(le(i===void 0?t.lastEvt:i,t).payload);const{payload:c}=le(i===void 0?t.lastEvt:i,t,!0),m=()=>{t.handler(c)};t.styleCleanup!==void 0?t.styleCleanup(m):m()}t.event=void 0,t.initialEvent=void 0,t.lastEvt=void 0}}};if(e.__qtouchpan=t,r.mouse===!0){const i=r.mouseCapture===!0||r.mousecapture===!0?"Capture":"";j(t,"main",[[e,"mousedown","mouseStart",`passive${i}`]])}P.has.touch===!0&&j(t,"main",[[e,"touchstart","touchStart",`passive${r.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,n){const r=e.__qtouchpan;r!==void 0&&(n.oldValue!==n.value&&(typeof value!="function"&&r.end(),r.handler=n.value),r.direction=xe(n.modifiers))},beforeUnmount(e){const n=e.__qtouchpan;n!==void 0&&(n.event!==void 0&&n.end(),oe(n,"main"),oe(n,"temp"),P.is.firefox===!0&&ne(e,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete e.__qtouchpan)}});function X(e,n,r){return r<=n?n:Math.min(r,Math.max(n,e))}const Me=150;var Et=W({name:"QDrawer",inheritAttrs:!1,props:{...ot,...ve,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...rt,"onLayout","miniState"],setup(e,{slots:n,emit:r,attrs:f}){const t=me(),{proxy:{$q:i}}=t,u=fe(e,i),{preventBodyScroll:c}=mt(),{registerTimeout:m,removeTimeout:s}=ut(),o=lt(st,re);if(o===re)return console.error("QDrawer needs to be child of QLayout"),re;let g,p=null,y;const v=E(e.behavior==="mobile"||e.behavior!=="desktop"&&o.totalWidth.value<=e.breakpoint),C=d(()=>e.mini===!0&&v.value!==!0),w=d(()=>C.value===!0?e.miniWidth:e.width),h=E(e.showIfAbove===!0&&v.value===!1?!0:e.modelValue===!0),z=d(()=>e.persistent!==!0&&(v.value===!0||Ie.value===!0));function b(a,l){if(Oe(),a!==!1&&o.animate(),q(0),v.value===!0){const k=o.instances[N.value];k!==void 0&&k.belowBreakpoint===!0&&k.hide(!1),M(1),o.isContainer.value!==!0&&c(!0)}else M(0),a!==!1&&ee(!1);m(()=>{a!==!1&&ee(!0),l!==!0&&r("show",a)},Me)}function T(a,l){Te(),a!==!1&&o.animate(),M(0),q($.value*w.value),te(),l!==!0?m(()=>{r("hide",a)},Me):s()}const{show:K,hide:I}=dt({showing:h,hideOnRouteChange:z,handleShow:b,handleHide:T}),{addToHistory:Oe,removeFromHistory:Te}=ct(h,I,z),R={belowBreakpoint:v,hide:I},x=d(()=>e.side==="right"),$=d(()=>(i.lang.rtl===!0?-1:1)*(x.value===!0?1:-1)),ye=E(0),O=E(!1),U=E(!1),be=E(w.value*$.value),N=d(()=>x.value===!0?"left":"right"),G=d(()=>h.value===!0&&v.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:w.value:0),J=d(()=>e.overlay===!0||e.miniToOverlay===!0||o.view.value.indexOf(x.value?"R":"L")>-1||i.platform.is.ios===!0&&o.isContainer.value===!0),A=d(()=>e.overlay===!1&&h.value===!0&&v.value===!1),Ie=d(()=>e.overlay===!0&&h.value===!0&&v.value===!1),Ae=d(()=>"fullscreen q-drawer__backdrop"+(h.value===!1&&O.value===!1?" hidden":"")),Pe=d(()=>({backgroundColor:`rgba(0,0,0,${ye.value*.4})`})),pe=d(()=>x.value===!0?o.rows.value.top[2]==="r":o.rows.value.top[0]==="l"),Fe=d(()=>x.value===!0?o.rows.value.bottom[2]==="r":o.rows.value.bottom[0]==="l"),Qe=d(()=>{const a={};return o.header.space===!0&&pe.value===!1&&(J.value===!0?a.top=`${o.header.offset}px`:o.header.space===!0&&(a.top=`${o.header.size}px`)),o.footer.space===!0&&Fe.value===!1&&(J.value===!0?a.bottom=`${o.footer.offset}px`:o.footer.space===!0&&(a.bottom=`${o.footer.size}px`)),a}),We=d(()=>{const a={width:`${w.value}px`,transform:`translateX(${be.value}px)`};return v.value===!0?a:Object.assign(a,Qe.value)}),ze=d(()=>"q-drawer__content fit "+(o.isContainer.value!==!0?"scroll":"overflow-auto")),Re=d(()=>`q-drawer q-drawer--${e.side}`+(U.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(u.value===!0?" q-drawer--dark q-dark":"")+(O.value===!0?" no-transition":h.value===!0?"":" q-layout--prevent-focus")+(v.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${C.value===!0?"mini":"standard"}`+(J.value===!0||A.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(pe.value===!0?" q-drawer--top-padding":""))),Ne=d(()=>{const a=i.lang.rtl===!0?e.side:N.value;return[[se,Ye,void 0,{[a]:!0,mouse:!0}]]}),Ve=d(()=>{const a=i.lang.rtl===!0?N.value:e.side;return[[se,ge,void 0,{[a]:!0,mouse:!0}]]}),je=d(()=>{const a=i.lang.rtl===!0?N.value:e.side;return[[se,ge,void 0,{[a]:!0,mouse:!0,mouseAllDir:!0}]]});function Z(){He(v,e.behavior==="mobile"||e.behavior!=="desktop"&&o.totalWidth.value<=e.breakpoint)}_(v,a=>{a===!0?(g=h.value,h.value===!0&&I(!1)):e.overlay===!1&&e.behavior!=="mobile"&&g!==!1&&(h.value===!0?(q(0),M(0),te()):K(!1))}),_(()=>e.side,(a,l)=>{o.instances[l]===R&&(o.instances[l]=void 0,o[l].space=!1,o[l].offset=0),o.instances[a]=R,o[a].size=w.value,o[a].space=A.value,o[a].offset=G.value}),_(o.totalWidth,()=>{(o.isContainer.value===!0||document.qScrollPrevented!==!0)&&Z()}),_(()=>e.behavior+e.breakpoint,Z),_(o.isContainer,a=>{h.value===!0&&c(a!==!0),a===!0&&Z()}),_(o.scrollbarWidth,()=>{q(h.value===!0?0:void 0)}),_(G,a=>{D("offset",a)}),_(A,a=>{r("onLayout",a),D("space",a)}),_(x,()=>{q()}),_(w,a=>{q(),ae(e.miniToOverlay,a)}),_(()=>e.miniToOverlay,a=>{ae(a,w.value)}),_(()=>i.lang.rtl,()=>{q()}),_(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(Xe(),o.animate())}),_(C,a=>{r("miniState",a)});function q(a){a===void 0?we(()=>{a=h.value===!0?0:w.value,q($.value*a)}):(o.isContainer.value===!0&&x.value===!0&&(v.value===!0||Math.abs(a)===w.value)&&(a+=$.value*o.scrollbarWidth.value),be.value=a)}function M(a){ye.value=a}function ee(a){const l=a===!0?"remove":o.isContainer.value!==!0?"add":"";l!==""&&document.body.classList[l]("q-body--drawer-toggle")}function Xe(){p!==null&&clearTimeout(p),t.proxy&&t.proxy.$el&&t.proxy.$el.classList.add("q-drawer--mini-animate"),U.value=!0,p=setTimeout(()=>{p=null,U.value=!1,t&&t.proxy&&t.proxy.$el&&t.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function Ye(a){if(h.value!==!1)return;const l=w.value,k=X(a.distance.x,0,l);if(a.isFinal===!0){k>=Math.min(75,l)===!0?K():(o.animate(),M(0),q($.value*l)),O.value=!1;return}q((i.lang.rtl===!0?x.value!==!0:x.value)?Math.max(l-k,0):Math.min(0,k-l)),M(X(k/l,0,1)),a.isFirst===!0&&(O.value=!0)}function ge(a){if(h.value!==!0)return;const l=w.value,k=a.direction===e.side,V=(i.lang.rtl===!0?k!==!0:k)?X(a.distance.x,0,l):0;if(a.isFinal===!0){Math.abs(V)<Math.min(75,l)===!0?(o.animate(),M(1),q(0)):I(),O.value=!1;return}q($.value*V),M(X(1-V/l,0,1)),a.isFirst===!0&&(O.value=!0)}function te(){c(!1),ee(!0)}function D(a,l){o.update(e.side,a,l)}function He(a,l){a.value!==l&&(a.value=l)}function ae(a,l){D("size",a===!0?e.miniWidth:l)}return o.instances[e.side]=R,ae(e.miniToOverlay,w.value),D("space",A.value),D("offset",G.value),e.showIfAbove===!0&&e.modelValue!==!0&&h.value===!0&&e["onUpdate:modelValue"]!==void 0&&r("update:modelValue",!0),vt(()=>{r("onLayout",A.value),r("miniState",C.value),g=e.showIfAbove===!0;const a=()=>{(h.value===!0?b:T)(!1,!0)};if(o.totalWidth.value!==0){we(a);return}y=_(o.totalWidth,()=>{y(),y=void 0,h.value===!1&&e.showIfAbove===!0&&v.value===!1?K(!1):a()})}),ft(()=>{y!==void 0&&y(),p!==null&&(clearTimeout(p),p=null),h.value===!0&&te(),o.instances[e.side]===R&&(o.instances[e.side]=void 0,D("size",0),D("offset",0),D("space",!1))}),()=>{const a=[];v.value===!0&&(e.noSwipeOpen===!1&&a.push(ce(L("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),Ne.value)),a.push(ke("div",{ref:"backdrop",class:Ae.value,style:Pe.value,"aria-hidden":"true",onClick:I},void 0,"backdrop",e.noSwipeBackdrop!==!0&&h.value===!0,()=>je.value)));const l=C.value===!0&&n.mini!==void 0,k=[L("div",{...f,key:""+l,class:[ze.value,f.class]},l===!0?n.mini():H(n.default))];return e.elevated===!0&&h.value===!0&&k.push(L("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),a.push(ke("aside",{ref:"content",class:Re.value,style:We.value},k,"contentclose",e.noSwipeClose!==!0&&v.value===!0,()=>Ve.value)),L("div",{class:"q-drawer-container"},a)}}}),$t=[{label:"Sair do Jogo",icon:"arrow_back",fullWidth:!0,activeInGame:!0,isLink:!0,action:"/home"},{label:"Cartas",icon:"style",fullWidth:!0,activeInGame:!0,isLink:!1,action:"cards"}];const Ot={setup(){const e=$e(),n=ht();return{layoutStore:e,sessionStore:n}},computed:{menuComputed(){let e=[];return $t.forEach(n=>{e.push(n)}),e}},methods:{itemClick(e){if(this.layoutStore.rightDrawerOpen=!1,!e.isLink)switch(e.action){case"cards":this.layoutStore.cardsDialog=!0;break}}}},Tt=e=>(kt("data-v-3caf901f"),e=e(),qt(),e),It=Tt(()=>Q("div",{class:"logo-container"},[Q("img",{src:"img/clue_logo.png",alt:""})],-1)),At={style:{padding:"1rem"}},Pt={class:"text-teal",style:{"text-decoration":"none"}};function Ft(e,n,r,f,t,i){return F(),Y(Et,{side:"right",class:"z-max",overlay:"",modelValue:f.layoutStore.rightDrawerOpen,"onUpdate:modelValue":n[0]||(n[0]=u=>f.layoutStore.rightDrawerOpen=u),bordered:""},{default:S(()=>[B(Bt,null,{default:S(()=>[ce((F(),Y(Be,{class:"q-pa-none"},{default:S(()=>[B(ue,null,{default:S(()=>[It]),_:1})]),_:1})),[[Ce]]),B(yt),Q("div",null,[(F(!0),bt(gt,null,pt(i.menuComputed,(u,c)=>ce((F(),Y(Be,{disable:!u.activeInGame,key:c,clickable:"",to:u.isLink?u.action:"",onClick:m=>i.itemClick(u)},{default:S(()=>[B(ue,{avatar:"",class:"q-pr-sm",style:{"min-width":"auto !important"}},{default:S(()=>[B(_t,{rounded:"",color:"primary","text-color":"white",name:u.icon},null,8,["name"])]),_:2},1024),B(ue,null,{default:S(()=>[wt(qe(u.label),1)]),_:2},1024)]),_:2},1032,["disable","to","onClick"])),[[Ce]])),128))]),B(St,{footer:""},{default:S(()=>[Q("div",At,[Q("span",Pt,"\xA9 "+qe(new Date().getFullYear())+" clue",1)])]),_:1})]),_:1})]),_:1},8,["modelValue"])}var Qt=Ee(Ot,[["render",Ft],["__scopeId","data-v-3caf901f"]]);const Wt=Ct({name:"GameLayout",setup(){const e=$e();return{layoutStore:e,toggleRightDrawer(){e.rightDrawerOpen=!e.rightDrawerOpen}}},components:{MainMenu:Qt}});function zt(e,n,r,f,t,i){const u=Se("MainMenu"),c=Se("router-view");return F(),Y(Ke,{view:"lHh Lpr lFf"},{default:S(()=>[B(u),B(Ue,{class:"clue-container"},{default:S(()=>[B(c)]),_:1})]),_:1})}var jt=Ee(Wt,[["render",zt],["__scopeId","data-v-51287176"]]);export{jt as default};
