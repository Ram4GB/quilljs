import Quill from "quill";

const Module = Quill.import("core/module");

class QuillImageModule extends Module {
  constructor(quill: Quill, options: any) {
    super(quill, options);
  }
}

export default QuillImageModule;
