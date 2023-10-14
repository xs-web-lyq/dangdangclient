export class LmgUitl {
  static imgList: Record<string, string> = {};
  static loadAllLmg() {
    // 获取到本地图片
    // 必须是一次性加载eager:true才可以转换为绝对路径
    const imgMap: any = import.meta.glob("../assets/img/**/*.png", { eager: true });
    console.log("imgMap", imgMap);
    let absolutePath: string = ""; //把相对路径转为绝对路径
    let imgName: string = ""; //图片名
    for (let relativePath in imgMap) {
      absolutePath = imgMap[relativePath].default;
      console.log(absolutePath);
      if (absolutePath) {
        imgName = absolutePath.substring(absolutePath.lastIndexOf("/") + 1);
        this.imgList[imgName] = absolutePath;
      }
    }
    console.log("this.imgList", this.imgList);
  }
}
