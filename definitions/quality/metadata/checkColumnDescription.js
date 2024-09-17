operate("check_column_description", {
  type: 'operations',
  name: 'check_column_description_events',
  schema: 'metadata_quality',
  database: dataform.projectConfig.defaultDatabase,
  tags: ['check-up'],
  hasOutput: true,
  hermetic: true,
  }).queries(ctx =>
  `insert into metadata_quality.check_events
    SELECT
  table_catalog AS catalog_name,
  table_schema AS schema_name,
  table_name,
  column_name,
  'description' AS metadata_type,
  CURRENT_TIMESTAMP()
FROM
  \`region-us.INFORMATION_SCHEMA.COLUMN_FIELD_PATHS\`
WHERE
  TRUE
  AND description IS NULL;
`
)
