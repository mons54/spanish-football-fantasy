module.exports = function (mongoose) {
    return {
        competitions: new mongoose.Schema({
            dbid: {
                type: Number,
                unique: true
            },
            name: String
        }),
        teams: new mongoose.Schema({
            dbid: {
                type: Number,
                unique: true
            },
            name: String,
            defaultHomeVenue: Object,
            shirtUrl: String,
            shortName: String,
            shortCode: String,
            players: Array
        }),
        players: new mongoose.Schema({
            dbid: {
                type: Number,
                unique: true
            },
            position: String,
            shortName: String,
            name: String,
            team: Number
        })
    };
};
