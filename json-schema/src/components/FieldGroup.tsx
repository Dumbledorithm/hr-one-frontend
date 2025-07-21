import React from "react";
import type { FieldNode, FieldType } from "../types";
import { Field } from "./Field";

interface FieldGroupProps {
  fields: FieldNode[];
  level: number;
  onChange: (fields: FieldNode[]) => void;
}

function uuid() {
  return Math.random().toString(36).slice(2, 10);
}

export const FieldGroup: React.FC<FieldGroupProps> = ({ fields, level, onChange }) => {
  const handleFieldChange = (idx: number, updated: FieldNode) => {
    const newFields = fields.map((f, i) => (i === idx ? updated : f));
    onChange(newFields);
  };

  const handleDelete = (idx: number) => {
    const newFields = fields.filter((_, i) => i !== idx);
    onChange(newFields);
  };

  const handleAdd = () => {
    onChange([
      ...fields,
      { id: uuid(), key: "", type: "string" as FieldType, required: false },
    ]);
  };

  return (
    <div>
      {fields.map((field, idx) => (
        <div key={field.id}>
          <Field
            field={field}
            level={level}
            onChange={updated => handleFieldChange(idx, updated)}
            onDelete={() => handleDelete(idx)}
          />
          {field.type === "nested" && field.children && (
            <FieldGroup
              fields={field.children}
              level={level + 1}
              onChange={children => {
                handleFieldChange(idx, { ...field, children });
              }}
            />
          )}
        </div>
      ))}
      <button
        onClick={handleAdd}
        style={{
          width: "100%",
          background: "#2233ff",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: 10,
          margin: "8px 0 16px 0",
          fontWeight: 500,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        + Add Item
      </button>
    </div>
  );
}; 