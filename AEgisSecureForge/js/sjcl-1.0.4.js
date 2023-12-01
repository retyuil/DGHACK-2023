
"use strict";function q(a){throw a;}var s=void 0,u=!1;var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
"undefined"!==typeof module&&module.exports&&(module.exports=sjcl);"function"===typeof define&&define([],function(){return sjcl});
sjcl.cipher.aes=function(a){this.l[0][0][0]||this.G();var b,c,d,e,g=this.l[0][4],f=this.l[1];b=a.length;var h=1;4!==b&&(6!==b&&8!==b)&&q(new sjcl.exception.invalid("invalid aes key size"));this.b=[d=a.slice(0),e=[]];for(a=b;a<4*b+28;a++){c=d[a-1];if(0===a%b||8===b&&4===a%b)c=g[c>>>24]<<24^g[c>>16&255]<<16^g[c>>8&255]<<8^g[c&255],0===a%b&&(c=c<<8^c>>>24^h<<24,h=h<<1^283*(h>>7));d[a]=d[a-b]^c}for(b=0;a;b++,a--)c=d[b&3?a:a-4],e[b]=4>=a||4>b?c:f[0][g[c>>>24]]^f[1][g[c>>16&255]]^f[2][g[c>>8&255]]^f[3][g[c&
255]]};
sjcl.cipher.aes.prototype={encrypt:function(a){return w(this,a,0)},decrypt:function(a){return w(this,a,1)},l:[[[],[],[],[],[]],[[],[],[],[],[]]],G:function(){var a=this.l[0],b=this.l[1],c=a[4],d=b[4],e,g,f,h=[],l=[],k,m,n,p;for(e=0;0x100>e;e++)l[(h[e]=e<<1^283*(e>>7))^e]=e;for(g=f=0;!c[g];g^=k||1,f=l[f]||1){n=f^f<<1^f<<2^f<<3^f<<4;n=n>>8^n&255^99;c[g]=n;d[n]=g;m=h[e=h[k=h[g]]];p=0x1010101*m^0x10001*e^0x101*k^0x1010100*g;m=0x101*h[n]^0x1010100*n;for(e=0;4>e;e++)a[e][g]=m=m<<24^m>>>8,b[e][n]=p=p<<24^p>>>8}for(e=
0;5>e;e++)a[e]=a[e].slice(0),b[e]=b[e].slice(0)}};
function w(a,b,c){4!==b.length&&q(new sjcl.exception.invalid("invalid aes block size"));var d=a.b[c],e=b[0]^d[0],g=b[c?3:1]^d[1],f=b[2]^d[2];b=b[c?1:3]^d[3];var h,l,k,m=d.length/4-2,n,p=4,t=[0,0,0,0];h=a.l[c];a=h[0];var r=h[1],v=h[2],y=h[3],z=h[4];for(n=0;n<m;n++)h=a[e>>>24]^r[g>>16&255]^v[f>>8&255]^y[b&255]^d[p],l=a[g>>>24]^r[f>>16&255]^v[b>>8&255]^y[e&255]^d[p+1],k=a[f>>>24]^r[b>>16&255]^v[e>>8&255]^y[g&255]^d[p+2],b=a[b>>>24]^r[e>>16&255]^v[g>>8&255]^y[f&255]^d[p+3],p+=4,e=h,g=l,f=k;for(n=0;4>
n;n++)t[c?3&-n:n]=z[e>>>24]<<24^z[g>>16&255]<<16^z[f>>8&255]<<8^z[b&255]^d[p++],h=e,e=g,g=f,f=b,b=h;return t}
sjcl.bitArray={bitSlice:function(a,b,c){a=sjcl.bitArray.R(a.slice(b/32),32-(b&31)).slice(1);return c===s?a:sjcl.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return((b+c-1^b)&-32?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return 32===d?a.concat(b):sjcl.bitArray.R(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===
b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var c=a.length;b&=31;0<c&&b&&(a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1));return a},partial:function(a,b,c){return 32===a?b:(c?b|0:b<<32-a)+0x10000000000*a},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return u;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return 0===
c},R:function(a,b,c,d){var e;e=0;for(d===s&&(d=[]);32<=b;b-=32)d.push(c),c=0;if(0===b)return d.concat(a);for(e=0;e<a.length;e++)d.push(c|a[e]>>>b),c=a[e]<<32-b;e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);d.push(sjcl.bitArray.partial(b+a&31,32<b+a?c:d.pop(),1));return d},g:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]},byteswapM:function(a){var b,c;for(b=0;b<a.length;++b)c=a[b],a[b]=c>>>24|c>>>8&0xff00|(c&0xff00)<<8|c<<24;return a}};
sjcl.codec.utf8String={fromBits:function(a){var b="",c=sjcl.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++)0===(d&3)&&(e=a[d/4]),b+=String.fromCharCode(e>>>24),e<<=8;return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],c,d=0;for(c=0;c<a.length;c++)d=d<<8|a.charCodeAt(c),3===(c&3)&&(b.push(d),d=0);c&3&&b.push(sjcl.bitArray.partial(8*(c&3),d));return b}};
sjcl.codec.hex={fromBits:function(a){var b="",c;for(c=0;c<a.length;c++)b+=((a[c]|0)+0xf00000000000).toString(16).substr(4);return b.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,c=[],d;a=a.replace(/\s|0x/g,"");d=a.length;a+="00000000";for(b=0;b<a.length;b+=8)c.push(parseInt(a.substr(b,8),16)^0);return sjcl.bitArray.clamp(c,4*d)}};
sjcl.codec.base32={p:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",O:"0123456789ABCDEFGHIJKLMNOPQRSTUV",BITS:32,BASE:5,REMAINING:27,fromBits:function(a,b,c){var d=sjcl.codec.base32.BASE,e=sjcl.codec.base32.REMAINING,g="",f=0,h=sjcl.codec.base32.p,l=0,k=sjcl.bitArray.bitLength(a);c&&(h=sjcl.codec.base32.O);for(c=0;g.length*d<k;)g+=h.charAt((l^a[c]>>>f)>>>e),f<d?(l=a[c]<<d-f,f+=e,c++):(l<<=d,f-=d);for(;g.length&7&&!b;)g+="=";return g},toBits:function(a,b){a=a.replace(/\s|=/g,"").toUpperCase();var c=sjcl.codec.base32.BITS,
d=sjcl.codec.base32.BASE,e=sjcl.codec.base32.REMAINING,g=[],f,h=0,l=sjcl.codec.base32.p,k=0,m,n="base32";b&&(l=sjcl.codec.base32.O,n="base32hex");for(f=0;f<a.length;f++){m=l.indexOf(a.charAt(f));if(0>m){if(!b)try{return sjcl.codec.base32hex.toBits(a)}catch(p){}q(new sjcl.exception.invalid("this isn't "+n+"!"))}h>e?(h-=e,g.push(k^m>>>h),k=m<<c-h):(h+=d,k^=m<<c-h)}h&56&&g.push(sjcl.bitArray.partial(h&56,k,1));return g}};
sjcl.codec.base32hex={fromBits:function(a,b){return sjcl.codec.base32.fromBits(a,b,1)},toBits:function(a){return sjcl.codec.base32.toBits(a,1)}};
sjcl.codec.base64={p:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b,c){var d="",e=0,g=sjcl.codec.base64.p,f=0,h=sjcl.bitArray.bitLength(a);c&&(g=g.substr(0,62)+"-_");for(c=0;6*d.length<h;)d+=g.charAt((f^a[c]>>>e)>>>26),6>e?(f=a[c]<<6-e,e+=26,c++):(f<<=6,e-=6);for(;d.length&3&&!b;)d+="=";return d},toBits:function(a,b){a=a.replace(/\s|=/g,"");var c=[],d,e=0,g=sjcl.codec.base64.p,f=0,h;b&&(g=g.substr(0,62)+"-_");for(d=0;d<a.length;d++)h=g.indexOf(a.charAt(d)),
0>h&&q(new sjcl.exception.invalid("this isn't base64!")),26<e?(e-=26,c.push(f^h>>>e),f=h<<32-e):(e+=6,f^=h<<32-e);e&56&&c.push(sjcl.bitArray.partial(e&56,f,1));return c}};sjcl.codec.base64url={fromBits:function(a){return sjcl.codec.base64.fromBits(a,1,1)},toBits:function(a){return sjcl.codec.base64.toBits(a,1)}};sjcl.hash.sha256=function(a){this.b[0]||this.G();a?(this.s=a.s.slice(0),this.o=a.o.slice(0),this.i=a.i):this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.s=this.P.slice(0);this.o=[];this.i=0;return this},update:function(a){"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,c=this.o=sjcl.bitArray.concat(this.o,a);b=this.i;a=this.i=b+sjcl.bitArray.bitLength(a);for(b=512+b&-512;b<=a;b+=512)x(this,c.splice(0,16));return this},finalize:function(){var a,b=this.o,c=this.s,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.i/
4294967296));for(b.push(this.i|0);b.length;)x(this,b.splice(0,16));this.reset();return c},P:[],b:[],G:function(){function a(a){return 0x100000000*(a-Math.floor(a))|0}var b=0,c=2,d;a:for(;64>b;c++){for(d=2;d*d<=c;d++)if(0===c%d)continue a;8>b&&(this.P[b]=a(Math.pow(c,0.5)));this.b[b]=a(Math.pow(c,1/3));b++}}};
function x(a,b){var c,d,e,g=b.slice(0),f=a.s,h=a.b,l=f[0],k=f[1],m=f[2],n=f[3],p=f[4],t=f[5],r=f[6],v=f[7];for(c=0;64>c;c++)16>c?d=g[c]:(d=g[c+1&15],e=g[c+14&15],d=g[c&15]=(d>>>7^d>>>18^d>>>3^d<<25^d<<14)+(e>>>17^e>>>19^e>>>10^e<<15^e<<13)+g[c&15]+g[c+9&15]|0),d=d+v+(p>>>6^p>>>11^p>>>25^p<<26^p<<21^p<<7)+(r^p&(t^r))+h[c],v=r,r=t,t=p,p=n+d|0,n=m,m=k,k=l,l=d+(k&m^n&(k^m))+(k>>>2^k>>>13^k>>>22^k<<30^k<<19^k<<10)|0;f[0]=f[0]+l|0;f[1]=f[1]+k|0;f[2]=f[2]+m|0;f[3]=f[3]+n|0;f[4]=f[4]+p|0;f[5]=f[5]+t|0;f[6]=
f[6]+r|0;f[7]=f[7]+v|0}
sjcl.mode.ccm={name:"ccm",t:[],listenProgress:function(a){sjcl.mode.ccm.t.push(a)},unListenProgress:function(a){a=sjcl.mode.ccm.t.indexOf(a);-1<a&&sjcl.mode.ccm.t.splice(a,1)},X:function(a){var b=sjcl.mode.ccm.t.slice(),c;for(c=0;c<b.length;c+=1)b[c](a)},encrypt:function(a,b,c,d,e){var g,f=b.slice(0),h=sjcl.bitArray,l=h.bitLength(c)/8,k=h.bitLength(f)/8;e=e||64;d=d||[];7>l&&q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes"));for(g=2;4>g&&k>>>8*g;g++);g<15-l&&(g=15-l);c=h.clamp(c,8*(15-
g));b=sjcl.mode.ccm.M(a,b,c,d,e,g);f=sjcl.mode.ccm.q(a,f,c,b,e,g);return h.concat(f.data,f.tag)},decrypt:function(a,b,c,d,e){e=e||64;d=d||[];var g=sjcl.bitArray,f=g.bitLength(c)/8,h=g.bitLength(b),l=g.clamp(b,h-e),k=g.bitSlice(b,h-e),h=(h-e)/8;7>f&&q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes"));for(b=2;4>b&&h>>>8*b;b++);b<15-f&&(b=15-f);c=g.clamp(c,8*(15-b));l=sjcl.mode.ccm.q(a,l,c,k,e,b);a=sjcl.mode.ccm.M(a,l.data,c,d,e,b);g.equal(l.tag,a)||q(new sjcl.exception.corrupt("ccm: tag doesn't match"));
return l.data},ea:function(a,b,c,d,e,g){var f=[],h=sjcl.bitArray,l=h.g;d=[h.partial(8,(b.length?64:0)|d-2<<2|g-1)];d=h.concat(d,c);d[3]|=e;d=a.encrypt(d);if(b.length){c=h.bitLength(b)/8;65279>=c?f=[h.partial(16,c)]:0xffffffff>=c&&(f=h.concat([h.partial(16,65534)],[c]));f=h.concat(f,b);for(b=0;b<f.length;b+=4)d=a.encrypt(l(d,f.slice(b,b+4).concat([0,0,0])))}return d},M:function(a,b,c,d,e,g){var f=sjcl.bitArray,h=f.g;e/=8;(e%2||4>e||16<e)&&q(new sjcl.exception.invalid("ccm: invalid tag length"));(0xffffffff<
d.length||0xffffffff<b.length)&&q(new sjcl.exception.bug("ccm: can't deal with 4GiB or more data"));c=sjcl.mode.ccm.ea(a,d,c,e,f.bitLength(b)/8,g);for(d=0;d<b.length;d+=4)c=a.encrypt(h(c,b.slice(d,d+4).concat([0,0,0])));return f.clamp(c,8*e)},q:function(a,b,c,d,e,g){var f,h=sjcl.bitArray;f=h.g;var l=b.length,k=h.bitLength(b),m=l/50,n=m;c=h.concat([h.partial(8,g-1)],c).concat([0,0,0]).slice(0,4);d=h.bitSlice(f(d,a.encrypt(c)),0,e);if(!l)return{tag:d,data:[]};for(f=0;f<l;f+=4)f>m&&(sjcl.mode.ccm.X(f/
l),m+=n),c[3]++,e=a.encrypt(c),b[f]^=e[0],b[f+1]^=e[1],b[f+2]^=e[2],b[f+3]^=e[3];return{tag:d,data:h.clamp(b,k)}}};
sjcl.mode.ocb2={name:"ocb2",encrypt:function(a,b,c,d,e,g){128!==sjcl.bitArray.bitLength(c)&&q(new sjcl.exception.invalid("ocb iv must be 128 bits"));var f,h=sjcl.mode.ocb2.J,l=sjcl.bitArray,k=l.g,m=[0,0,0,0];c=h(a.encrypt(c));var n,p=[];d=d||[];e=e||64;for(f=0;f+4<b.length;f+=4)n=b.slice(f,f+4),m=k(m,n),p=p.concat(k(c,a.encrypt(k(c,n)))),c=h(c);n=b.slice(f);b=l.bitLength(n);f=a.encrypt(k(c,[0,0,0,b]));n=l.clamp(k(n.concat([0,0,0]),f),b);m=k(m,k(n.concat([0,0,0]),f));m=a.encrypt(k(m,k(c,h(c))));d.length&&
(m=k(m,g?d:sjcl.mode.ocb2.pmac(a,d)));return p.concat(l.concat(n,l.clamp(m,e)))},decrypt:function(a,b,c,d,e,g){128!==sjcl.bitArray.bitLength(c)&&q(new sjcl.exception.invalid("ocb iv must be 128 bits"));e=e||64;var f=sjcl.mode.ocb2.J,h=sjcl.bitArray,l=h.g,k=[0,0,0,0],m=f(a.encrypt(c)),n,p,t=sjcl.bitArray.bitLength(b)-e,r=[];d=d||[];for(c=0;c+4<t/32;c+=4)n=l(m,a.decrypt(l(m,b.slice(c,c+4)))),k=l(k,n),r=r.concat(n),m=f(m);p=t-32*c;n=a.encrypt(l(m,[0,0,0,p]));n=l(n,h.clamp(b.slice(c),p).concat([0,0,0]));
k=l(k,n);k=a.encrypt(l(k,l(m,f(m))));d.length&&(k=l(k,g?d:sjcl.mode.ocb2.pmac(a,d)));h.equal(h.clamp(k,e),h.bitSlice(b,t))||q(new sjcl.exception.corrupt("ocb: tag doesn't match"));return r.concat(h.clamp(n,p))},pmac:function(a,b){var c,d=sjcl.mode.ocb2.J,e=sjcl.bitArray,g=e.g,f=[0,0,0,0],h=a.encrypt([0,0,0,0]),h=g(h,d(d(h)));for(c=0;c+4<b.length;c+=4)h=d(h),f=g(f,a.encrypt(g(h,b.slice(c,c+4))));c=b.slice(c);128>e.bitLength(c)&&(h=g(h,d(h)),c=e.concat(c,[-2147483648,0,0,0]));f=g(f,c);return a.encrypt(g(d(g(h,
d(h))),f))},J:function(a){return[a[0]<<1^a[1]>>>31,a[1]<<1^a[2]>>>31,a[2]<<1^a[3]>>>31,a[3]<<1^135*(a[0]>>>31)]}};
sjcl.mode.gcm={name:"gcm",encrypt:function(a,b,c,d,e){var g=b.slice(0);b=sjcl.bitArray;d=d||[];a=sjcl.mode.gcm.q(!0,a,g,d,c,e||128);return b.concat(a.data,a.tag)},decrypt:function(a,b,c,d,e){var g=b.slice(0),f=sjcl.bitArray,h=f.bitLength(g);e=e||128;d=d||[];e<=h?(b=f.bitSlice(g,h-e),g=f.bitSlice(g,0,h-e)):(b=g,g=[]);a=sjcl.mode.gcm.q(u,a,g,d,c,e);f.equal(a.tag,b)||q(new sjcl.exception.corrupt("gcm: tag doesn't match"));return a.data},ba:function(a,b){var c,d,e,g,f,h=sjcl.bitArray.g;e=[0,0,0,0];g=
b.slice(0);for(c=0;128>c;c++){(d=0!==(a[Math.floor(c/32)]&1<<31-c%32))&&(e=h(e,g));f=0!==(g[3]&1);for(d=3;0<d;d--)g[d]=g[d]>>>1|(g[d-1]&1)<<31;g[0]>>>=1;f&&(g[0]^=-0x1f000000)}return e},h:function(a,b,c){var d,e=c.length;b=b.slice(0);for(d=0;d<e;d+=4)b[0]^=0xffffffff&c[d],b[1]^=0xffffffff&c[d+1],b[2]^=0xffffffff&c[d+2],b[3]^=0xffffffff&c[d+3],b=sjcl.mode.gcm.ba(b,a);return b},q:function(a,b,c,d,e,g){var f,h,l,k,m,n,p,t,r=sjcl.bitArray;n=c.length;p=r.bitLength(c);t=r.bitLength(d);h=r.bitLength(e);f=
b.encrypt([0,0,0,0]);96===h?(e=e.slice(0),e=r.concat(e,[1])):(e=sjcl.mode.gcm.h(f,[0,0,0,0],e),e=sjcl.mode.gcm.h(f,e,[0,0,Math.floor(h/0x100000000),h&0xffffffff]));h=sjcl.mode.gcm.h(f,[0,0,0,0],d);m=e.slice(0);d=h.slice(0);a||(d=sjcl.mode.gcm.h(f,h,c));for(k=0;k<n;k+=4)m[3]++,l=b.encrypt(m),c[k]^=l[0],c[k+1]^=l[1],c[k+2]^=l[2],c[k+3]^=l[3];c=r.clamp(c,p);a&&(d=sjcl.mode.gcm.h(f,h,c));a=[Math.floor(t/0x100000000),t&0xffffffff,Math.floor(p/0x100000000),p&0xffffffff];d=sjcl.mode.gcm.h(f,d,a);l=b.encrypt(e);
d[0]^=l[0];d[1]^=l[1];d[2]^=l[2];d[3]^=l[3];return{tag:r.bitSlice(d,0,g),data:c}}};sjcl.misc.hmac=function(a,b){this.N=b=b||sjcl.hash.sha256;var c=[[],[]],d,e=b.prototype.blockSize/32;this.n=[new b,new b];a.length>e&&(a=b.hash(a));for(d=0;d<e;d++)c[0][d]=a[d]^909522486,c[1][d]=a[d]^1549556828;this.n[0].update(c[0]);this.n[1].update(c[1]);this.I=new b(this.n[0])};
sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(a){this.S&&q(new sjcl.exception.invalid("encrypt on already updated hmac called!"));this.update(a);return this.digest(a)};sjcl.misc.hmac.prototype.reset=function(){this.I=new this.N(this.n[0]);this.S=u};sjcl.misc.hmac.prototype.update=function(a){this.S=!0;this.I.update(a)};sjcl.misc.hmac.prototype.digest=function(){var a=this.I.finalize(),a=(new this.N(this.n[1])).update(a).finalize();this.reset();return a};
sjcl.misc.pbkdf2=function(a,b,c,d,e){c=c||1E3;(0>d||0>c)&&q(sjcl.exception.invalid("invalid params to pbkdf2"));"string"!function(){var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;
(function(){function R(a){function d(e){var b=e.charCodeAt(0);if(b!==92)return b;var a=e.charAt(1);return(b=r[a])?b:"0"<=a&&a<="7"?parseInt(e.substring(1),8):a==="u"||a==="x"?parseInt(e.substring(2),16):e.charCodeAt(1)}function g(e){if(e<32)return(e<16?"\\x0":"\\x")+e.toString(16);e=String.fromCharCode(e);return e==="\\"||e==="-"||e==="]"||e==="^"?"\\"+e:e}function b(e){var b=e.substring(1,e.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),e=[],a=
b[0]==="^",c=["["];a&&c.push("^");for(var a=a?1:0,f=b.length;a<f;++a){var h=b[a];if(/\\[bdsw]/i.test(h))c.push(h);else{var h=d(h),l;a+2<f&&"-"===b[a+1]?(l=d(b[a+2]),a+=2):l=h;e.push([h,l]);l<65||h>122||(l<65||h>90||e.push([Math.max(65,h)|32,Math.min(l,90)|32]),l<97||h>122||e.push([Math.max(97,h)&-33,Math.min(l,122)&-33]))}}e.sort(function(e,a){return e[0]-a[0]||a[1]-e[1]});b=[];f=[];for(a=0;a<e.length;++a)h=e[a],h[0]<=f[1]+1?f[1]=Math.max(f[1],h[1]):b.push(f=h);for(a=0;a<b.length;++a)h=b[a],c.push(g(h[0])),
h[1]>h[0]&&(h[1]+1>h[0]&&c.push("-"),c.push(g(h[1])));c.push("]");return c.join("")}function s(e){for(var a=e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),c=a.length,d=[],f=0,h=0;f<c;++f){var l=a[f];l==="("?++h:"\\"===l.charAt(0)&&(l=+l.substring(1))&&(l<=h?d[l]=-1:a[f]=g(l))}for(f=1;f<d.length;++f)-1===d[f]&&(d[f]=++x);for(h=f=0;f<c;++f)l=a[f],l==="("?(++h,d[h]||(a[f]="(?:")):"\\"===l.charAt(0)&&(l=+l.substring(1))&&l<=h&&
(a[f]="\\"+d[l]);for(f=0;f<c;++f)"^"===a[f]&&"^"!==a[f+1]&&(a[f]="");if(e.ignoreCase&&m)for(f=0;f<c;++f)l=a[f],e=l.charAt(0),l.length>=2&&e==="["?a[f]=b(l):e!=="\\"&&(a[f]=l.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return a.join("")}for(var x=0,m=!1,j=!1,k=0,c=a.length;k<c;++k){var i=a[k];if(i.ignoreCase)j=!0;else if(/[a-z]/i.test(i.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){m=!0;j=!1;break}}for(var r={b:8,t:9,n:10,v:11,
f:12,r:13},n=[],k=0,c=a.length;k<c;++k){i=a[k];if(i.global||i.multiline)throw Error(""+i);n.push("(?:"+s(i)+")")}return RegExp(n.join("|"),j?"gi":"g")}function S(a,d){function g(a){var c=a.nodeType;if(c==1){if(!b.test(a.className)){for(c=a.firstChild;c;c=c.nextSibling)g(c);c=a.nodeName.toLowerCase();if("br"===c||"li"===c)s[j]="\n",m[j<<1]=x++,m[j++<<1|1]=a}}else if(c==3||c==4)c=a.nodeValue,c.length&&(c=d?c.replace(/\r\n?/g,"\n"):c.replace(/[\t\n\r ]+/g," "),s[j]=c,m[j<<1]=x,x+=c.length,m[j++<<1|1]=
a)}var b=/(?:^|\s)nocode(?:\s|$)/

/*
 * $Id: rawdeflate.js,v 0.5 2013/04/09 14:25:38 dankogai Exp dankogai $
 *
 * GNU General Public License, version 2 (GPL-2.0)
 *   https://opensource.org/licenses/GPL-2.0
 * Original:
 *  http://www.onicos.com/staff/iz/amuse/javascript/expert/deflate.txt
 */

(function(ctx){

/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0.1
 * LastModified: Dec 25 1999
 */

/* Interface:
 * data = zip_deflate(src);
 */

/* constant parameters */
var zip_WSIZE = 32768;		// Sliding Window size
var zip_STORED_BLOCK = 0;
var zip_STATIC_TREES = 1;
var zip_DYN_TREES    = 2;

/* for deflate */
var zip_DEFAULT_LEVEL = 6;
var zip_FULL_SEARCH = true;
var zip_INBUFSIZ = 32768;	// Input buffer size
var zip_INBUF_EXTRA = 64;	// Extra buffer
var zip_OUTBUFSIZ = 1024 * 8;
var zip_window_size = 2 * zip_WSIZE;
var zip_MIN_MATCH = 3;
var zip_MAX_MATCH = 258;
var zip_BITS = 16;
// for SMALL_MEM
var zip_LIT_BUFSIZE = 0x2000;
var zip_HASH_BITS = 13;
// for MEDIUM_MEM
// var zip_LIT_BUFSIZE = 0x4000;
// var zip_HASH_BITS = 14;
// for BIG_MEM
// var zip_LIT_BUFSIZE = 0x8000;
// var zip_HASH_BITS = 15;
if(zip_LIT_BUFSIZE > zip_INBUFSIZ)
    alert("error: zip_INBUFSIZ is too small");
if((zip_WSIZE<<1) > (1<<zip_BITS))
    alert("error: zip_WSIZE is too large");
if(zip_HASH_BITS > zip_BITS-1)
    alert("error: zip_HASH_BITS is too large");
if(zip_HASH_BITS < 8 || zip_MAX_MATCH != 258)
    alert("error: Code too clever");
var zip_DIST_BUFSIZE = zip_LIT_BUFSIZE;
var zip_HASH_SIZE = 1 << zip_HASH_BITS;
var zip_HASH_MASK = zip_HASH_SIZE - 1;
var zip_WMASK = zip_WSIZE - 1;
var zip_NIL = 0; // Tail of hash chains
var zip_TOO_FAR = 4096;
var zip_MIN_LOOKAHEAD = zip_MAX_MATCH + zip_MIN_MATCH + 1;
var zip_MAX_DIST = zip_WSIZE - zip_MIN_LOOKAHEAD;
var zip_SMALLEST = 1;
var zip_MAX_BITS = 15;
var zip_MAX_BL_BITS = 7;
var zip_LENGTH_CODES = 29;
var zip_LITERALS =256;
var zip_END_BLOCK = 256;
var zip_L_CODES = zip_LITERALS + 1 + zip_LENGTH_CODES;
var zip_D_CODES = 30;
var zip_BL_CODES = 19;
var zip_REP_3_6 = 16;
var zip_REPZ_3_10 = 17;
var zip_REPZ_11_138 = 18;
var zip_HEAP_SIZE = 2 * zip_L_CODES + 1;
var zip_H_SHIFT = parseInt((zip_HASH_BITS + zip_MIN_MATCH - 1) /
			   zip_MIN_MATCH);

/* variables */
var zip_free_queue;
var zip_qhead, zip_qtail;
var zip_initflag;
var zip_outbuf = null;
var zip_outcnt, zip_outoff;
var zip_complete;
var zip_window;
var zip_d_buf;
var zip_l_buf;
var zip_prev;
var zip_bi_buf;
var zip_bi_valid;
var zip_block_start;
var zip_ins_h;
var zip_hash_head;
var zip_prev_match;
var zip_match_available;
var zip_match_length;
var zip_prev_length;
var zip_strstart;
var zip_match_star
/*!
 * Bootstrap v3.3.5 (https://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.5",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.5",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetT