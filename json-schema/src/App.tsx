import { useState } from "react";
import type { FieldNode } from "./types";
import { FieldGroup } from "./components/FieldGroup";
import "./index.css";

function schemaPreview(fields: FieldNode[]): any {
  const obj: any = {};
  for (const field of fields) {
    const key = field.required ? `${field.key}*` : field.key;
    if (field.type === "nested" && field.children) {
      obj[key] = schemaPreview(field.children);
    } else if (field.type === "string") {
      obj[key] = "STRING";
    } else if (field.type === "number") {
      obj[key] = "NUMBER";
    } else if (field.type === "boolean") {
      obj[key] = "BOOLEAN";
    } else {
      obj[key] = "";
    }
  }
  return obj;
}

export default function App() {
  const [fields, setFields] = useState<FieldNode[]>([]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fafbfc" }}>
      <div style={{ flex: 1, padding: 32, maxWidth: 700 }}>
        <FieldGroup fields={fields} level={0} onChange={setFields} />
      </div>
      <div style={{ width: 600, background: "#eee", padding: 32, fontFamily: "monospace", fontSize: 16, overflow: "auto" }}>
        <pre>{JSON.stringify(schemaPreview(fields), null, 2)}</pre>
      </div>
    </div>
  );
}
