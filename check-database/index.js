module.exports = function (context, req) {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;


    context.log('Processing request');
    
    if (req.body && req.body.name) {

        // >>>

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
        connection.on('connect', function (err) {
            if (err) {
                context.log(err)
            }
            else {
                queryDatabase()
            }
        });

        function queryDatabase() {
            context.log('Reading rows from the Table...');

            // Read all rows from table
            request = new Request(
                `
        SELECT TOP (1000) [id]
      ,[timestamp]
      ,[userName]
      ,[email]
      ,[password]
      ,[country]
      ,[image]
      ,[birthday]
  FROM [dbo].[User]
        `,
                function (err, rowCount, rows) {
                    console.log(rowCount + ' row(s) returned');
                    context.bindings.res =  "database answered: " + rowCount + ' row(s) returned'
                     context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: "database answered: " + rowCount + ' row(s) returned'
                };
                context.done();
                }
            );

            request.on('row', function (columns) {
                columns.forEach(function (column) {
                    context.log("%s\t%s", column.metadata.colName, column.value);
                });
               
            });

            connection.execSql(request);
        }


        ///>>>


    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
        context.done();
    }

};

module.exports.testargs = function () {
    var json = require('./sample.json');

    return [
        { body: json }, // parameter 1
        null, // parameter 2
        null, // parameter 3
        null, // parameter 4
        null // parameter 5
    ]

};