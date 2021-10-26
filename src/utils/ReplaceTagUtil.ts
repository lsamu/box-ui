//https://github.com/narsic/replace_tag_node.js

function ReplaceTag(str:any, tag:any, all:any) {
    this.str = str;
    this.tag = tag;

    if (all === false) {
        this.replaceAll = false;
    } else {
        this.replaceAll = true;
    }

    this.getStartIndex = function (start:any) {
        var startTag = '<' + this.tag;
        start = this.str.indexOf(startTag, start ? start : 0);
        while (true) {
            if (start === -1) {
                break;
            }
            var nextCharTag = this.str.charAt(start + startTag.length);
            if (nextCharTag == ' ' || nextCharTag == '>') {
                return start;
            }
            start = this.str.indexOf(startTag, start + 1);
        }
        return -1;
    };

    this.getEndIndex = function (start:any) {
        var endTag = '</' + this.tag;
        var end = this.str.indexOf(endTag, start);
        while (true) {
            if (end === -1) {
                break;
            }
            var nextCharTag = this.str.charAt(end + endTag.length);
            if (nextCharTag == ' ' || nextCharTag == '>') {
                return end;
            }
            end = this.str.indexOf(endTag, end + 1);
        }
        return -1;
    };

    this.initialize = function () {
        var start = this.getStartIndex();
        while (true) {
            if (start === -1) {
                break;
            }
            var end = this.getEndIndex(start);
            end = this.str.indexOf('>', end);
            end++;
            var newStr = this.str.substr(0, start);
            newStr += this.str.substr(end);
            this.str = newStr;
            if (!this.replaceAll) {
                break;
            }
            start = this.getStartIndex();
        }
        return this.str;
    };
    return this.initialize();
}
export default ReplaceTag;