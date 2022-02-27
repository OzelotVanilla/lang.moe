define(["require", "exports"], function (require, exports) {
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
    }
    exports.MarkdownTokenizer = MarkdownTokenizer;
});
