import { ContentProvider } from "../../../../src/ContentProvider"

let provider = new ContentProvider("../src/basic/welcome.md");
provider.provide("main_content");