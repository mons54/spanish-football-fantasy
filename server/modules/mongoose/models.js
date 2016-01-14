module.exports = function (mongoose) {
    return {
        competitions: mongoose.model('competitions', mongoose.collections.competitions),
        teams: mongoose.model('teams', mongoose.collections.teams),
        matches: mongoose.model('matches', new mongoose.Schema({})),
        players: mongoose.model('players', new mongoose.Schema({})),
        rankings: mongoose.model('rankings', new mongoose.Schema({})),
    };
};
