export class DataUtil {
  /**
   * 构造树型结构数据   this.handleTree(response.data, "deptId");
   * @param {*} data 数据源
   * @param {*} id id字段 默认 'id'
   * @param {*} parentId 父节点字段 默认 'parentId'
   * @param {*} children 孩子节点字段 默认 'children'
   */
  public static handleTree(
    data:any,
    id = "id",
    parentId = "parentId",
    children = "children"
  ) {
    let config = {
      id: id || "id",
      parentId: parentId || "parentId",
      childrenList: children || "children",
    };

    var childrenListMap:any = {};
    var nodeIds:any = {};
    var tree:any = [];

    for (let d of data) {
      let parentId = d[config.parentId];
      if (childrenListMap[parentId] == null) {
        childrenListMap[parentId] = [];
      }
      nodeIds[d[config.id]] = d;
      childrenListMap[parentId].push(d);
    }

    for (let d of data) {
      let parentId = d[config.parentId];
      if (nodeIds[parentId] == null) {
        tree.push(d);
      }
    }

    for (let t of tree) {
      adaptToChildrenList(t);
    }

    function adaptToChildrenList(o) {
      if (childrenListMap[o[config.id]] !== null) {
        o[config.childrenList] = childrenListMap[o[config.id]];
      }
      if (o[config.childrenList]) {
        for (let c of o[config.childrenList]) {
          adaptToChildrenList(c);
        }
      }
    }
    return tree;
  }

  public static getObjType = (obj:any) => {
    var toString = Object.prototype.toString;
    var map = {
      "[object Boolean]": "boolean",
      "[object Number]": "number",
      "[object String]": "string",
      "[object Function]": "function",
      "[object Array]": "array",
      "[object Date]": "date",
      "[object RegExp]": "regExp",
      "[object Undefined]": "undefined",
      "[object Null]": "null",
      "[object Object]": "object",
    };
    if (obj instanceof Element) {
      return "element";
    }
    return map[toString.call(obj)];
  };

  /**
   * 对象深拷贝
   */
  public static deepClone(data:any) {
    var type = DataUtil.getObjType(data);
    var obj:any;

    if (type === "array") {
      obj = [];
    } else if (type === "object") {
      obj = {};
    } else {
      // 不再具有下一层次
      return data;
    }

    if (type === "array") {
      for (var i = 0, len = data.length; i < len; i++) {
        data[i] = (function() {
          if (data[i] === 0) {
            return data[i];
          }

          return data[i];
        })();

        if (data[i]) {
          delete data[i].$parent;
        }

        obj.push(DataUtil.deepClone(data[i]));
      }
    } else if (type === "object") {
      for (var key in data) {
        if (data) {
          delete data.$parent;
        }

        obj[key] = DataUtil.deepClone(data[key]);
      }
    }

    return obj;
  }
}
