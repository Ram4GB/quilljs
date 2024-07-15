import { Quill } from "react-quill";

const Embed = Quill.import("blots/embed");

interface Value {
  alt: string;
  url: string;
  width: string;
  height: string;
  align: string;
}

class ImageEvent extends Event {
  event: any;
  value: any;
}

const centerStyle = "margin: 0 auto;display:block";

class ImageBlot extends Embed {
  private mounted = false;

  static create(value: Value) {
    const node = super.create();

    node.setAttribute("src", value.url);
    node.setAttribute("alt", value.alt);
    node.setAttribute("width", value.width);
    node.setAttribute("height", value.height);

    switch (value.align) {
      case "center":
        node.setAttribute("style", centerStyle);
        break;
      case "right":
        node.setAttribute("style", "float: right;");
        break;
      case "left":
        node.setAttribute("style", "float: left;");
        break;
    }

    return node;
  }

  constructor(domNode: any, value: Value) {
    super(domNode, value);
    this.domNode = domNode;
  }

  handleClick(e: any) {
    const event = new ImageEvent("styled-image-event", {
      bubbles: true,
      cancelable: true,
    });
    event.value = { ...this.domNode.dataset };
    const parchment = Quill.find(this.domNode);
    event.event = e;
    event.value = parchment;
    window.dispatchEvent(event);
    e.preventDefault();
  }

  alignImage(align: string) {
    if (align === "center") {
      this.domNode.setAttribute("style", centerStyle);
    } else if (align === "right") {
      this.domNode.setAttribute("style", `float: right;`);
    } else if (align === "left") {
      this.domNode.setAttribute("style", `float: left;`);
    }
  }

  updateDimensions(width: string, height: string) {
    this.domNode.setAttribute("width", width);
    this.domNode.setAttribute("height", height);
  }

  format(format: string, value: string) {
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
    this.domNode.removeEventListener("click", this.handleClick.bind(this));
  }

  static value(node: HTMLDivElement) {
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
