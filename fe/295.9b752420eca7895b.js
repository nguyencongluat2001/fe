"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[295],{6295:(_,a,g)=>{g.r(a),g.d(a,{LoginModule:()=>m});var s=g(8499),l=g(6444),C=g(177),r=g(8498),t=g(9417),M=g(6677),n=g(4438),P=g(5416),d=g(9631);const O=[{path:"",component:(()=>{class e{constructor(i,o,c,p){this.HttpService=i,this.router=o,this.snackBar=c,this.route=p,this.loginForm=new t.gE({username:new t.MJ(""),password:new t.MJ("")}),this.returnUrl="",this.eye_show="visibility",this.typePass="password"}ngOnInit(){this.returnUrl=this.route.snapshot.queryParams.returnUrl||"/",this.createForm()}showHidePass(){"password"==this.typePass?(this.typePass="text",this.eye_show="visibility_off"):(this.typePass="password",this.eye_show="visibility")}createForm(){this.loginForm=new t.gE({username:new t.MJ("",t.k0.required),password:new t.MJ("",t.k0.required)})}login(){if(!this.loginForm.invalid){let i={username:this.loginForm.value.username,password:this.loginForm.value.password};console.log(i),this.HttpService.getMethods("login",i).subscribe(o=>{1==o.status&&(localStorage.setItem("username",o.loginModel.username),this.router.navigate(["/system/index"])),1!=o.status&&M.w.notify("Th\xf4ng tin cung c\u1ea5p ch\u01b0a ch\xednh x\xe1c","error")})}}static#n=this.\u0275fac=function(o){return new(o||e)(n.rXU(s.k),n.rXU(r.Ix),n.rXU(P.UG),n.rXU(r.nX))};static#t=this.\u0275cmp=n.VBU({type:e,selectors:[["app-login"]],decls:31,vars:2,consts:[["id","app-loading"],["name","frmLogin",3,"formGroup"],[2,"background","#ffffff2b","height","100%"],[1,"clear",2,"height","100px"],["id","loginShowHide"],[1,"log"],[1,"clear",2,"height","40px"],[1,"content1"],[2,"color","#FFFF00","padding-bottom","5px"],[2,"color","#ffff","font-weight","700"],["src","assets/img/logo.png","alt","admin@bootstrapmaster.com",1,"img-avatar",2,"width","35%"],[2,"padding-top","38px","font-size","18px"],[2,"margin","20px"],[2,"border","1px solid #fff","width","90%","margin","auto","border-radius","4px","height","30px"],[2,"width","10%","float","left","height","27px","background","rgba(0, 0, 0, 0.21)","padding-top","3px"],["src","assets/img/login/person.png"],[2,"width","90%","float","right","height","27px","padding-top","3px"],["type","text","formControlName","username","matInput","","placeholder","M\xe3 b\u1ec7nh nh\xe2n",1,"form-control"],[1,"clear",2,"margin-top","20px"],["src","assets/img/login/lock.png"],["formControlName","password","matInput","","placeholder","M\u1eadt kh\u1ea9u",1,"form-control"],[1,"clear"],[2,"margin-left","40%","margin-right","40%","padding-bottom","20px"],["type","button","name","btn_save","id","btn_save","value","TRA C\u1ee8U",1,"sign-in",2,"background","#ffc800","margin","auto","color","#a60000","font-family","serif",3,"click"]],template:function(o,c){1&o&&(n.nrm(0,"div",0),n.j41(1,"form",1)(2,"div",2),n.nrm(3,"div",3),n.j41(4,"div",4)(5,"div",5),n.nrm(6,"div",6),n.j41(7,"div",7)(8,"h2",8),n.EFF(9,"PH\xd2NG KH\xc1M \u0110A KHOA MEDITEC"),n.k0s(),n.j41(10,"h1",9),n.EFF(11,"KHOA CHU\u1ea8N \u0110O\xc1N H\xccNH \u1ea2NH"),n.k0s(),n.nrm(12,"img",10),n.j41(13,"h2",11),n.EFF(14,"C\u1ed4NG TR\u1ea2 K\u1ebeT QU\u1ea2 CHU\u1ea8N \u0110O\xc1N H\xccNH \u1ea2NH"),n.k0s(),n.j41(15,"div",12)(16,"div",13)(17,"div",14),n.nrm(18,"img",15),n.k0s(),n.j41(19,"div",16),n.nrm(20,"input",17),n.k0s()(),n.nrm(21,"div",18),n.j41(22,"div",13)(23,"div",14),n.nrm(24,"img",19),n.k0s(),n.j41(25,"div",16),n.nrm(26,"input",20),n.k0s()(),n.nrm(27,"div",21),n.k0s(),n.j41(28,"div",22)(29,"input",23),n.bIt("click",function(){return c.login()}),n.k0s(),n.nrm(30,"div",21),n.k0s()()()()()()),2&o&&(n.R7$(),n.Y8G("formGroup",c.loginForm),n.R7$(25),n.BMQ("type",c.typePass))},dependencies:[t.qT,t.me,t.BC,t.cb,t.j4,t.JD,d.fg],styles:['.spanfooter[_ngcontent-%COMP%]{font-size:12px;color:#fff}.spannhat[_ngcontent-%COMP%]{font-size:12px;color:#e0e0e0}form[name=frmLogin][_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]::-webkit-input-placeholder{color:#fff;font-size:12px}form[name=frmLogin][_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]::-webkit-input-placeholder{color:#fff;font-size:12px}form[name=frmLogin][_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:#fff}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%], div[_ngcontent-%COMP%], span[_ngcontent-%COMP%], applet[_ngcontent-%COMP%], object[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], p[_ngcontent-%COMP%], blockquote[_ngcontent-%COMP%], pre[_ngcontent-%COMP%], a[_ngcontent-%COMP%], abbr[_ngcontent-%COMP%], acronym[_ngcontent-%COMP%], address[_ngcontent-%COMP%], big[_ngcontent-%COMP%], cite[_ngcontent-%COMP%], code[_ngcontent-%COMP%], del[_ngcontent-%COMP%], dfn[_ngcontent-%COMP%], em[_ngcontent-%COMP%], img[_ngcontent-%COMP%], ins[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], q[_ngcontent-%COMP%], s[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], small[_ngcontent-%COMP%], strike[_ngcontent-%COMP%], strong[_ngcontent-%COMP%], sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%], tt[_ngcontent-%COMP%], var[_ngcontent-%COMP%], b[_ngcontent-%COMP%], u[_ngcontent-%COMP%], i[_ngcontent-%COMP%], dl[_ngcontent-%COMP%], dt[_ngcontent-%COMP%], dd[_ngcontent-%COMP%], ol[_ngcontent-%COMP%], nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], fieldset[_ngcontent-%COMP%], form[_ngcontent-%COMP%], label[_ngcontent-%COMP%], legend[_ngcontent-%COMP%], table[_ngcontent-%COMP%], caption[_ngcontent-%COMP%], tbody[_ngcontent-%COMP%], tfoot[_ngcontent-%COMP%], thead[_ngcontent-%COMP%], tr[_ngcontent-%COMP%], th[_ngcontent-%COMP%], td[_ngcontent-%COMP%], article[_ngcontent-%COMP%], aside[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], details[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], figure[_ngcontent-%COMP%], figcaption[_ngcontent-%COMP%], footer[_ngcontent-%COMP%], header[_ngcontent-%COMP%], hgroup[_ngcontent-%COMP%], menu[_ngcontent-%COMP%], nav[_ngcontent-%COMP%], output[_ngcontent-%COMP%], ruby[_ngcontent-%COMP%], section[_ngcontent-%COMP%], summary[_ngcontent-%COMP%], time[_ngcontent-%COMP%], mark[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{margin:0}article[_ngcontent-%COMP%], aside[_ngcontent-%COMP%], details[_ngcontent-%COMP%], figcaption[_ngcontent-%COMP%], figure[_ngcontent-%COMP%], footer[_ngcontent-%COMP%], header[_ngcontent-%COMP%], hgroup[_ngcontent-%COMP%], menu[_ngcontent-%COMP%], nav[_ngcontent-%COMP%], section[_ngcontent-%COMP%]{display:block}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0}blockquote[_ngcontent-%COMP%], q[_ngcontent-%COMP%]{quotes:none}blockquote[_ngcontent-%COMP%]:before, blockquote[_ngcontent-%COMP%]:after, q[_ngcontent-%COMP%]:before, q[_ngcontent-%COMP%]:after{content:"";content:none}table[_ngcontent-%COMP%]{border-collapse:collapse;border-spacing:0}a[_ngcontent-%COMP%]{text-decoration:none}.txt-rt[_ngcontent-%COMP%]{text-align:right}.txt-lt[_ngcontent-%COMP%]{text-align:left}.txt-center[_ngcontent-%COMP%]{text-align:center}.float-rt[_ngcontent-%COMP%]{float:right}.float-lt[_ngcontent-%COMP%]{float:left}.pos-relative[_ngcontent-%COMP%]{position:relative}.pos-absolute[_ngcontent-%COMP%]{position:absolute}.vertical-base[_ngcontent-%COMP%]{vertical-align:baseline}.vertical-top[_ngcontent-%COMP%]{vertical-align:top}nav.vertical[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:block}nav.horizontal[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline-block}img[_ngcontent-%COMP%]{max-width:100%;max-height:100%}form[name=frmLogin][_ngcontent-%COMP%]{height:100vh;background:url(/assets/img/login/background.jpg) no-repeat;background-position:center;background-size:100% auto;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;object-fit:cover;font-family:Muli,sans-serif}.clear[_ngcontent-%COMP%]{clear:both}h1[_ngcontent-%COMP%]{text-align:center;font-size:32px;font-weight:700;color:#b53310;text-transform:uppercase}h2[_ngcontent-%COMP%]{font-weight:700;text-align:center;font-size:24px;color:#b53310;padding-top:30px;text-transform:uppercase}.log[_ngcontent-%COMP%]   .content1[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:24px;color:#fff;font-weight:300;font-family:Nunito,sans-serif;text-align:center}.log[_ngcontent-%COMP%]{width:75%;margin:0 auto}.content1[_ngcontent-%COMP%]{width:43%;text-align:center;background-color:#0a111cc4;margin:auto;border-radius:10px!important;border-radius:0}.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%], .content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{margin-top:-4px;height:29px;width:100%;border:1px solid rgba(0,0,0,0);color:#fff;text-align:left;outline:none;font-size:12px;font-family:Muli,sans-serif;border-radius:4px}.button-row[_ngcontent-%COMP%]{width:100%;margin-top:5%;padding-left:27%;padding-bottom:40px}.sign-in[_ngcontent-%COMP%]{padding-top:10px;padding-bottom:8px;background-color:#4c9a39;border:none;border-radius:4px;cursor:pointer;color:#fff;font-size:20px;float:left}.sign-in[_ngcontent-%COMP%]:hover{background-color:#376d29;color:#fff}.footer[_ngcontent-%COMP%]{padding:10px 0;text-align:center}.footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff;font-size:17px;font-family:Muli,sans-serif;font-weight:300;line-height:25px}.footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:active{color:#fff;text-decoration:none;transition:all .5s ease-in-out}.footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#c0392b;transition:all .5s ease-in-out}@media (max-width: 1920px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 500px 10px}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 500px 10px}.sign-in[_ngcontent-%COMP%]{margin-left:78px}form[name=frmLogin][_ngcontent-%COMP%]{min-height:631px}}@media (max-width: 1680px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 438px 10px}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 438px 10px}.sign-in[_ngcontent-%COMP%]{margin-left:65px}form[name=frmLogin][_ngcontent-%COMP%]{min-height:631px}}@media (max-width: 1600px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 418px 10px}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 418px 10px}.sign-in[_ngcontent-%COMP%]{margin-left:61px}form[name=frmLogin][_ngcontent-%COMP%]{min-height:631px}}@media (max-width: 1440px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 380px 10px}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 380px 10px}.sign-in[_ngcontent-%COMP%]{margin-left:52px}form[name=frmLogin][_ngcontent-%COMP%]{min-height:631px}}@media (max-width: 1366px){.sign-in[_ngcontent-%COMP%]{margin-left:19%;font-size:16px}form[name=frmLogin][_ngcontent-%COMP%]{min-height:631px}}@media (max-width: 1280px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 338px 10px}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 338px 10px}.sign-in[_ngcontent-%COMP%]{margin-left:7%;font-size:16px}}@media (max-width: 1080px){.sign-in[_ngcontent-%COMP%]{margin-left:-2%;font-size:15px}h1[_ngcontent-%COMP%]{font-size:32px}.log[_ngcontent-%COMP%]   .content1[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:35px}}@media (max-width: 1050px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 280px 10px}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 280px 10px}}@media (max-width: 1024px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 370px 10px}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 370px 10px}.sign-in[_ngcontent-%COMP%]{margin-left:-9%}.button-row[_ngcontent-%COMP%]{padding-left:27%}.log[_ngcontent-%COMP%]   .content1[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:30px;padding:15px 0}}@media (max-width: 991px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 260px 10px}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 260px 10px}}@media (max-width: 900px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 240px 10px}.content1[_ngcontent-%COMP%]{width:50%}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 240px 10px}.button-row[_ngcontent-%COMP%]{padding-left:27%}.sign-in[_ngcontent-%COMP%]{margin-left:-9%;font-size:14px}}@media (max-width: 840px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 245px 10px;font-size:16px;background-size:7% 50%}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 245px 10px;font-size:16px;background-size:7% 50%}h1[_ngcontent-%COMP%]{color:#b53310;font-size:24px}.log[_ngcontent-%COMP%]   .content1[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:27px}.sign-in[_ngcontent-%COMP%]{margin-left:19%;font-size:11px}}@media (max-width: 667px){.content1[_ngcontent-%COMP%]{width:70%}.sign-in[_ngcontent-%COMP%]{margin-left:15%}form[name=frmLogin][_ngcontent-%COMP%]{height:631px}}@media (max-width: 640px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 322px 10px;background-size:7% 50%}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 322px 10px;background-size:7% 50%}.content1[_ngcontent-%COMP%]{width:70%}.sign-in[_ngcontent-%COMP%]{margin-left:0%}}@media (max-width: 600px){.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 304px 10px;background-size:7% 50%}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 304px 10px;background-size:7% 50%}.sign-in[_ngcontent-%COMP%]{margin-left:15%}h1[_ngcontent-%COMP%]{color:#b53310;font-size:24px}}@media (max-width: 568px){h1[_ngcontent-%COMP%]{color:#b53310;padding:25px 0}.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 287px 10px;background-size:7% 50%}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 287px 10px;background-size:7% 50%}.sign-in[_ngcontent-%COMP%]{margin-left:15px}}@media (max-width: 480px){.content1[_ngcontent-%COMP%]{width:88%}.content1[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background:url(/assets/img/login/person.png) no-repeat 280px 10px;background-size:7% 50%}.content1[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{background:url(/assets/img/login/lock.png) no-repeat 280px 10px;background-size:7% 50%}.sign-in[_ngcontent-%COMP%]{margin-left:19%;width:72px;font-size:9px}.reset[_ngcontent-%COMP%]{margin-right:32px}.log[_ngcontent-%COMP%]{margin:0 auto}.footer[_ngcontent-%COMP%]{padding:50px 20px}h1[_ngcontent-%COMP%]{color:#b53310;font-size:16px;padding-top:13px}h2[_ngcontent-%COMP%]{color:#b53310;font-size:14px;padding-top:13px}.log[_ngcontent-%COMP%]   .content1[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:20px;padding-top:10%}}']})}return e})()}];let u=(()=>{class e{static#n=this.\u0275fac=function(o){return new(o||e)};static#t=this.\u0275mod=n.$C({type:e});static#e=this.\u0275inj=n.G2t({imports:[r.iI.forChild(O),r.iI]})}return e})(),m=(()=>{class e{static#n=this.\u0275fac=function(o){return new(o||e)};static#t=this.\u0275mod=n.$C({type:e});static#e=this.\u0275inj=n.G2t({providers:[s.k],imports:[C.MD,t.YN,t.X1,u,l.G]})}return e})()}}]);