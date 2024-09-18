operate("metadata_quality_dataset", {
    type: 'operations',
    database: dataform.projectConfig.defaultDatabase,
    description: 'Dataset with execution logs',
    dependencies: [''],
    tags: ['setup'],
    hasOutput: true,
    hermetic: true
}).queries(ctx => `
CREATE SCHEMA IF NOT EXISTS metadata_quality
OPTIONS(
    location = 'US',
    default_partition_expiration_days = 7,
    labels = [('pipeline', 'metadata_quality'), ('tool', 'dataform')],
    description = 'Dataset to hold metadata quality checks.'
)
`)
