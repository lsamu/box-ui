

export class MockUtil{

    public static getStaticPage(page:any,data:[]){
        let len = data.length;
        let startIndex = (page.pageIndex - 1) * page.pageSize;
        let list = [];
        if (startIndex + page.pageSize > len) {
          list = data.slice(startIndex);
        } else {
          list = data.slice(startIndex, page.pageSize);
        }
        return {
          data: list,
          totalCount: len,
        };
    }
}