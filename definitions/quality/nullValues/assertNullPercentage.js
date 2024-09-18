assert("assert_null_percentage", {
    description: 'Check null percentage',
    hermetic: true,
    tags: ['assert']
}).query(ctx => `
    WITH null_percentage AS (
SELECT
    ROUND((COUNTIF(column_name IS NULL) / COUNT(*)) * 100.0, 2) as null_value_percentage
    FROM \`demos-and-features-dev.metadata_quality.check_events\` 
    WHERE TRUE
    AND TIMESTAMP_TRUNC(record_timestamp, DAY) = TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)))
SELECT *
FROM null_percentage
WHERE TRUE
AND null_value_percentage >= 10
`)
