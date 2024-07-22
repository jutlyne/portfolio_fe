import{c as w}from"./color-name-sJvbcIHU.js";function x(n,o){for(var c=0;c<o.length;c++){const t=o[c];if(typeof t!="string"&&!Array.isArray(t)){for(const e in t)if(e!=="default"&&!(e in n)){const s=Object.getOwnPropertyDescriptor(t,e);s&&Object.defineProperty(n,e,s.get?s:{enumerable:!0,get:()=>t[e]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var q=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function k(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function A(n){if(n.__esModule)return n;var o=n.default;if(typeof o=="function"){var c=function t(){return this instanceof t?Reflect.construct(o,arguments,this.constructor):o.apply(this,arguments)};c.prototype=o.prototype}else c={};return Object.defineProperty(c,"__esModule",{value:!0}),Object.keys(n).forEach(function(t){var e=Object.getOwnPropertyDescriptor(n,t);Object.defineProperty(c,t,e.get?e:{enumerable:!0,get:function(){return n[t]}})}),c}const g=w,p={};for(const n of Object.keys(g))p[g[n]]=n;const i={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};var m=i;for(const n of Object.keys(i)){if(!("channels"in i[n]))throw new Error("missing channels property: "+n);if(!("labels"in i[n]))throw new Error("missing channel labels property: "+n);if(i[n].labels.length!==i[n].channels)throw new Error("channel and label counts mismatch: "+n);const{channels:o,labels:c}=i[n];delete i[n].channels,delete i[n].labels,Object.defineProperty(i[n],"channels",{value:o}),Object.defineProperty(i[n],"labels",{value:c})}i.rgb.hsl=function(n){const o=n[0]/255,c=n[1]/255,t=n[2]/255,e=Math.min(o,c,t),s=Math.max(o,c,t),r=s-e;let l,a;s===e?l=0:o===s?l=(c-t)/r:c===s?l=2+(t-o)/r:t===s&&(l=4+(o-c)/r),l=Math.min(l*60,360),l<0&&(l+=360);const u=(e+s)/2;return s===e?a=0:u<=.5?a=r/(s+e):a=r/(2-s-e),[l,a*100,u*100]};i.rgb.hsv=function(n){let o,c,t,e,s;const r=n[0]/255,l=n[1]/255,a=n[2]/255,u=Math.max(r,l,a),f=u-Math.min(r,l,a),h=function(M){return(u-M)/6/f+1/2};return f===0?(e=0,s=0):(s=f/u,o=h(r),c=h(l),t=h(a),r===u?e=t-c:l===u?e=1/3+o-t:a===u&&(e=2/3+c-o),e<0?e+=1:e>1&&(e-=1)),[e*360,s*100,u*100]};i.rgb.hwb=function(n){const o=n[0],c=n[1];let t=n[2];const e=i.rgb.hsl(n)[0],s=1/255*Math.min(o,Math.min(c,t));return t=1-1/255*Math.max(o,Math.max(c,t)),[e,s*100,t*100]};i.rgb.cmyk=function(n){const o=n[0]/255,c=n[1]/255,t=n[2]/255,e=Math.min(1-o,1-c,1-t),s=(1-o-e)/(1-e)||0,r=(1-c-e)/(1-e)||0,l=(1-t-e)/(1-e)||0;return[s*100,r*100,l*100,e*100]};function j(n,o){return(n[0]-o[0])**2+(n[1]-o[1])**2+(n[2]-o[2])**2}i.rgb.keyword=function(n){const o=p[n];if(o)return o;let c=1/0,t;for(const e of Object.keys(g)){const s=g[e],r=j(n,s);r<c&&(c=r,t=e)}return t};i.keyword.rgb=function(n){return g[n]};i.rgb.xyz=function(n){let o=n[0]/255,c=n[1]/255,t=n[2]/255;o=o>.04045?((o+.055)/1.055)**2.4:o/12.92,c=c>.04045?((c+.055)/1.055)**2.4:c/12.92,t=t>.04045?((t+.055)/1.055)**2.4:t/12.92;const e=o*.4124+c*.3576+t*.1805,s=o*.2126+c*.7152+t*.0722,r=o*.0193+c*.1192+t*.9505;return[e*100,s*100,r*100]};i.rgb.lab=function(n){const o=i.rgb.xyz(n);let c=o[0],t=o[1],e=o[2];c/=95.047,t/=100,e/=108.883,c=c>.008856?c**(1/3):7.787*c+16/116,t=t>.008856?t**(1/3):7.787*t+16/116,e=e>.008856?e**(1/3):7.787*e+16/116;const s=116*t-16,r=500*(c-t),l=200*(t-e);return[s,r,l]};i.hsl.rgb=function(n){const o=n[0]/360,c=n[1]/100,t=n[2]/100;let e,s,r;if(c===0)return r=t*255,[r,r,r];t<.5?e=t*(1+c):e=t+c-t*c;const l=2*t-e,a=[0,0,0];for(let u=0;u<3;u++)s=o+1/3*-(u-1),s<0&&s++,s>1&&s--,6*s<1?r=l+(e-l)*6*s:2*s<1?r=e:3*s<2?r=l+(e-l)*(2/3-s)*6:r=l,a[u]=r*255;return a};i.hsl.hsv=function(n){const o=n[0];let c=n[1]/100,t=n[2]/100,e=c;const s=Math.max(t,.01);t*=2,c*=t<=1?t:2-t,e*=s<=1?s:2-s;const r=(t+c)/2,l=t===0?2*e/(s+e):2*c/(t+c);return[o,l*100,r*100]};i.hsv.rgb=function(n){const o=n[0]/60,c=n[1]/100;let t=n[2]/100;const e=Math.floor(o)%6,s=o-Math.floor(o),r=255*t*(1-c),l=255*t*(1-c*s),a=255*t*(1-c*(1-s));switch(t*=255,e){case 0:return[t,a,r];case 1:return[l,t,r];case 2:return[r,t,a];case 3:return[r,l,t];case 4:return[a,r,t];case 5:return[t,r,l]}};i.hsv.hsl=function(n){const o=n[0],c=n[1]/100,t=n[2]/100,e=Math.max(t,.01);let s,r;r=(2-c)*t;const l=(2-c)*e;return s=c*e,s/=l<=1?l:2-l,s=s||0,r/=2,[o,s*100,r*100]};i.hwb.rgb=function(n){const o=n[0]/360;let c=n[1]/100,t=n[2]/100;const e=c+t;let s;e>1&&(c/=e,t/=e);const r=Math.floor(6*o),l=1-t;s=6*o-r,r&1&&(s=1-s);const a=c+s*(l-c);let u,f,h;switch(r){default:case 6:case 0:u=l,f=a,h=c;break;case 1:u=a,f=l,h=c;break;case 2:u=c,f=l,h=a;break;case 3:u=c,f=a,h=l;break;case 4:u=a,f=c,h=l;break;case 5:u=l,f=c,h=a;break}return[u*255,f*255,h*255]};i.cmyk.rgb=function(n){const o=n[0]/100,c=n[1]/100,t=n[2]/100,e=n[3]/100,s=1-Math.min(1,o*(1-e)+e),r=1-Math.min(1,c*(1-e)+e),l=1-Math.min(1,t*(1-e)+e);return[s*255,r*255,l*255]};i.xyz.rgb=function(n){const o=n[0]/100,c=n[1]/100,t=n[2]/100;let e,s,r;return e=o*3.2406+c*-1.5372+t*-.4986,s=o*-.9689+c*1.8758+t*.0415,r=o*.0557+c*-.204+t*1.057,e=e>.0031308?1.055*e**(1/2.4)-.055:e*12.92,s=s>.0031308?1.055*s**(1/2.4)-.055:s*12.92,r=r>.0031308?1.055*r**(1/2.4)-.055:r*12.92,e=Math.min(Math.max(0,e),1),s=Math.min(Math.max(0,s),1),r=Math.min(Math.max(0,r),1),[e*255,s*255,r*255]};i.xyz.lab=function(n){let o=n[0],c=n[1],t=n[2];o/=95.047,c/=100,t/=108.883,o=o>.008856?o**(1/3):7.787*o+16/116,c=c>.008856?c**(1/3):7.787*c+16/116,t=t>.008856?t**(1/3):7.787*t+16/116;const e=116*c-16,s=500*(o-c),r=200*(c-t);return[e,s,r]};i.lab.xyz=function(n){const o=n[0],c=n[1],t=n[2];let e,s,r;s=(o+16)/116,e=c/500+s,r=s-t/200;const l=s**3,a=e**3,u=r**3;return s=l>.008856?l:(s-16/116)/7.787,e=a>.008856?a:(e-16/116)/7.787,r=u>.008856?u:(r-16/116)/7.787,e*=95.047,s*=100,r*=108.883,[e,s,r]};i.lab.lch=function(n){const o=n[0],c=n[1],t=n[2];let e;e=Math.atan2(t,c)*360/2/Math.PI,e<0&&(e+=360);const r=Math.sqrt(c*c+t*t);return[o,r,e]};i.lch.lab=function(n){const o=n[0],c=n[1],e=n[2]/360*2*Math.PI,s=c*Math.cos(e),r=c*Math.sin(e);return[o,s,r]};i.rgb.ansi16=function(n,o=null){const[c,t,e]=n;let s=o===null?i.rgb.hsv(n)[2]:o;if(s=Math.round(s/50),s===0)return 30;let r=30+(Math.round(e/255)<<2|Math.round(t/255)<<1|Math.round(c/255));return s===2&&(r+=60),r};i.hsv.ansi16=function(n){return i.rgb.ansi16(i.hsv.rgb(n),n[2])};i.rgb.ansi256=function(n){const o=n[0],c=n[1],t=n[2];return o===c&&c===t?o<8?16:o>248?231:Math.round((o-8)/247*24)+232:16+36*Math.round(o/255*5)+6*Math.round(c/255*5)+Math.round(t/255*5)};i.ansi16.rgb=function(n){let o=n%10;if(o===0||o===7)return n>50&&(o+=3.5),o=o/10.5*255,[o,o,o];const c=(~~(n>50)+1)*.5,t=(o&1)*c*255,e=(o>>1&1)*c*255,s=(o>>2&1)*c*255;return[t,e,s]};i.ansi256.rgb=function(n){if(n>=232){const s=(n-232)*10+8;return[s,s,s]}n-=16;let o;const c=Math.floor(n/36)/5*255,t=Math.floor((o=n%36)/6)/5*255,e=o%6/5*255;return[c,t,e]};i.rgb.hex=function(n){const c=(((Math.round(n[0])&255)<<16)+((Math.round(n[1])&255)<<8)+(Math.round(n[2])&255)).toString(16).toUpperCase();return"000000".substring(c.length)+c};i.hex.rgb=function(n){const o=n.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!o)return[0,0,0];let c=o[0];o[0].length===3&&(c=c.split("").map(l=>l+l).join(""));const t=parseInt(c,16),e=t>>16&255,s=t>>8&255,r=t&255;return[e,s,r]};i.rgb.hcg=function(n){const o=n[0]/255,c=n[1]/255,t=n[2]/255,e=Math.max(Math.max(o,c),t),s=Math.min(Math.min(o,c),t),r=e-s;let l,a;return r<1?l=s/(1-r):l=0,r<=0?a=0:e===o?a=(c-t)/r%6:e===c?a=2+(t-o)/r:a=4+(o-c)/r,a/=6,a%=1,[a*360,r*100,l*100]};i.hsl.hcg=function(n){const o=n[1]/100,c=n[2]/100,t=c<.5?2*o*c:2*o*(1-c);let e=0;return t<1&&(e=(c-.5*t)/(1-t)),[n[0],t*100,e*100]};i.hsv.hcg=function(n){const o=n[1]/100,c=n[2]/100,t=o*c;let e=0;return t<1&&(e=(c-t)/(1-t)),[n[0],t*100,e*100]};i.hcg.rgb=function(n){const o=n[0]/360,c=n[1]/100,t=n[2]/100;if(c===0)return[t*255,t*255,t*255];const e=[0,0,0],s=o%1*6,r=s%1,l=1-r;let a=0;switch(Math.floor(s)){case 0:e[0]=1,e[1]=r,e[2]=0;break;case 1:e[0]=l,e[1]=1,e[2]=0;break;case 2:e[0]=0,e[1]=1,e[2]=r;break;case 3:e[0]=0,e[1]=l,e[2]=1;break;case 4:e[0]=r,e[1]=0,e[2]=1;break;default:e[0]=1,e[1]=0,e[2]=l}return a=(1-c)*t,[(c*e[0]+a)*255,(c*e[1]+a)*255,(c*e[2]+a)*255]};i.hcg.hsv=function(n){const o=n[1]/100,c=n[2]/100,t=o+c*(1-o);let e=0;return t>0&&(e=o/t),[n[0],e*100,t*100]};i.hcg.hsl=function(n){const o=n[1]/100,t=n[2]/100*(1-o)+.5*o;let e=0;return t>0&&t<.5?e=o/(2*t):t>=.5&&t<1&&(e=o/(2*(1-t))),[n[0],e*100,t*100]};i.hcg.hwb=function(n){const o=n[1]/100,c=n[2]/100,t=o+c*(1-o);return[n[0],(t-o)*100,(1-t)*100]};i.hwb.hcg=function(n){const o=n[1]/100,t=1-n[2]/100,e=t-o;let s=0;return e<1&&(s=(t-e)/(1-e)),[n[0],e*100,s*100]};i.apple.rgb=function(n){return[n[0]/65535*255,n[1]/65535*255,n[2]/65535*255]};i.rgb.apple=function(n){return[n[0]/255*65535,n[1]/255*65535,n[2]/255*65535]};i.gray.rgb=function(n){return[n[0]/100*255,n[0]/100*255,n[0]/100*255]};i.gray.hsl=function(n){return[0,0,n[0]]};i.gray.hsv=i.gray.hsl;i.gray.hwb=function(n){return[0,100,n[0]]};i.gray.cmyk=function(n){return[0,0,0,n[0]]};i.gray.lab=function(n){return[n[0],0,0]};i.gray.hex=function(n){const o=Math.round(n[0]/100*255)&255,t=((o<<16)+(o<<8)+o).toString(16).toUpperCase();return"000000".substring(t.length)+t};i.rgb.gray=function(n){return[(n[0]+n[1]+n[2])/3/255*100]};const d=m;function O(){const n={},o=Object.keys(d);for(let c=o.length,t=0;t<c;t++)n[o[t]]={distance:-1,parent:null};return n}function F(n){const o=O(),c=[n];for(o[n].distance=0;c.length;){const t=c.pop(),e=Object.keys(d[t]);for(let s=e.length,r=0;r<s;r++){const l=e[r],a=o[l];a.distance===-1&&(a.distance=o[t].distance+1,a.parent=t,c.unshift(l))}}return o}function P(n,o){return function(c){return o(n(c))}}function z(n,o){const c=[o[n].parent,n];let t=d[o[n].parent][n],e=o[n].parent;for(;o[e].parent;)c.unshift(o[e].parent),t=P(d[o[e].parent][e],t),e=o[e].parent;return t.conversion=c,t}var _=function(n){const o=F(n),c={},t=Object.keys(o);for(let e=t.length,s=0;s<e;s++){const r=t[s];o[r].parent!==null&&(c[r]=z(r,o))}return c};const y=m,C=_,b={},E=Object.keys(y);function S(n){const o=function(...c){const t=c[0];return t==null?t:(t.length>1&&(c=t),n(c))};return"conversion"in n&&(o.conversion=n.conversion),o}function D(n){const o=function(...c){const t=c[0];if(t==null)return t;t.length>1&&(c=t);const e=n(c);if(typeof e=="object")for(let s=e.length,r=0;r<s;r++)e[r]=Math.round(e[r]);return e};return"conversion"in n&&(o.conversion=n.conversion),o}E.forEach(n=>{b[n]={},Object.defineProperty(b[n],"channels",{value:y[n].channels}),Object.defineProperty(b[n],"labels",{value:y[n].labels});const o=C(n);Object.keys(o).forEach(t=>{const e=o[t];b[n][t]=D(e),b[n][t].raw=S(e)})});var v=b;const $=k(v),K=x({__proto__:null,default:$},[v]);export{A as a,K as b,q as c,k as g};
