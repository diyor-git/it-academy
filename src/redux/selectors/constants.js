import * as axios from 'axios'
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import {coursesAPI} from "../../api/coursesAPI";

export const EDITOR_JS_TOOLS = {
    embed: Embed,
    table: Table,
    marker: Marker,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: {
        class: LinkTool,
        config: {
            endpoint: 'https://api.mate-edu.io/editor/parser/', // Your backend endpoint for url data fetching
        }
    },
    image: {
        class: Image,
        config: {
            uploader: {

                uploadByFile(file) {
                    return coursesAPI.sendPhoto(file).then((data) => {
                        return {
                            success: 1,
                            file: {
                                url: data.image,
                                // any other image data you want to store, such as width, height, color, extension, etc
                            }
                        };
                    });
                },
            }
        }
    },
    raw: Raw,
    header: Header,
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
};

