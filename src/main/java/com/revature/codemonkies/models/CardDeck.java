package com.revature.codemonkies.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CardDeck {
	
	private String deck_id;
    private int remaining;
    private boolean shuffled;
    List<Cards> cards;
    
	public CardDeck() {}

    public String getDeck_id() {
        return deck_id;
    }
    public void setDeck_id(String deck_id) {
        this.deck_id = deck_id;
    }
    public int getRemaining() {
        return remaining;
    }
    public void setRemaining(int remaining) {
        this.remaining = remaining;
    }
    public boolean isShuffled() {
        return shuffled;
    }
    public void setShuffled(boolean shuffled) {
        this.shuffled = shuffled;
    }
    public List<Cards> getCards() {
		return cards;
	}
	public void setCards(List<Cards> cards) {
		this.cards = cards;
	}
	
	@Override
	public String toString() {
		if(this.cards != null) {
			return "CardDeck [deck_id=" + deck_id + ", remaining=" + remaining + ", shuffled=" + shuffled + ", cards="
					+ cards + "]";
		}else {
			return "CardDeck [deck_id=" + deck_id + ", remaining=" + remaining + ", shuffled=" + shuffled + "]";
		}
	}

}
