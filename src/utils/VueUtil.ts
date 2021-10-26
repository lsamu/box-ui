import Vue from "vue";


export class VueUtil {

    //动态添加需要的版式
  public static async RegisterComponent(templateName: string) {
    let component = await import(`@/${templateName}.vue`);
    const constructor = Vue.extend(component.default);
    return constructor as any;
  }

  public static async RegisterComponent2(templateName: string){
    let component =await import(`@/${templateName}.vue`);
    return component.default;
  }

  //加载js 获取vue打包后的js
  public Loadjs (url, fn, fail) {
    var script = document.createElement('script')
    script.src = url
    script.async = true
    script.onload = fn
    script.onerror = fail
    ;(document.body || document.head).appendChild(script)
  }
}