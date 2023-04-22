const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

var mongodb = require('mongodb');

var mongoClient = mongodb.MongoClient;
// var url = "mongodb://localhost:27017/";
var url = "mongodb+srv://shubhsaras:shubhsaras38@moverzfax.2op18.mongodb.net/<dbname>?retryWrites=true&w=majority";
//Basic root route
router.get('/', (req, res) => {
  res.send('We are on movers');
});


//To create a new database
router.get('/createDatabase', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) { // use for to connect to the databases
    if (error) {
      throw error;

    }
    var dbobject = databases.db('moverzFax'); //use for create database
    console.log("database is created")
    databases.close();

  });

});

//To create a new collection
router.get('/createCollection', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }
    var dbase = databases.db("moverzFax");
    dbase.createCollection("movers", function(error, response) {
      if (error) {
        throw error;
      }

      console.log("collection is created.....")
      databases.close();
    });
  });
});

//To create a document
router.post('/addSingle', (req, res) => {

  mongoClient.connect(url, { useUnifiedTopology: true },function(err, databases) {
    if (err) {
      throw err;
    }
    var nodetestDB = databases.db("moverzFax"); //here
    var postCollection = nodetestDB.collection("movers");
    var post = {
        moverName: req.body.moverName,
        moverRating: req.body.moverRating,
        moverPhno: req.body.moverPhno,
        moverUSDOTNo:req.body.moverUSDOTNo,
        moverMCNo:req.body.moverMCNo,
        moverDescription:req.body.moverDescription,
        moverCountry:req.body.moverCountry,
        moverState:req.body.moverState,
        moverCity:req.body.moverCity,
        moverZipCode:req.body.moverZipCode
    };

    postCollection.insertOne(post, function(error, response) {
      if (error) {
        throw error;
      }

      console.log("1 document inserted");
      res.send('! document inserted');
      databases.close();
    });
  });

});


//To add many docs
router.post('/addMultiple', (req, res) => {

  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }
    var nodtst = databases.db("moverzFax");

    nodtst.collection('movers').insertMany(req.body, function(error, response) {
      if (error) {
        throw error;

      }
      console.log("Numnber of document is inserted.........");
      res.send('Many Document Created');
    })
  })

});

//to find a single document from the collection using a name
router.post('/findByName', (req, res) => {
  mongoClient.connect(url, { useUnifiedTopology: true },function(error, databases) {
    if (error) {
      throw error;

    }
    var nodtst = databases.db("moverzFax");

    nodtst.collection("movers").findOne({
        moverName: req.body.moverName
    }, function(err, result) {
      if (err) throw err;
      console.log("one record is found....." + result.moverName + ", " + result.moverDescription);
      res.send(result);
      databases.close();
    })
  })
});

//to find a single document from the collection using a USDOTNo
router.post('/findByUSDOT', (req, res) => {
  mongoClient.connect(url, { useUnifiedTopology: true },function(error, databases) {
    if (error) {
      throw error;

    }
    var nodtst = databases.db("moverzFax");

    nodtst.collection("movers").findOne({
        moverUSDOTNo: req.body.moverUSDOTNo
    }, function(err, result) {
      if (err) throw err;
      console.log("one record is found....." + result.moverName + ", " + result.moverDescription);
      res.send(result);
      databases.close();
    })
  })
});

//to find a single document from the collection using a MCNo
router.post('/findByMCNo', (req, res) => {
  mongoClient.connect(url, { useUnifiedTopology: true },function(error, databases) {
    if (error) {
      throw error;

    }
    var nodtst = databases.db("moverzFax");

    nodtst.collection("movers").findOne({
        moverMCNo: req.body.moverMCNo
    }, function(err, result) {
      if (err) throw err;
      console.log("one record is found....." + result.moverName + ", " + result.moverDescription);
      res.send(result);
      databases.close();
    })
  })
});


//to find multiple documents of a particular Name
router.post('/findmultiple', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("moverzFax");
    nodtst.collection("movers").find({
      moverName: req.body.moverName
    }).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
        console.log(post.moverName + ", " + post.moverDescription);
      }
      res.send(totalposts);
    });
  });
});


//to find multiple documents of a particular Name
router.post('/detailedSearchWithoutUSDOT', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("moverzFax");
    nodtst.collection("movers").find({
      moverMCNo:req.body.moverMCNo,
      moverState:req.body.moverState,
      moverCity:req.body.moverCity,
      moverZipCode:req.body.moverZipCode,
      moverCountry:req.body.moverCountry
    }).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
        console.log(post.moverName + ", " + post.moverDescription);
      }
      res.send(totalposts);
    });
  });
});

router.post('/detailedSearchWithoutMC', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("moverzFax");
    nodtst.collection("movers").find({
      moverUSDOTNo: req.body.moverUSDOTNo,
      moverState:req.body.moverState,
      moverCity:req.body.moverCity,
      moverZipCode:req.body.moverZipCode,
      moverCountry:req.body.moverCountry
    }).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
        console.log(post.moverName + ", " + post.moverDescription);
      }
      res.send(totalposts);
    });
  });
});

router.post('/detailedSearch', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("moverzFax");
    nodtst.collection("movers").find({

      moverState:req.body.moverState,
      moverCity:req.body.moverCity,
      moverZipCode:req.body.moverZipCode,
      moverCountry:req.body.moverCountry
    }).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
        console.log(post.moverName + ", " + post.moverDescription);
      }
      res.send(totalposts);
    });
  });
});

router.post('/detailedSearchWithBothNo', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("moverzFax");
    nodtst.collection("movers").find({
      moverMCNo:req.body.moverMCNo,
      moverUSDOTNo: req.body.moverUSDOTNo,
      moverState:req.body.moverState,
      moverCity:req.body.moverCity,
      moverZipCode:req.body.moverZipCode,
      moverCountry:req.body.moverCountry
    }).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
        console.log(post.moverName + ", " + post.moverDescription);
      }
      res.send(totalposts);
    });
  });
});

//to list all documents
router.get('/listAll', (req, res) => {
  mongoClient.connect(url, { useUnifiedTopology: true },function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("moverzFax");
    nodtst.collection("movers").find({}).toArray(function(err, totalmovers) {
      if (err) throw err;

      for (i = 0; i < totalmovers.length; i++) {
        let mover = totalmovers[i];
        console.log(mover.moverDescription + ", " + mover.moverDescription);
      }
      res.send(totalmovers);

      //console.log(result);
      databases.close();
    });
  });
});

module.exports = router;
