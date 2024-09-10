publish("top_historical", {
    type: "incremental",
    schema: "historical",
    description: "Top term for each week",
    tags: ["historical"],
    dependencies: ["top_five_terms"],
    columns: {
        week: "Start of the week",
        term: "Term name",
        state: "State",
        score: "Score",
        timestamp: "Timestamp",
    }
}).query(ctx => `
    SELECT *
    , DATETIME_TRUNC(CURRENT_TIMESTAMP(), DAY) AS timestamp 
    FROM ${ctx.ref("top_five_terms")}
    WHERE TRUE
    AND state = 'GO'
    ${ctx.when(ctx.incremental(),
    `AND CURRENT_TIMESTAMP() > (SELECT MAX(timestamp) FROM ${ctx.self()})`)}
    ORDER BY score
    LIMIT 1
`)