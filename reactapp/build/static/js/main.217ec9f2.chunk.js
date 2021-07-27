(this.webpackJsonpreactapp=this.webpackJsonpreactapp||[]).push([[0],{148:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(10),c=a.n(i),r=a(36),l=a(37),o=a(41),d=a(40),b=a(105),p=a(12),h=a(25),u=a.n(h),g=a(85),x=a(42),j=a(22),f=a(5),m=a(4),O=a(106),v=a(107),y=a(86),k=a.n(y),C=a(92),w=a.n(C),S=a(93),L=a.n(S),P=a(43),N=a.n(P),D=a(91),T=a.n(D),I=a(66),B=a(193),R=a(195),A=a(194),M=a(192),F=a(2),E=["className","message","onClose","variant"],Y={success:k.a,warning:T.a,error:w.a,info:L.a},H=Object(M.a)((function(e){return{success:{backgroundColor:I.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.main},warning:{backgroundColor:B.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}}));function z(e){var t=H(),a=e.className,n=e.message,s=e.onClose,i=e.variant,c=Object(v.a)(e,E),r=Y[i];return Object(F.jsx)(A.a,Object(O.a)({className:Object(m.a)(t[i],a),"aria-describedby":"client-snackbar",message:Object(F.jsxs)("span",{id:"client-snackbar",className:t.message,children:[Object(F.jsx)(r,{className:Object(m.a)(t.icon,t.iconVariant)}),n]}),action:[Object(F.jsx)(R.a,{"aria-label":"close",color:"inherit",onClick:s,children:Object(F.jsx)(N.a,{className:t.icon})},"close")]},c))}var V=a(72),W=a(44),G=a.n(W),J="192.168.50.210",U=a(151),q=a(157),K=a(156),Q=a(201),X=a(154),Z=Object(M.a)((function(e){return{formControl:{marginLeft:e.spacing(1),marginRight:e.spacing(2),minWidth:400},selectEmpty:{marginTop:e.spacing(2)}}}));function $(e){var t=Z(),a=J,i=s.a.useState([]),c=Object(V.a)(i,2),r=c[0],l=c[1],o=s.a.useState(""),d=Object(V.a)(o,2),b=d[0],p=d[1],h=function(e){G.a.get("http://"+a+":5000/changeSongListPage/"+String(e)).catch((function(e){console.log(e)}))};return Object(n.useEffect)((function(){return G.a.get("http://"+a+":5000/getSongListPage").then((function(e){var t=e.data;l(t)})).catch((function(e){console.log(e)}))}),[]),Object(F.jsx)("div",{children:Object(F.jsxs)(U.a,{className:t.formControl,children:[Object(F.jsx)(q.a,{id:"demo-simple-select-helper-label",children:"Select playlists to listen"}),Object(F.jsx)(K.a,{labelId:"demo-simple-select-helper-label",id:"demo-simple-select-helper",value:b,onChange:function(e){p(e.target.value),h(e.target.value)},children:r.map((function(e){return Object(F.jsx)(Q.a,{value:e.index,children:e.listPage},e.index)}))}),Object(F.jsx)(X.a,{children:e.name})]})})}var _=a(56),ee=a.n(_),te=a(196),ae=a(150),ne=Object(f.a)({root:{height:5,backgroundColor:"#68fa6a"},bar:{backgroundColor:"#227c23"}})(te.a),se=Object(f.a)({root:{height:5,backgroundColor:"#fda548"},bar:{backgroundColor:"#e48119"}})(te.a),ie=Object(f.a)({root:{height:5,backgroundColor:"#fc5151"},bar:{backgroundColor:"#c22a2a"}})(te.a),ce=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).pingIP=Object(x.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/checkYoutubeDLList");case 3:t=e.sent,"no songList"===(a=t.json())?(console.log("no songList!!!!!!"),n.setState({songList:[]})):n.setState({songList:a}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),n.setState({songList:[]}),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])}))),n.state={songList:[],playNowIndex:0,isStopState:!1,nowProgress:0,isReplayDisable:!0,isPauseDisable:!1,isStopDisable:!1,playerIP:J},n.deleteSong=n.deleteSong.bind(Object(j.a)(n)),n.handlePlayer=n.handlePlayer.bind(Object(j.a)(n)),n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval((function(){return e.pingIP()}),2e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"deleteSong",value:function(e){G.a.get("http://"+this.state.playerIP+":5000/deleteYoutubeDLList/"+String(e))}},{key:"handlePlayer",value:function(e){G.a.get("http://"+this.state.playerIP+":5000/nextSongIndex/"+String(e)),G.a.get("http://"+this.state.playerIP+":5000/playsongList/"+String(e)),this.setState({isReplayDisable:!0,isPauseDisable:!1})}},{key:"render",value:function(){var e=this,t=this.props.classes,a=Object(m.a)(t.paper,t.fixedHeight),n=Object(m.a)(t.paperIsPlaying,t.fixedHeight),s=Object(m.a)(t.paperIsPauseing,t.fixedHeight),i=Object(m.a)(t.paperIsStoping,t.fixedHeight);return Object(F.jsx)("div",{children:this.state.songList.map((function(c){return Object(F.jsxs)("div",{children:[c.index!==e.state.playNowIndex?Object(F.jsx)(ae.a,{className:a,children:Object(F.jsxs)("div",{className:t.rowColumn,children:[Object(F.jsxs)("h2",{className:t.textMargin,children:[c.index," : ",c.songName]},c.index),Object(F.jsx)(R.a,{"aria-label":"close",onClick:e.handlePlayer.bind(e,c.index),children:Object(F.jsx)(ee.a,{})}),Object(F.jsx)(R.a,{"aria-label":"close",className:t.textRight,onClick:e.deleteSong.bind(e,c.index),children:Object(F.jsx)(N.a,{})})]})}):2===e.state.isStopState?Object(F.jsxs)(ae.a,{className:i,children:[Object(F.jsxs)("div",{className:t.rowColumn,children:[Object(F.jsxs)("h2",{className:t.textMargin,children:[c.index," : ",c.songName]},c.index),Object(F.jsx)(R.a,{"aria-label":"close",onClick:e.handlePlayer.bind(e,c.index),children:Object(F.jsx)(ee.a,{})}),Object(F.jsx)(R.a,{"aria-label":"close",className:t.textRight,onClick:e.deleteSong.bind(e,c.index),children:Object(F.jsx)(N.a,{})})]}),Object(F.jsx)(ie,{variant:"determinate",color:"secondary",value:e.state.nowProgress})]}):1===e.state.isStopState?Object(F.jsxs)(ae.a,{className:s,children:[Object(F.jsxs)("div",{className:t.rowColumn,children:[Object(F.jsxs)("h2",{className:t.textMargin,children:[c.index," : ",c.songName]},c.index),Object(F.jsx)(R.a,{"aria-label":"close",onClick:e.handlePlayer.bind(e,c.index),children:Object(F.jsx)(ee.a,{})}),Object(F.jsx)(R.a,{"aria-label":"close",className:t.textRight,onClick:e.deleteSong.bind(e,c.index),children:Object(F.jsx)(N.a,{})})]}),Object(F.jsx)(se,{variant:"determinate",color:"secondary",value:e.state.nowProgress})]}):0===e.state.isStopState?Object(F.jsxs)(ae.a,{className:n,children:[Object(F.jsxs)("div",{className:t.rowColumn,children:[Object(F.jsxs)("h2",{className:t.textMargin,children:[c.index," : ",c.songName]},c.index),Object(F.jsx)(R.a,{"aria-label":"close",onClick:e.handlePlayer.bind(e,c.index),children:Object(F.jsx)(ee.a,{})}),Object(F.jsx)(R.a,{"aria-label":"close",className:t.textRight,onClick:e.deleteSong.bind(e,c.index),children:Object(F.jsx)(N.a,{})})]}),Object(F.jsx)(ne,{variant:"determinate",color:"secondary",value:e.state.nowProgress})]}):void 0,Object(F.jsx)("br",{})]},c.index)}))})}}]),a}(n.Component),re=Object(f.a)((function(e){return{root:{flexGrow:1,marginBottom:e.spacing(4)},textMargin:{fontFamily:"Helvetica Narrow, sans-serif",margin:e.spacing(2)},paper:{display:"flex",overflow:"auto",flexDirection:"column"},paperIsPlaying:{display:"flex",overflow:"auto",flexDirection:"column",backgroundColor:"#68fa6a"},paperIsPauseing:{display:"flex",overflow:"auto",flexDirection:"column",backgroundColor:"#fda548"},paperIsStoping:{display:"flex",overflow:"auto",flexDirection:"column",backgroundColor:"#fc5151"},fixedHeight:{paddingTop:e.spacing(2),paddingBottom:e.spacing(2),padding:e.spacing(2),margin:"0 auto",maxWidth:"1280px",width:"90%"},rowColumn:{display:"flex",flexDirection:"row"},textRight:{marginLeft:"auto",padding:e.spacing(2.5)},deleteIcon:{marginLeft:"auto"}}}))(ce),le=a(103),oe=a.n(le),de=a(69),be=a.n(de),pe=a(104),he=a.n(pe),ue=a(95),ge=a.n(ue),xe=a(96),je=a.n(xe),fe=a(97),me=a.n(fe),Oe=a(98),ve=a.n(Oe),ye=a(100),ke=a.n(ye),Ce=a(99),we=a.n(Ce),Se=a(101),Le=a.n(Se),Pe=a(102),Ne=a.n(Pe),De=a(94),Te=a.n(De),Ie=a(197),Be=a(198),Re=a(199),Ae=a(202),Me=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={intervalId:0},n}return Object(l.a)(a,[{key:"scrollStep",value:function(){0===window.pageYOffset&&clearInterval(this.state.intervalId),window.scroll(0,window.pageYOffset-this.props.scrollStepInPx)}},{key:"scrollToTop",value:function(){var e=setInterval(this.scrollStep.bind(this),this.props.delayInMs);this.setState({intervalId:e})}},{key:"render",value:function(){var e=this;return Object(F.jsx)(Ie.a,{"aria-label":"FastForward",style:{position:"fixed",bottom:40,right:40},onClick:function(){e.scrollToTop()},children:Object(F.jsx)(Te.a,{})})}}]),a}(s.a.Component),Fe=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).downloadYoutubeDL=function(){var e=Object(x.a)(u.a.mark((function e(t){var a,n,s,i,c,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a="";try{n=new URL(t),s=n.searchParams,i=Object(g.a)(s.entries());try{for(i.s();!(c=i.n()).done;)"v"===(r=c.value)[0]&&(a=r[1]),"list"===r[0]&&console.log("Cannot Enter List!")}catch(l){i.e(l)}finally{i.f()}}catch(o){console.log(o)}return e.prev=2,e.next=5,fetch("api/downloadYoutubeDL/"+a);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})));return function(t){return e.apply(this,arguments)}}(),n.deleteAllSongs=Object(x.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/deleteAllSong");case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])}))),n.handlePlayer=function(){var e=Object(x.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==t){e.next=10;break}return e.prev=1,e.next=4,fetch("/api/replayYoutubeDLList");case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),console.log(e.t0);case 9:n.setState({isReplayDisable:!0,isPauseDisable:!1});case 10:if(2!==t){e.next=20;break}return e.prev=11,e.next=14,fetch("/api/pauseYoutubeDLList");case 14:e.next=19;break;case 16:e.prev=16,e.t1=e.catch(11),console.log(e.t1);case 19:n.setState({isReplayDisable:!1,isPauseDisable:!0});case 20:if(3!==t){e.next=30;break}return e.prev=21,e.next=24,fetch("/api/stopYoutubeDLList");case 24:e.next=29;break;case 26:e.prev=26,e.t2=e.catch(21),console.log(e.t2);case 29:n.setState({isReplayDisable:!0,isPauseDisable:!0});case 30:if(6!==t){e.next=39;break}return e.prev=31,e.next=34,fetch("/api/changeVolume/0");case 34:e.next=39;break;case 36:e.prev=36,e.t3=e.catch(31),console.log(e.t3);case 39:if(7!==t){e.next=48;break}return e.prev=40,e.next=43,fetch("/api/changeVolume/1");case 43:e.next=48;break;case 45:e.prev=45,e.t4=e.catch(40),console.log(e.t4);case 48:if(8!==t){e.next=57;break}return e.prev=49,e.next=52,fetch("/api/changeVolume/2");case 52:e.next=57;break;case 54:e.prev=54,e.t5=e.catch(49),console.log(e.t5);case 57:if(9!==t){e.next=80;break}if(!0!==n.state.sync){e.next=70;break}return n.setState({sync:!1}),e.prev=60,e.next=63,fetch("/api/stopContinue");case 63:e.next=68;break;case 65:e.prev=65,e.t6=e.catch(60),console.log(e.t6);case 68:e.next=80;break;case 70:if(!1!==n.state.sync){e.next=80;break}return n.setState({sync:!0}),e.prev=72,e.next=75,fetch("/api/startContinue");case 75:e.next=80;break;case 77:e.prev=77,e.t7=e.catch(72),console.log(e.t7);case 80:case"end":return e.stop()}}),e,null,[[1,6],[11,16],[21,26],[31,36],[40,45],[49,54],[60,65],[72,77]])})));return function(t){return e.apply(this,arguments)}}(),n.handlePlayList=Object(x.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/addSongListPage/"+String(n.state.playListText));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0);case 8:n.setState({playListText:"",anchorElAdd:null});case 9:case"end":return e.stop()}}),e,null,[[0,5]])}))),n.state={textfieldText:"",playListText:"",sync:!0,isReplayDisable:!0,isPauseDisable:!1,isStopDisable:!1,playerIP:J,error:!0,snackbarOpen:!1,snackbarContent:"",variant:"error",anchorElAdd:null},n.focusTextInput=n.focusTextInput.bind(Object(j.a)(n)),n.handlePlayer=n.handlePlayer.bind(Object(j.a)(n)),n.deleteAllSongs=n.deleteAllSongs.bind(Object(j.a)(n)),n.handleAddButton=n.handleAddButton.bind(Object(j.a)(n)),n.handleAnchorElAddClose=n.handleAnchorElAddClose.bind(Object(j.a)(n)),n.handleplayListTextChange=n.handleplayListTextChange.bind(Object(j.a)(n)),n.handlePlayList=n.handlePlayList.bind(Object(j.a)(n)),n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"handleTextFieldChange",value:function(e){this.setState({textfieldText:e.target.value})}},{key:"focusTextInput",value:function(e){this.setState({textfieldText:e.target.value}),this.downloadYoutubeDL(this.state.textfieldText),this.setState({textfieldText:""})}},{key:"scrollToTop",value:function(){console.log("scroll?"),window.scroll(100,100)}},{key:"snackClose",value:function(){this.setState({snackbarOpen:!1})}},{key:"handleAddButton",value:function(e){this.setState({anchorElAdd:e.currentTarget})}},{key:"handleAnchorElAddClose",value:function(){this.setState({anchorElAdd:null})}},{key:"handleplayListTextChange",value:function(e){this.setState({playListText:e.target.value})}},{key:"render",value:function(){var e=this,t=this.props.classes,a=Object(m.a)(t.paper,t.fixedHeight);return Object(F.jsxs)("div",{className:t.pageColor,children:[Object(F.jsx)("br",{}),Object(F.jsxs)(ae.a,{className:a,children:[Object(F.jsx)("h2",{className:t.textMargin,children:"Youtube Player v2.0"}),Object(F.jsxs)("div",{children:[Object(F.jsxs)("div",{className:t.TimeText,children:[Object(F.jsxs)("div",{className:t.TimeText,children:[Object(F.jsx)(Ie.a,{"aria-label":"start",disabled:this.state.isReplayDisable,className:t.startButton,onClick:this.handlePlayer.bind(this,0),children:Object(F.jsx)(ge.a,{})}),Object(F.jsx)(Ie.a,{"aria-label":"pause",disabled:this.state.isPauseDisable,className:t.pauseButton,onClick:this.handlePlayer.bind(this,2),children:Object(F.jsx)(je.a,{})}),Object(F.jsx)(Ie.a,{"aria-label":"refresh",disabled:this.state.isStopDisable,className:t.stopButton,onClick:this.handlePlayer.bind(this,3),children:Object(F.jsx)(me.a,{})})]}),Object(F.jsxs)("div",{className:t.playerMargin,children:[Object(F.jsx)(Ie.a,{"aria-label":"FastRewind",className:t.startButton,onClick:this.handlePlayer.bind(this,6),children:Object(F.jsx)(ve.a,{})}),Object(F.jsx)(Ie.a,{"aria-label":"FastForward",className:t.pauseButton,onClick:this.handlePlayer.bind(this,7),children:Object(F.jsx)(we.a,{})}),Object(F.jsx)(Ie.a,{"aria-label":"FastForward",className:t.stopButton,onClick:this.handlePlayer.bind(this,8),children:Object(F.jsx)(ke.a,{})})]}),Object(F.jsx)("div",{className:t.playerMargin,children:Object(F.jsx)(Ie.a,{"aria-label":"FastRewind",className:t.otherButton,onClick:this.handlePlayer.bind(this,9),children:this.state.sync?Object(F.jsx)(Le.a,{}):Object(F.jsx)(Ne.a,{})})})]}),Object(F.jsxs)("div",{className:t.textFieldDivMargin,children:[Object(F.jsx)(Be.a,{id:"songList",label:"Enter youtube website",className:t.textField,margin:"normal",value:this.state.textfieldText,onChange:function(t){return e.handleTextFieldChange(t)}}),Object(F.jsx)(Ie.a,{color:"primary",className:t.deleteIcon,"aria-label":"send",onClick:function(t){return e.focusTextInput(t)},children:Object(F.jsx)(be.a,{})})]}),Object(F.jsxs)("div",{className:t.playListDivMargin,children:[Object(F.jsx)($,{}),Object(F.jsx)(Ie.a,{"aria-describedby":"addPlayList",color:"primary",className:t.deleteIcon,"aria-label":"send",onClick:this.handleAddButton,children:Object(F.jsx)(oe.a,{})}),Object(F.jsx)(Ie.a,{"aria-label":"delete",className:t.deleteIcon,onClick:this.deleteAllSongs,children:Object(F.jsx)(he.a,{})}),Object(F.jsx)(Re.a,{id:"addPlayList",open:Boolean(this.state.anchorElAdd),anchorEl:this.state.anchorElAdd,onClose:this.handleAnchorElAddClose.bind(),anchorOrigin:{vertical:"center",horizontal:"right"},transformOrigin:{vertical:"center",horizontal:"left"},children:Object(F.jsxs)("div",{className:t.TimeText,children:[Object(F.jsx)(Be.a,{id:"add",label:"Type new playlist name",className:t.playListTextField,margin:"normal",value:this.state.playListText,onChange:function(t){return e.handleplayListTextChange(t)}}),Object(F.jsx)(Ie.a,{color:"primary","aria-label":"sendplaylist",className:t.popoverButton,onClick:this.handlePlayList,children:Object(F.jsx)(be.a,{})})]})})]})]})]}),Object(F.jsx)("br",{}),Object(F.jsx)(re,{}),Object(F.jsx)(Me,{scrollStepInPx:"120",delayInMs:"16.66"}),Object(F.jsx)(Ae.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:this.state.snackbarOpen,autoHideDuration:1e3,onClose:this.snackClose.bind(this),ContentProps:{"aria-describedby":"message-id"},children:Object(F.jsx)(z,{onClose:this.snackClose.bind(this),variant:this.state.variant,message:Object(F.jsx)("span",{id:"message-id",children:this.state.snackbarContent})})})]})}}]),a}(n.Component),Ee=Object(f.a)((function(e){return{root:{flexGrow:1,marginBottom:e.spacing(4)},buttonMargin:{margin:e.spacing(1)},textMargin:{fontFamily:"Helvetica Narrow, sans-serif",margin:e.spacing(2)},paper:{display:"flex",overflow:"auto",flexDirection:"column"},paperIsPlaying:{display:"flex",overflow:"auto",flexDirection:"column",backgroundColor:"#68fa6a"},paperIsPauseing:{display:"flex",overflow:"auto",flexDirection:"column",backgroundColor:"#fda548"},paperIsStoping:{display:"flex",overflow:"auto",flexDirection:"column",backgroundColor:"#fc5151"},fixedHeight:{paddingTop:e.spacing(2),paddingBottom:e.spacing(2),padding:e.spacing(2),margin:"0 auto",maxWidth:"1280px",width:"90%"},tabText:{fontSize:"20px",padding:e.spacing(2)},TimeText:{display:"flex",flexDirection:"row"},paperColumn:{padding:e.spacing(2)},textField:{marginLeft:e.spacing(2),marginRight:e.spacing(2),marginBottom:e.spacing(2),fontSize:"20px",width:400},textFieldMargin:{marginBottom:e.spacing(2)},textRight:{marginLeft:"auto",padding:e.spacing(2.5)},deleteIcon:{marginLeft:e.spacing(1),marginRight:e.spacing(1)},startButton:{marginLeft:e.spacing(1),marginRight:e.spacing(1),color:"#fff",backgroundColor:"#339933","&:hover":{backgroundColor:"#267326"}},pauseButton:{marginLeft:e.spacing(1),marginRight:e.spacing(1),color:"#fff",backgroundColor:"#ff944d","&:hover":{backgroundColor:"#e65c00"}},stopButton:{marginLeft:e.spacing(1),marginRight:e.spacing(1),color:"#fff",backgroundColor:"#ff3333","&:hover":{backgroundColor:"#e60000"}},otherButton:{color:"#fff",backgroundColor:"#2273B3","&:hover":{backgroundColor:"#114570"},marginLeft:e.spacing(1),marginRight:e.spacing(1)},upButton:{position:"fixed",bottom:40,right:40},playerMargin:{marginLeft:e.spacing(5),display:"flex",flexDirection:"row"},textFieldDivMargin:{marginTop:e.spacing(5),display:"flex",flexDirection:"row"},playListDivMargin:{marginLeft:e.spacing(1),display:"flex",flexDirection:"row"},pageColor:{backgroundColor:"#ccffff"},playListTextField:{marginLeft:e.spacing(2),marginRight:e.spacing(2),marginBottom:e.spacing(2),width:300},popoverButton:{marginTop:e.spacing(2),marginBottom:e.spacing(2),marginRight:e.spacing(2)}}}))(Fe),Ye=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return Object(F.jsxs)(b.a,{children:[Object(F.jsx)(p.b,{exact:!0,path:"/",render:function(){return Object(F.jsx)(p.a,{to:"/player"})}}),Object(F.jsx)(p.b,{exact:!0,path:"/player",render:function(){return Object(F.jsx)(Ee,{})}})]})}}]),a}(n.Component);c.a.render(Object(F.jsx)(Ye,{}),document.getElementById("root"))}},[[148,1,2]]]);
//# sourceMappingURL=main.217ec9f2.chunk.js.map