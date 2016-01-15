module.exports = function (mongoose) {
    return {
        teams: mongoose.model('teams', mongoose.collections.teams),
        matches: mongoose.model('matches', mongoose.collections.matches),
        players: mongoose.model('players', mongoose.collections.players),
        rankings: mongoose.model('rankings', new mongoose.Schema({})),
    };
};
