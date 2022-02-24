import { ContentProvider, ProvideFrom } from "src/ContentProvider"

let provider = new ContentProvider("./readme.md");
provider.provide("main_content");