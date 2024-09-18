operate("create_check_events_table", {
    type: 'operations',
    name: 'create_check_events',
    schema: 'metadata_quality',
    database: dataform.projectConfig.defaultDatabase,
    description: 'Table with metadata quality',
    dependencies: ['metadata_quality_dataset'],
    tags: ['setup'],
    hasOutput: true,
    hermetic: true
}).queries(ctx => `
CREATE TABLE IF NOT EXISTS metadata_quality.check_events (
    catalog_name STRING NOT NULL OPTIONS(description="GCP porject id"),
    schema_name STRING NOT NULL OPTIONS(description="Schema name"),
    table_name STRING OPTIONS(description="Table name"),
    column_name STRING OPTIONS(description="Column name"),
    metadata_type STRING NOT NULL OPTIONS(description="Type of metadata record"),
    record_timestamp TIMESTAMP NOT NULL OPTIONS(description="Timestamp of registry")
)
PARTITION BY DATE(record_timestamp)
OPTIONS(
    require_partition_filter = true,
    partition_expiration_days = 7,
    labels = [('pipeline', 'metadata_quality'), ('tool', 'dataform'), ('updated_schedule', 'semanal')],
    description = 'Table to hold metadata quality checks events.'
)
`)
