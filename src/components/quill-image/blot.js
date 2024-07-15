import { Quill } from "react-quill";

const Embed = Quill.import("formats/image");

class ImageBlot extends Embed {}

ImageBlot.blotName = "image";
ImageBlot.tagName = "IMG";
ImageBlot.SANITIZED_URL = "about:blank";

export default ImageBlot;
