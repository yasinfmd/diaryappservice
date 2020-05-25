let QueryParser = {
    parseQuery(parser) {
        let parsedQuery = {}
        parser.forEach((item) => {
            if (item.Operation == "EQ") {
                parsedQuery[item.PropertyName] = item.PropertyValue
            } else if (item.Operation == "CT") {
                parsedQuery[item.PropertyName] = {$regex: '.*' + item.PropertyValue + '.*'}
            } else if (item.Operation == "GT") {
                parsedQuery[item.PropertyName] = {$gt: item.PropertyValue}
            } else if (item.Operation == "IN") {
                parsedQuery[item.PropertyName] = {$in: [item.PropertyValue]}
            }
        })
        return parsedQuery
    }
}


module.exports = QueryParser
