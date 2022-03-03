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
        constructor(config) {
            var _a, _b;
            if ((_a = config.file_path) !== null && _a !== void 0 ? _a : false) {
                this.file_path = config.file_path;
            }
            else if ((_b = config.original_text) !== null && _b !== void 0 ? _b : false) {
                this.parse(config.original_text);
            }
        }
        parse(text) {
        }
        result() {
            console.log("Showing parsed result.");
            return (0, FuncLib_1.readFileSync)(this.file_path);
        }
    }
    exports.MarkdownTokenizer = MarkdownTokenizer;
});
