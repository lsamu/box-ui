export class ClassUtil {

    /**
     * 返回分类前缀
     * @param title 
     * @param len 
     */
    public static GetTag(title: string, len: number): string {
        let level = (len / 4 - 1) * 2;
        let str = len == 4 ? "" : "├";
        for (let i = 0; i < level; i++) {
            str = str + "－";
        }
        return str + title;
    }
}