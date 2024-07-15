import { Quill } from "react-quill";

const Embed = Quill.import("blots/embed");

class ImageBlot extends Embed {
  mounted = false;
  static centerStyle = "margin: 0 auto;display:block";

  static create(value) {
    const node = super.create();

    node.setAttribute("src", value.url);
    node.setAttribute("alt", value.alt);
    node.setAttribute("width", value.width);
    node.setAttribute("height", value.height);

    console.log("this.centerStyle", this.centerStyle);

    if (value.align === "center") {
      node.setAttribute("style", this.centerStyle);
    } else if (value.align === "right") {
      node.setAttribute("style", "float: right;");
    } else if (value.align === "left") {
      node.setAttribute("style", "float: left;");
    }

    return node;
  }

  constructor(domNode, value) {
    super(domNode, value);
    this.domNode = domNode;
  }

  handleClick(e) {
    const event = new Event("styled-image-event", {
      bubbles: true,
      cancelable: true,
    });
    event.value = Object.assign({}, this.domNode.dataset);
    const parchment = Quill.find(this.domNode);
    event.event = e;
    event.value = parchment;
    window.dispatchEvent(event);
    e.preventDefault();
  }

  alignImage(align) {
    if (align === "center") {
      this.domNode.setAttribute("style", this.centerStyle);
    } else if (align === "right") {
      this.domNode.setAttribute("style", `float: right;`);
    } else if (align === "left") {
      this.domNode.setAttribute("style", `float: left;`);
    }
  }

  updateDimensions(width, height) {
    this.domNode.setAttribute("width", width);
    this.domNode.setAttribute("height", height);
  }

  format(format, value) {
    if (format === "align") {
      this.alignImage(value);
    } else {
      this.updateDimensions(value, value);
    }
  }

  attach() {
    super.attach();
    if (this.mounted) return;
    this.mounted = true;
    this.domNode.addEventListener("click", this.handleClick.bind(this));
  }

  detach() {
    super.detach();
    this.mounted = false;
    this.domNode.removeEventListener("click", this.handleClick);
  }

  // Its will return new delta value everytime user changes text
  static value(node) {
    const isAlignCenter = node.style.margin === "0px auto" && node.style.display === "block";

    return {
      alt: node.getAttribute("alt"),
      url: node.getAttribute("src"),
      width: node.getAttribute("width"),
      height: node.getAttribute("height"),
      align: node.style.float || (isAlignCenter ? "center" : undefined),
    };
  }
}

ImageBlot.blotName = "styled-image";
ImageBlot.tagName = "img";

export default ImageBlot;
