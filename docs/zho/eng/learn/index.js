define(["require", "exports", "src/ContentProvider"], function (require, exports, ContentProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let provider = new ContentProvider_1.ContentProvider("../src/basic/welcome.md");
    provider.provide("main_content");
});
