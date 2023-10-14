/// <reference types="vite/client" />

interface ImportMeta {
  VITE_username: string;
  VITE_age: number;
}
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
