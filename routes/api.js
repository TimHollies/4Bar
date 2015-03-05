var
    express = require('express'),
    router = express.Router();
    monk = require('monk'),
    db = monk('localhost/webabc'),
    ObjectID = require('mongodb').ObjectID,
    _ = require('lodash');

var PAGING_SIZE = 40;

//ensure index
db.get("tunes").ensureIndex({"name":"text"});

/* GET home page. */
router.get('/tunes', function(req, res) {

    var collection = db.get("tunes");

    var toSkip = req.query.skip === undefined ? 0 : req.query.skip * 20;

    var conditions = {
        'metadata.public': true,
    };

    if(req.query.name !== undefined && req.query.name.length > 0) {
        conditions['name'] = { 
            "$regex": new RegExp(req.query.name, "i") 
        };
    }

    if(req.query.disallowkeys !== undefined && req.query.disallowkeys.length > 0) {
        
        var diskeys = req.query.disallowkeys.split(",");
        console.log("WOOP", diskeys);

        conditions['settings.key.note'] = { 
            "$nin": diskeys
        };
    }

    collection.find(conditions, 
    {
        fields: {
            "_id": 1,
            "name": 1,
            "type": 1,
            "settings": 1,
            "metadata": 1
        },
        limit: PAGING_SIZE,
        skip: toSkip,
        sort: {name: 1}
    })
    .then(function(docs) {
        res.json(docs);
    });
});

router.get('/tune/:id', function(req, res) {
    var collection = db.get("tunes");
    collection.findById(req.params.id,        
        function(e, docs) {
            res.json(docs);
        });
});

router.post('/tunes/add', function(req, res) {
   res.send(req.body.tune);
});

router.post('/tunes/publish', function(req, res) {
    //only the owner can publish a tune
   res.send(req.body.tuneId);
   db.get("tunes").updateById(req.body.tuneId, {
        $set: {public: true}
   });
});

router.get('/tunebooks', function(req, res) {

    res.type('json');

    if (req.user === undefined) {
        res.send({});
        return;
    } 
    

    var collection = db.get("tunebooks");

    collection.find({
        'owner': req.user._id
    }, {
        fields: {
            "name": 1,
        }
    })
    .then(function(docs) {
        res.json(docs);
    });
});

router.post('/tunebook/add', function(req, res) {

    var tunebooks = db.get('tunebooks')
    var record = req.body;
    record.owner = req.user._id;

    tunebooks.insert(record, function (err, doc) {
        
    });

    res.send("done");
});

router.get('/tunebook/:id', function(req, res) {

    var tunebooks = db.get('tunebooks')
    var loggedInUser = req.user === undefined ? undefined : new ObjectID(req.user._id);
    
    tunebooks.findById(req.params.id,        
    function(e, docs) {
        console.log("REQUEST FROM ", loggedInUser, " FOR RESOURCE BELONGING TO ", docs.owner);
        if(loggedInUser !== undefined && docs.owner.equals(loggedInUser)) {
            res.json(docs);
        } else {
            res.status(500).send('Unauthorised');
        }        
    });
});

router.get('/user', function(req, res) {
    res.type('json');
    console.log("GETTING USER", req.user);
    if (req.user === undefined) {
        res.send({ failed: true });
        return;
    } 
    
    res.send(req.user);
});

router.get('/user/tunes', function(req, res) {
    if (req.user === undefined) res.send("");
    res.type('json');
    var collection = db.get("tunes");

    collection.find({
        owner: req.user.googleId
    },
    function(e, docs) {
        res.json(docs);
    });
});



module.exports = router;