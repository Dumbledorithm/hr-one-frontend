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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the schema
    console.log("Submitted schema:", JSON.stringify(fields, null, 2));
    alert("Schema submitted! Check the console for output.");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fafbfc" }}>
      <form
        onSubmit={handleSubmit}
        style={{ flex: 1, padding: 32, maxWidth: 700 }}
      >
        <FieldGroup fields={fields} level={0} onChange={setFields} />
        <button
          type="submit"
          style={{
            marginTop: 16,
            width: 120,
            background: "#fff",
            color: "#222",
            border: "1.5px solid #bbb",
            borderRadius: 6,
            padding: "8px 0",
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: 0.01,
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            cursor: "pointer",
            transition: "background 0.2s, border 0.2s",
            display: "block",
          }}
        >
          Submit
        </button>
      </form>
      <div style={{ width: 600, background: "#eee", padding: 32, fontFamily: "monospace", fontSize: 16, overflow: "auto" }}>
        <pre>{JSON.stringify(schemaPreview(fields), null, 2)}</pre>
      </div>
    </div>
  );
}
