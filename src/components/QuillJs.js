import "quill-mention/dist/quill.mention.css";
import "react-quill/dist/quill.snow.css";
import { atValues, hashValues } from "./mock";
import { defaultDeltaValues } from "./const";
import { formats, toolbar } from "./defaultConfig";
import { handleUploadFile } from "@/app/actions";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Mention from "quill-mention";
import QuillImage from "./quill-image/module";
import ReactQuill, { Quill } from "react-quill";
import styles from "./QuillJs.module.css";

Quill.register({ "modules/mention": Mention });
Quill.register("modules/quill-image", QuillImage);

// Quill.register(ImageBlot);

const MentionBlot = Quill.import("blots/mention");

class StyledMentionBlot extends MentionBlot {
  static render(data) {
    const element = document.createElement("span");
    element.innerText = data.value;
    element.style.color = data.color ?? "blue";
    element.style.backgroundColor = data.background ?? "yellow";
    element.style.fontFamily = "Menlo";
    return element;
  }
}
StyledMentionBlot.blotName = "styled-mention";

Quill.register(StyledMentionBlot);

const QuillJs = () => {
  const [value, setValue] = useState("");
  const modules = useMemo(
    () => ({
      toolbar: {
        ...toolbar,
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();
            input.onchange = async () => {
              if (input !== null && input.files !== null) {
                const file = input.files[0];

                const getBase64 = (file) => {
                  return new Promise((resolve) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                      console.log(reader.result);
                      resolve(reader.result);
                    };
                    reader.onerror = function (error) {
                      console.log("Error: ", error);
                    };
                  });
                };

                const base64 = await getBase64(file);

                const formData = new FormData();
                formData.append("base64", base64);

                let url = "";

                try {
                  const result = await handleUploadFile(formData);
                  url = result.secure_url;
                } catch (error) {
                  console.error(error);
                }

                if (!url) throw new Error("Error uploading image");

                const quill = editorRef.current.editor;

                if (quill) {
                  const range = quill.getSelection();
                  range && quill.insertEmbed(range.index, "image", url);
                }
              }
            };
          },
        },
      },
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#"],
        spaceAfterInsert: false,
        source: async function (searchTerm, renderList, mentionChar) {
          let values;
          if (mentionChar === "@") {
            values = atValues;
          } else {
            values = hashValues;
          }
          if (searchTerm.length === 0) {
            renderList(values, searchTerm);
          } else {
            const matches = [];
            for (let i = 0; i < values.length; i++) {
              if (values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
            }
            renderList(matches, searchTerm);
          }
        },
        blotName: "styled-mention",
      },
    }),
    []
  );

  const editorRef = useRef(null);

  useEffect(() => {
    window.editor = editorRef.current;
    editorRef.current.editor.setContents(defaultDeltaValues);
  }, []);

  return (
    <>
      <div className={styles.editor}>
        <ReactQuill
          ref={editorRef}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
        />
      </div>
      <textarea value={window.editor?.unprivilegedEditor?.getHTML()} />
      <textarea value={JSON.stringify(window.editor?.editor.editor.delta)} />
    </>
  );
};

export default dynamic(() => Promise.resolve(QuillJs), { ssr: false });
