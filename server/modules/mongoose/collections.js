module.exports = function (mongoose) {
    return {
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
        }),
        matches: new mongoose.Schema({
            dbid: {
                type: Number,
                unique: true
            },
            matchevents: Array,
            awayGoals: Number,
            start: Number,
            homeGoals: Number,
            season: Object,
            homeTeam: Object,
            awayPlayers: Array,
            dismissals: Object,
            isResult: Boolean,
            venue: Object,
            awayTeam: Object,
            homePlayers: Array,
            outcome: Object,
            round: Object,
            currentState: Number
        })
    };
};
