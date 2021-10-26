import JSZip from "jszip";
import FileSaver from "file-saver";

export class DownUtil {
  //文本下载保存zip
  public text2zip(content: string, zipName: string = "1.zip") {
    const zip = new JSZip();
    //zip.file("Hello.txt", "Hello World\n");
    zip.file("1.txt", content);
    zip.generateAsync({ type: "blob" }).then((content:any) => {
      //FileSaver(content, zipName);
    });
  }

  //文本下载
  public textDown(content: string, txtName: string = "1.txt") {
    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, txtName);
  }
}
