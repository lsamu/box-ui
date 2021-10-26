
/**
 * 日志类库
 */
export class Logger {

    public static DEBUG = process.env.NODE_ENV !== "production";

    /**
     * 调试信息
     * @param message 
     * @param optionalParams 
     */
    public static debug(message?: any, ...optionalParams: any[]) {
        if (this.DEBUG) {
            console.debug(message, ...optionalParams);
        }
    }

    /**
     * 信息
     * @param message 
     * @param optionalParams 
     */
    public static info(message?: any, ...optionalParams: any[]) {
        if (this.DEBUG) {
            console.info(message, ...optionalParams);
        }
    }

    /**
     * 日志
     * @param message 
     * @param optionalParams 
     */
    public static log(message?: any, ...optionalParams: any[]) {
        if (this.DEBUG) {
            console.log(message, ...optionalParams);
        }
    }

    /**
     * 警告信息
     * @param message 
     * @param optionalParams 
     */
    public static warn(message?: any, ...optionalParams: any[]) {
        if (this.DEBUG) {
            console.warn(message, ...optionalParams);
        }
    }
}