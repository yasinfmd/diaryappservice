let QueryParser = {
    parseQuery(parser) {
        let parsedQuery = {}
        parser.forEach((item) => {
            if (item.Operation == "EQ") {
                if (parsedQuery[item.PropertyName] == undefined) {
                    parsedQuery[item.PropertyName.trim()] = item.PropertyValue
                } else {
                    parsedQuery[item.PropertyName.trim()]['$eq'] = item.PropertyValue
                }
            } else if (item.Operation == "CT") {
                if (parsedQuery[item.PropertyName] == undefined) {
                    parsedQuery[item.PropertyName.trim()] = {$regex: '.*' + item.PropertyValue + '.*'}
                } else {
                    parsedQuery[item.PropertyName.trim()]['$regex'] = '.*' + item.PropertyValue + '.*'
                }
            } else if (item.Operation == "GT") {
                if (parsedQuery[item.PropertyName] == undefined) {
                    parsedQuery[item.PropertyName.trim()] = {$gte: item.PropertyValue}
                } else {
                    parsedQuery[item.PropertyName.trim()]['$gte'] = item.PropertyValue
                }
            } else if (item.Operation == "LT") {
                if (parsedQuery[item.PropertyName] == undefined) {
                    parsedQuery[item.PropertyName.trim()] = {$lte: item.PropertyValue}
                } else {
                    parsedQuery[item.PropertyName.trim()]['$lte'] = item.PropertyValue
                }
            } else if (item.Operation == "IN") {
                if (parsedQuery[item.PropertyName] == undefined) {
                    parsedQuery[item.PropertyName.trim()] = {$in: [item.PropertyValue]}
                } else {
                    parsedQuery[item.PropertyName.trim()]['$in'] = [item.PropertyValue]
                }
            }
        })
        return parsedQuery
    }
}


module.exports = QueryParser
