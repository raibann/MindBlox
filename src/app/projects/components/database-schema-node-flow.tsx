import {
  DatabaseSchemaNode,
  DatabaseSchemaNodeHeader,
  DatabaseSchemaNodeBody,
  DatabaseSchemaTableRow,
  DatabaseSchemaTableCell,
} from "@/components/react-flow/database-schema-node";
import type { NodeProps } from "reactflow";

interface DatabaseSchemaColumn {
  name: string;
  type: string;
  primary: boolean;
}

interface DatabaseSchemaNodeData {
  tableName: string;
  columns: DatabaseSchemaColumn[];
}

export function DatabaseSchemaNodeFlow({
  data,
}: NodeProps<DatabaseSchemaNodeData>) {
  const { tableName, columns } = data || { tableName: "", columns: [] };
  return (
    <DatabaseSchemaNode>
      <DatabaseSchemaNodeHeader>
        {tableName || "Table"}
      </DatabaseSchemaNodeHeader>
      <DatabaseSchemaNodeBody>
        {(columns || []).map((col, idx) => (
          <DatabaseSchemaTableRow key={col.name || idx}>
            <DatabaseSchemaTableCell>{col.name}</DatabaseSchemaTableCell>
            <DatabaseSchemaTableCell>{col.type}</DatabaseSchemaTableCell>
            <DatabaseSchemaTableCell>
              {col.primary ? "PK" : ""}
            </DatabaseSchemaTableCell>
          </DatabaseSchemaTableRow>
        ))}
      </DatabaseSchemaNodeBody>
    </DatabaseSchemaNode>
  );
}
