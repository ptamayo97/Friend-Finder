// Load Data
// =============================================================

var friendsData = require("../data/friends.js");


// Routing
// =============================================================

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        var newFriend = req.body;
        var bestFriend = {
            name: "",
            photo: "",
            friendDiff: 10000
        };
        for (var i = 0; i<friendsData.length; i++){
            console.log(friendsData[i].name);
            var totalDiff = 0;
            for (var j = 0; j<friendsData[i].scores[j]; j++){
                var friendScores = newFriend.scores;
                totalDiff += Math.abs(parseInt(friendScores[j])-parseInt(friendsData[i].scores[j]));
                if(totalDiff <= bestFriend.friendDiff){
                    bestFriend.name = friendsData[i].name;
                    bestFriend.photo = friendsData[i].photo;
                    bestFriend.friendDiff = totalDiff;
                };
            };
        };
        friendsData.push(newFriend);

        res.json(bestFriend);
    });

};

