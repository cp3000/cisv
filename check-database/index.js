module.exports = function(context, req) {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;

    context.log('Processing request');
    context.log(JSON.stringify(req.body));

    if (req.body && req.body.sql) {
        // Create connection to database
        var config = {
            userName: 'cisv', // update me
            password: 'Fipper123456!', // update me
            server: 'cp3000.database.windows.net', // update me
            options: {
                database: 'cp3000', //update me
                encrypt: true
            }
        }
        var connection = new Connection(config);

        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function(err) {
            if (err) {
                context.log(err);
                context.res = {
                    status: 400,
                    body: err
                };
                context.done();
            } else {
                queryDatabase()
            }
        });

        function queryDatabase() {
            context.log('Reading rows from the Table...');
            sql = req.body.sql;
            // Read all rows from table
            var results = [];
            request = new Request(
                sql,
                function(err, rowCount, rows) {
                    var result = JSON.stringify(results); //JSON.stringify(rows);
                    console.log(rowCount + ' row(s) returned');
                    context.bindings.res = result;
                    context.res = {
                        body: result
                    };
                    context.done();
                }
            );
            request.on('row', function(columns) {
                var result = [];
                columns.forEach(function(column) {
                    result.push(column.value);
                    context.log("%s\t%s", column.metadata.colName, column.value);
                });
                results.push(result);

            });

            connection.execSql(request);
        }


        ///>>>


    } else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
        context.done();
    }

};

module.exports.testargs = function() {
    var json = require('./sample.json');

    return [
        { body: json }, // parameter 1
        null, // parameter 2
        null, // parameter 3
        null, // parameter 4
        null // parameter 5
    ]

};