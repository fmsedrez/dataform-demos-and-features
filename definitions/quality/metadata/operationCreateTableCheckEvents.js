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
CREATE TABLE IF NOT EXISTS ${ctx.self()} (
    catalog_name STRING NOT NULL,
    schema_name STRING NOT NULL,
    table_name STRING,
    metadata_type STRING NOT NULL,
    record_time_stamp TIMESTAMP NOT NULL
)
PARTITION BY DATE(record_time_stamp)
OPTIONS(
    require_partition_filter = true,
    partition_expiration_days = 7,
    labels = [('pipeline', 'metadata_quality'), ('tool', 'dataform'), ('updated_schedule', 'semanal')]
)
`)
