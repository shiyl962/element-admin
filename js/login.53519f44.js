(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"71c7":function(e,r,s){},a55b:function(e,r,s){"use strict";s.r(r);var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"container"},[s("el-form",{ref:"form",staticClass:"form",attrs:{model:e.form,rules:e.rules}},[s("h1",{staticClass:"title"},[e._v("Login Form")]),s("el-form-item",{attrs:{prop:"username"}},[s("el-input",{attrs:{placeholder:"请输入用户名",clearable:"","prefix-icon":"el-icon-user-solid"},model:{value:e.form.username,callback:function(r){e.$set(e.form,"username",r)},expression:"form.username"}})],1),s("el-form-item",{attrs:{prop:"password"}},[s("el-input",{attrs:{placeholder:"请输入密码",clearable:"","show-password":"","prefix-icon":"el-icon-lock"},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1),s("el-form-item",[s("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("登 陆")])],1)],1)],1)},o=[],a={data(){return{form:{username:"admin",password:"password"},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"change"}]}}},mounted(){window.addEventListener("keypress",this.onEnter)},methods:{onSubmit(){this.$refs.form.validate(e=>{e?"admin"===this.form.username&&"password"===this.form.password?(this.$store.commit("setMenuList",[]),this.$store.commit("updateLock",null),this.$router.push("/")):this.$message.error("用户名或密码错误"):this.$message.error("请输入用户名或密码！")})},onEnter(e){"Enter"===e.key&&this.onSubmit()}},beforeDestroy(){window.removeEventListener("keypress",this.onEnter)}},i=a,n=(s("f3e9"),s("2877")),l=Object(n["a"])(i,t,o,!1,null,"93ab7c78",null);r["default"]=l.exports},f3e9:function(e,r,s){"use strict";var t=s("71c7"),o=s.n(t);o.a}}]);
//# sourceMappingURL=login.53519f44.js.map