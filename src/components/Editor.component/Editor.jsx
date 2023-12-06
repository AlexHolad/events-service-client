import React from "react";

import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor({description, setDescription}) {
  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        value={description}
        onEditorChange={(newValue) => setDescription(newValue)}
        init={{
          language: 'ru',
          height: 500,
          menubar: true,
          plugins: [
            "autolink",
            "lists",
            "link",
            "preview",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "code",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            relative_urls : false,
        }}
      />
    </>
  );
}
