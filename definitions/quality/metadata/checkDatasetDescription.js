operate("check_dataset_description", {
  type: 'operations',
  name: 'check_dataset_description_events',
  schema: 'metadata_quality',
  database: dataform.projectConfig.defaultDatabase,
  tags: ['check-up'],
  hasOutput: true,
  hermetic: true,
  }).queries(ctx =>
  `insert into metadata_quality.check_events
    SELECT
  catalog_name,
  schema_name,
  NULL AS table_name,
  NULL AS column_name,
  'description' AS metadata_type,
  CURRENT_TIMESTAMP()
FROM
  \`region-us.INFORMATION_SCHEMA.SCHEMATA\`
WHERE
  TRUE
  AND NOT CONTAINS_SUBSTR(ddl, 'description');
`
)
