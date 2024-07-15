import Quill from "quill";

const Module = Quill.import("core/module");

class QuillImageModule extends Module {
  constructor(quill, options) {
    super(quill, options);

    console.log(this);
  }
}

export default QuillImageModule;
