operate("check_events_table", {
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
    }
}).queries(ctx => `
CREATE TABLE IF NOT EXISTS metadata_quality.check_events (
    catalog_name STRING NOT NULL OPTIONS(description="GCP porject id"),
    schema_name STRING NOT NULL OPTIONS(description="Schema name"),
    table_name STRING OPTIONS(description="Table name"),
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
