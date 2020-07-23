import React from "react";

export default function PdfForm() {
  return (
    <form>
      <input
        type="file"
        id="project__file"
        name="project__file"
        accept=".pdf"
      />
      <input type="submit" />
    </form>
  );
}
