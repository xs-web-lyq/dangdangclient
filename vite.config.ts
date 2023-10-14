import { CommonServerOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig({
//   base:'/dang',
//   plugins: [vue()],
// })
import dotenv,{DotenvParseOutput} from 'dotenv'
import fs from 'fs'
export default defineConfig((mode)=>{
  const envFileName:string = '.env'
  const curEnvFileName = `${envFileName}.${mode.mode}`
  console.log("当前在什么环境远行项目：",curEnvFileName)
  // 创建服务请求对象 与底层配置类型保持一致  CommonServerOptions
  let server:CommonServerOptions = {}
  // fs进行读取io操作，将开发环境文件中参数读取出来进入缓存
  const envData = fs.readFileSync(curEnvFileName)
  // 通过使用dotenv将读入的数据构建为键值对形式
  const envMap:DotenvParseOutput = dotenv.parse(envData)
  console.log('envMap',envMap)
  if(mode.mode == "development"){
    server = {
      host:envMap.VITE_HOST,
      port:Number(envMap.VITE_PORT),
      proxy:{
        [envMap.VITE_BASE_URL]:{
          target:envMap.VITE_PROXY_DOMAIN
        }
      }
    }
    console.log("我是开发者环境",server)
  }else if (mode.mode == "production"){
    server = {
      host:envMap.VITE_HOST,
      port:Number(envMap.VITE_PORT)
    }
    console.log("我是生产者环境")
  }
  return {
    plugins:[vue()],
    server
  }
})