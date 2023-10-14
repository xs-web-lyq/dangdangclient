import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { LmgUitl } from "./utils/imgUtil";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
// console.log("环境变量：", import.meta.env.VITE_username);
// console.log('环境变量：',import.meta.env.VITE_age)
// console.log("环境变量：", import.meta.env.VITE_age);
LmgUitl.loadAllLmg();
createApp(App).use(ElementPlus, { size: "small" }).mount("#app");
