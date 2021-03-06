const DrawCard = require('../../../drawcard.js');

class NewlyMadeLord extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardEntersPlay: (e, card) => card === this
            },
            handler: () => {
                this.game.promptForSelect(this.controller, {
                    cardCondition: card => this.cardCondition(card),
                    activePromptTitle: 'Select location',
                    waitingPromptTitle: 'Waiting for opponent to use ' + this.name,
                    onSelect: (player, card) => this.onCardSelected(player, card)
                });
            }
        });
    }

    cardCondition(card) {
        return !card.kneeled && card.getType() === 'location' && !card.isLimited() && card.getCost() <= 3;
    }

    onCardSelected(player, card) {
        card.controller.discardCard(card);

        this.game.addMessage('{0} uses {1} to discard {2}', player, this, card);

        return true;
    }
}

NewlyMadeLord.code = '02051';

module.exports = NewlyMadeLord;
