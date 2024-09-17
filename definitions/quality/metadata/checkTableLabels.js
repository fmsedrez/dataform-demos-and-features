operate("update_partition", {
  type: 'operations',
  name: 'check_events',
  schema: 'metadata_quality',
  database: dataform.projectConfig.defaultDatabase,
  description: 'Table with metadata quality',
  dependencies: ['metadata_quality_dataset'],
  tags: ['setup'],
  hasOutput: true,
  hermetic: true,
  columns: {
    catalog_name: 'GCP Project ID.',
    schema_name: 'Dataset Name.',
    table_name: 'Table Name',
    metadata_type: 'Type of metadata.',
    record_time_stamp: 'When this the record was created.',
  }}).queries(ctx =>
    `SELECT
  table_catalog,
  table_schema,
  table_name
FROM
  'region - us.INFORMATION_SCHEMA.TABLES'
WHERE
  TRUE
  AND NOT CONTAINS_SUBSTR(ddl, 'labels');
`
)
