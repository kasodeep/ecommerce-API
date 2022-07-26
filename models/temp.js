/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
    {
        '$match': {
            'product': new ObjectId('62de3268aceb4b5de2b5c87c')
        }
    }, {
        '$group': {
            '_id': null,
            'averageRating': {
                '$avg': '$rating'
            },
            'numOfReviews': {
                '$sum': 1
            }
        }
    }
];

MongoClient.connect(
    '',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (connectErr, client) {
        assert.equal(null, connectErr);
        const coll = client.db('').collection('');
        coll.aggregate(agg, (cmdErr, result) => {
            assert.equal(null, cmdErr);
        });
        client.close();
    });