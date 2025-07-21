import type { FieldNode, FieldType } from "../types";

interface FieldProps {
  field: FieldNode;
  level: number;
  onChange: (field: FieldNode) => void;
  onDelete: () => void;
}

const FIELD_TYPES: FieldType[] = ["string", "number", "boolean", "nested"];

// Toggle switch component styled like the image
const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
  <label style={{ display: "inline-block", width: 38, height: 22, position: "relative" }}>
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      style={{ opacity: 0, width: 0, height: 0 }}
    />
    <span
      style={{
        position: "absolute",
        cursor: "pointer",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: checked ? "#4f46e5" : "#ccc",
        borderRadius: 22,
        transition: "background 0.2s",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: checked ? 18 : 2,
          top: 2,
          width: 18,
          height: 18,
          background: "#fff",
          borderRadius: "50%",
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        }}
      />
    </span>
  </label>
);

export const Field: React.FC<FieldProps> = ({ field, level, onChange, onDelete }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        paddingLeft: level * 24,
        borderLeft: level > 0 ? "2px solid #888" : undefined,
        marginBottom: 8,
        background: "#fff",
        borderRadius: 6,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        minHeight: 44,
        position: "relative",
      }}
    >
      <input
        type="text"
        value={field.key}
        placeholder="Field name"
        onChange={e => onChange({ ...field, key: e.target.value })}
        style={{ flex: 1, padding: 8, fontSize: 16, border: "1px solid #e5e7eb", borderRadius: 4, background: "#f9fafb" }}
      />
      <select
        value={field.type}
        onChange={e => {
          const type = e.target.value as FieldType;
          onChange({ ...field, type, children: type === "nested" ? field.children || [] : undefined });
        }}
        style={{ padding: 8, fontSize: 16, border: "1px solid #e5e7eb", borderRadius: 4, background: "#f9fafb" }}
      >
        <option value="" disabled>Field Type</option>
        {FIELD_TYPES.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      {/* Required toggle */}
      <Toggle
        checked={!!field.required}
        onChange={checked => onChange({ ...field, required: checked })}
      />
      {/* Nested toggle (hidden, but kept for future extensibility) */}
      {/* {field.type === "nested" && (
        <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <input
            type="checkbox"
            checked={!!field.children}
            onChange={e => onToggleNested(e.target.checked)}
          />
        </label>
      )} */}
      <button
        onClick={onDelete}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          background: "#f33",
          border: "none",
          borderRadius: 4,
          width: 28,
          height: 28,
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: 20,
          marginLeft: 4,
          padding: 0,
        }}
        aria-label="Delete field"
      >
        ×
      </button>
    </div>
  );
}; 