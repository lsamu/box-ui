import axios, { AxiosResponse } from "axios";
import { GlobalUtil } from "@/commons/GlobalUtil";
import { Message, Loading, Alert } from "element-ui";

/**
 * Axios请求封装
 */
export class AxiosUtil {
  public static UrlPrex: string = GlobalUtil.Url();

  //初始化axios
  public static init(config: { router: any; url: string }) {
    AxiosUtil.UrlPrex = config.url;
    //
    axios.interceptors.response.use(
      (response) => {
        if (
          response.data.code == 302 ||
          response.data.code == 301 ||
          response.data.code == 401
        ) {
          Message.error({ message: response.data.msg });
          config.router.push("/login");
          return Promise.reject(response.data);
        }
        if (response.data.code == 500) {
          Message.error({ message: response.data.msg });
          return Promise.reject(response.data);
        }
        return response;
      },
      (error) => {
        Message.error({ message: "请求错误!" + error });
        return Promise.reject(error);
      }
    );
  }

  /**
   * http get
   * @param url
   */
  public static async get<T>(url: string) {
    let d = await axios.get(AxiosUtil.UrlPrex + url, {
      headers: {
        "content-type": "application/json",
        token: GlobalUtil.getAdminToken(),
      },
    });
    return d.data as T;
  }

  /**
   * http post
   * @param url
   * @param data
   */
  public static async post<T>(url: string, data: any) {
    let d = await axios.post(AxiosUtil.UrlPrex + url, data, {
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "content-type": "application/json",
        token: GlobalUtil.getAdminToken(),
      },
      // transformRequest: [
      //   function (data) {
      //     //在请求之前对data传参进行格式转换
      //     data = Qs.stringify(data);
      //     return data;
      //   }
      // ]
    });
    return d.data as T;
  }

  /**
   * http put
   * @param url
   * @param data
   */
  public static async put<T>(url: string, data: any) {
    let d = await axios.put(AxiosUtil.UrlPrex + url, data, {
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "content-type": "application/json",
        token: GlobalUtil.getAdminToken(),
      },
      // transformRequest: [
      //   function (data) {
      //     //在请求之前对data传参进行格式转换
      //     data = Qs.stringify(data);
      //     return data;
      //   }
      // ]
    });
    return d.data as T;
  }

  /**
   * http delete
   * @param url
   */
  public static async delete<T>(url: string) {
    let d = await axios.delete(AxiosUtil.UrlPrex + url, {
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "content-type": "application/json",
        token: GlobalUtil.getAdminToken(),
      },
    });
    return d.data as T;
  }
}
