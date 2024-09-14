operate("metadata_quality_dataset", {
    type: 'operations',
    schema: 'metadata_quality',
    database: dataform.projectConfig.defaultDatabase,
    description: 'Dataset with execution logs',
    dependencies: [''],
    tags: ['setup'],
    hasOutput: true,
    hermetic: true
}).queries(ctx => `
CREATE SCHEMA IF NOT EXISTS ${ctx.self()} 
OPTIONS(
    location = 'US',
    default_partition_expiration_days = 7,
    labels = [('pipeline', 'metadata_quality'), ('tool', 'dataform'), ('updated_schedule', 'semanal')]
)
`)
