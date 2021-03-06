const DrawCard = require('../../../drawcard.js');

class TheWall extends DrawCard {
    setupCardAbilities(ability) {
        this.forcedReaction({
            when: {
                onUnopposedWin: (e, challenge) => this.controller !== challenge.winner && !this.kneeled
            },
            handler: () => {
                this.game.addMessage('{0} is forced to kneel {1} because they lost an unopposed challenge', this.controller, this);
                this.controller.kneelCard(this);
            }
        });
        this.interrupt({
            when: {
                onPhaseEnded: (e, phase) => phase === 'challenge' && !this.kneeled
            },
            handler: () => {
                this.controller.kneelCard(this);
                this.game.addPower(this.controller, 2);
                this.game.addMessage('{0} kneels {1} to gain 2 power for their faction', this.controller, this);
            }
        });
        this.persistentEffect({
            match: (card) => this.getFaction() === card.getFaction() && card.getType() === 'character',
            effect: ability.effects.modifyStrength(1)
        });
    }
}

TheWall.code = '01137';

module.exports = TheWall;
