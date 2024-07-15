"use client";
import "quill-mention/dist/quill.mention.css";
import "react-quill/dist/quill.snow.css";
import { atValues, hashValues } from "./mock";
import { Button } from "./ui/button";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { formats, toolbar } from "./defaultConfig";
import { handleUploadFile, handleSave } from "@/app/actions";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import dynamic from "next/dynamic";
import ImageBlot from "./quill-image/blot";
import Mention from "quill-mention";
import OptionDialog from "./quill-image/Dialog";
import QuillImage from "./quill-image/module";
import ReactQuill, { Quill } from "react-quill";
import styles from "./QuillJs.module.css";

Quill.register({ "modules/mention": Mention });
Quill.register("modules/quill-image", QuillImage);

Quill.register(ImageBlot);

const MentionBlot = Quill.import("blots/mention");

class StyledMentionBlot extends MentionBlot {
  static render(data: any) {
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

interface QuillJsProps {
  defaultDeltaValues: any;
}

const QuillJs: FC<QuillJsProps> = ({ defaultDeltaValues }) => {
  const editorRef = useRef<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
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

                const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
                  return new Promise((resolve) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                      resolve(reader.result);
                    };
                    reader.onerror = function (error) {
                      console.log("Error: ", error);
                    };
                  });
                };

                const base64 = await getBase64(file);

                const formData = new FormData();
                formData.append("base64", base64?.toString() ?? "");

                let url = "";

                try {
                  const result = await handleUploadFile(formData);
                  url = result.secure_url;
                } catch (error) {
                  console.error(error);
                }

                if (!url) throw new Error("Error uploading image");

                const quill = editorRef.current?.editor;

                if (quill) {
                  const range = quill.getSelection();
                  range && quill.insertEmbed(range.index, "styled-image", { url, alt: "logo" });
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
        source: async function (searchTerm: string, renderList: any, mentionChar: string) {
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
      "quill-image": {},
    }),
    []
  );

  const handleSubmitOption = (data: any) => {
    if (!selectedImage) return;

    selectedImage.format("align", data.align);
    selectedImage.format("dimension", data.dimension);

    setSelectedImage(undefined);
  };

  useEffect(() => {
    window.editor = editorRef.current;
    editorRef.current?.editor.setContents(defaultDeltaValues);

    const handler = (event: any) => {
      const quill = editorRef.current.editor;
      if (quill) {
        const { value: blot } = event;
        setSelectedImage(blot);
      }
    };

    window.addEventListener("styled-image-event", handler);

    return () => {
      window.removeEventListener("styled-image-event", handler);
    };
  }, [defaultDeltaValues]);

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
      <OptionDialog
        open={Boolean(selectedImage)}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        onSubmit={handleSubmitOption}
      />
      <Toaster
        position="top-center"
        richColors
        duration={2000}
        style={{ fontSize: "1rem" }}
        toastOptions={{ style: {} }}
      />
      <div className="flex justify-center">
        <Button
          className="w-full max-w-[500px] mx-auto rounded-none"
          onClick={() => {
            handleSave(JSON.stringify(editorRef.current.editor.editor.delta)).then((res) => {
              if (res.success) {
                toast.success("Saved successfully");
              } else {
                toast.error("Saved failed");
              }
            });
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(QuillJs), { ssr: false });
