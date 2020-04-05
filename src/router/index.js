import Vue from 'vue'
import Router from 'vue-router'
import login from "../views/login";
import homePage from "../views/homePage";
import moodEssay from "../views/moodEssay";
import messageBoard from "../views/messageBoard";
import pigeonholeManagement from "../views/pigeonholeManagement";

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {path: '/', name: 'homePage', component: homePage, meta: {title: '无心|心做し',keepAlive:true},},
    {path: '/login', name: 'login', component:login,meta:{title: '无心|心做し',keepAlive:true}},
    {path: '/moodEssay', name: 'moodEssay', component:moodEssay,meta:{title: '无心|心做し',keepAlive:true}},
    {path: '/messageBoard', name: 'messageBoard', component:messageBoard,meta:{title: '无心|心做し',keepAlive:true}},
    {path: '/pigeonholeManagement', name: 'pigeonholeManagement', component: pigeonholeManagement,meta:{title: '无心|心做し',keepAlive:true}},
  ],
})
