assertion("assert_metadata", {
    description: 'Valida as última medições dos metadados',
    hermetic: true,
    tags: ['assert']
}).query(ctx => `
    SELECT 
    * 
    FROM \`demos-and-features-dev.metadata_quality.check_events\` 
    WHERE TRUE
    AND TIMESTAMP_TRUNC(record_timestamp, DAY) = TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY))
`)