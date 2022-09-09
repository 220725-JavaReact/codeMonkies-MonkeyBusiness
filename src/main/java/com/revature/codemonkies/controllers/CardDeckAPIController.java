package com.revature.codemonkies.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.revature.codemonkies.models.CardDeck;
import com.revature.codemonkies.models.Cards;

@RestController
@RequestMapping("/cardDeckAPI")
public class CardDeckAPIController {

    private String queryNewDeck = "https://www.deckofcardsapi.com/api/deck/new/";
	private RestTemplate restTemplate = new RestTemplate();
	private CardDeck playableCardDeck = new CardDeck();
	
	@GetMapping(value = "/freshDeck")
	public String getFreshDeckId() {
		
		this.playableCardDeck = restTemplate.getForObject(queryNewDeck, CardDeck.class);
		
		String deckId = this.playableCardDeck.getDeck_id();
		String queryShuffleDeckById = "https://www.deckofcardsapi.com/api/deck/" + deckId + "/shuffle/";
		this.playableCardDeck = restTemplate.getForObject(queryShuffleDeckById, CardDeck.class);
		
		return "Fresh new shuffled deck, id: " + deckId;
	}
	
	@PostMapping(value = "/reshuffleDeck")
	public String postReshuffleDeck(@RequestParam String deckId) {
		
		String queryShuffleDeckById = "https://www.deckofcardsapi.com/api/deck/" + deckId + "/shuffle/";
		this.playableCardDeck = restTemplate.getForObject(queryShuffleDeckById, CardDeck.class);
		
		return "Deck: " + this.playableCardDeck.getDeck_id() + " is now reshuffled!";
	}
	
	@PostMapping(value = "/drawCard")
	public List<Cards> postDrawCard(@RequestParam String deckId, @RequestParam Integer drawCount) {
		
		String queryShuffleDeckById = "https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=" + drawCount;
		CardDeck cardDeck = restTemplate.getForObject(queryShuffleDeckById, CardDeck.class);
		List<Cards> cards = cardDeck.getCards();
		
		return cards;
	}
	
	@PostMapping(value = "/drawOneCard")
	public List<Cards> postDrawOneCard(@RequestParam String deckId) {
		
		String queryShuffleDeckById = "https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1";
		CardDeck cardDeck = restTemplate.getForObject(queryShuffleDeckById, CardDeck.class);
		List<Cards> card = cardDeck.getCards();
		
		return card;
	}
	
	@PostMapping(value = "/drawTwoCards")
	public List<Cards> postDrawTwoCard(@RequestParam String deckId) {
		
		String queryShuffleDeckById = "https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2";
		CardDeck cardDeck = restTemplate.getForObject(queryShuffleDeckById, CardDeck.class);
		
		List<Cards> cards = cardDeck.getCards();
		
		return cards;
	}
    
}
