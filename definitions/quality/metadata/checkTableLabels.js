operate("check_table_labels", {
  type: 'operations',
  name: 'check_events',
  schema: 'metadata_quality',
  database: dataform.projectConfig.defaultDatabase,
  tags: ['check-up'],
  hasOutput: true,
  hermetic: true,
  columns: {
    catalog_name: 'GCP Project ID.',
    schema_name: 'Dataset Name.',
    table_name: 'Table Name',
    metadata_type: 'Type of metadata.',
    record_time_stamp: 'When this the record was created.',
  }}).queries(ctx =>
  `insert into metadata_quality.check_events
    SELECT
  table_catalog AS catalog_name,
  table_schema AS schema_name,
  table_name,
  'label' AS metadata_type,
  CURRENT_TIMESTAMP()
FROM
  \`region-us.INFORMATION_SCHEMA.TABLES\`
WHERE
  TRUE
  AND NOT CONTAINS_SUBSTR(ddl, 'labels');
`
)
