define(["require", "exports", "../util/FuncLib"], function (require, exports, FuncLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MarkdownTokenizer = void 0;
    var SpecialStartings;
    (function (SpecialStartings) {
        SpecialStartings[SpecialStartings["*"] = 0] = "*";
        SpecialStartings[SpecialStartings["#"] = 1] = "#";
        SpecialStartings[SpecialStartings[">"] = 2] = ">";
        SpecialStartings[SpecialStartings["-"] = 3] = "-";
    })(SpecialStartings || (SpecialStartings = {}));
    /**
     *
     */
    class MarkdownTokenizer {
        constructor(file_path) {
            this.file_path = file_path;
        }
        result() {
            console.log("Showing parsed result.");
            let content = "Failed to load file by ajax.";
            (0, FuncLib_1.readFileAsync)(this.file_path, (text) => { content = text; }, (status) => { console.warn(status); });
            return content;
        }
    }
    exports.MarkdownTokenizer = MarkdownTokenizer;
});
