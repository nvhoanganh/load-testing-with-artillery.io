const chance = require('chance').Chance();

function generateRandomData(userContext, events, done) {
	userContext.vars = {
		...userContext.vars,
		noteDate: chance.date().toISOString(),
		title: chance.sentence(),
		deviceLatitude: chance.latitude(),
		deviceLongitude: chance.longitude(),
		declaredStart: chance.timestamp(),
		declaredLatitude: chance.latitude(),
		declaredLongitude: chance.longitude(),
		body: chance.paragraph(),
		isPrivate: chance.bool(),
		isQuick: chance.bool(),
		declaredLocation: chance.word(),
		protectiveMarkingId: chance.pickone([0, 1, 2, 3, 4]),
		informationManagementMarkerId: chance.pickone([0, 1, 2, 3, 4]),
		keywords: chance.pickset(['A', 'B', 'C'], 2),
		deviceLocation: chance.word(),
	};

	// continue with executing the scenario:
	return done();
}

module.exports = {
	generateRandomData,
};
