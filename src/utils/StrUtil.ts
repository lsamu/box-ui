/**
 * 字符串操作封装
 */
export class StrUtil {
    /**
  * 拼接表单参数
  * @param formData json对象
  */
    public static JsonObjectToStr(formData:any) {
        let arr_result: Array<string> = [];
        for (const value in formData) {
            arr_result.push(value + "=" + formData[value]);
        }
        return arr_result.join("&");
    }

}