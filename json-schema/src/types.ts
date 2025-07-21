export type FieldType = "string" | "number" | "boolean" | "nested";

export interface FieldNode {
  id: string;           // Unique ID
  key: string;          // Field name
  type: FieldType;      // Type of the field
  required?: boolean;   // Whether the field is required
  children?: FieldNode[]; // Only for nested fields
} 