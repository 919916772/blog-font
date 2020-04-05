// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.config.productionTip = false
Vue.use(ElementUI, {size: 'medium', zIndex: 3000});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

//打字机效果
Vue.prototype.showText = function showText(text,element,property,time){
  var i=0;
  var loop;
  if(property==0||property=="innerHTML") loop=setInterval(function(){if(i>=text.length||!element||element.innerHTML==undefined)clearInterval(loop);element.innerHTML+=text.charAt(i++);},time?time:100);
  else if(property==1||property=="innerText") loop=setInterval(function(){if(i>=text.length||!element||element.innerText==undefined)clearInterval(loop);element.innerText+=text.charAt(i++);},time?time:100);
  else if(property==2||property=="title") loop=setInterval(function(){if(i>=text.length||!element||element.title==undefined)clearInterval(loop);element.title+=text.charAt(i++);},time?time:100);
  else if(property==3||property=="value") loop=setInterval(function(){if(i>=text.length||!element||element.value==undefined)clearInterval(loop);element.value+=text.charAt(i++);},time?time:100);
}


new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
