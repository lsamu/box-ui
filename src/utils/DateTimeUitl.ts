
/**
 * 时间操作封装
 */
export default class DateTimeUtil {

    /**
     *
     * @param fmt
     */
    public static GetNow(fmt: string = "yyyy-MM-dd HH:mm:ss"): string {
        let d = new Date();
        return this.ConvertDate(d, fmt)
    }

    /**
     * 转换时间
     * @param d
     */
    public static ConvertDate(d: Date, fmt: string = "yyyy-MM-dd HH:mm:ss"): string {
        //let fmt: string = "yyyy-MM-dd HH:mm:ss";
        let o:any = {
            "M+": d.getMonth() + 1, //月份 
            "d+": d.getDate(), //日 
            "H+": d.getHours(), //小时 
            "m+": d.getMinutes(), //分 
            "s+": d.getSeconds(), //秒 
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度 
            "S": d.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}