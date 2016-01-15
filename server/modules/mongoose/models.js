module.exports = function (mongoose) {
    return {
        teams: mongoose.model('teams', mongoose.collections.teams),
        matches: mongoose.model('matches', new mongoose.Schema({})),
        players: mongoose.model('players', mongoose.collections.players),
        rankings: mongoose.model('rankings', new mongoose.Schema({})),
    };
};
