package com.revature.codemonkies.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.revature.codemonkies.models.CardDeck;

@RestController
@RequestMapping("/cardDeckAPI")
public class CardDeckAPIController {

    private String queryNewDeck = "https://www.deckofcardsapi.com/api/deck/new/";
	private RestTemplate restTemplate = new RestTemplate();
	
	@GetMapping(value = "/newDeckID")
	public String getNewDeckId() {
		
		CardDeck cardDeck = restTemplate.getForObject(queryNewDeck, CardDeck.class);
		
		return cardDeck.getDeck_id();
	}
	
	@GetMapping(value = "/newDeck")
	public CardDeck getNewDeck() {
		
		CardDeck cardDeck = restTemplate.getForObject(queryNewDeck, CardDeck.class);
		
		return cardDeck;
	}
	
	@GetMapping(value = "/freshDeckID")
	public String getFreshDeckId() {
		
		CardDeck cardDeck = restTemplate.getForObject(queryNewDeck, CardDeck.class);
		
		String deckId = cardDeck.getDeck_id();
		String queryShuffleDeckById = "https://www.deckofcardsapi.com/api/deck/" + deckId + "/shuffle/";
		cardDeck = restTemplate.getForObject(queryShuffleDeckById, CardDeck.class);
		
		return "Fresh new shuffled deck, id: " + cardDeck.getDeck_id();
	}
	
	@PostMapping(value = "/reshuffleDeck")
	public String postReshuffleDeck(@RequestParam String deckId) {
		
		String queryShuffleDeckById = "https://www.deckofcardsapi.com/api/deck/" + deckId + "/shuffle/";
		CardDeck cardDeck = restTemplate.getForObject(queryShuffleDeckById, CardDeck.class);
		
		return "Deck: " + cardDeck.getDeck_id() + " is now reshuffled!";
	}
	
	@PostMapping(value = "/drawCard")
	public CardDeck postDrawCard(@RequestParam String deckId, @RequestParam Integer drawCount) {
		
		String queryShuffleDeckById = "https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=" + drawCount;
		CardDeck cardDeck = restTemplate.getForObject(queryShuffleDeckById, CardDeck.class);
		
		return cardDeck;
	}
	
	@PostMapping(value = "/drawOneCard")
	public CardDeck postDrawOneCard(@RequestParam String deckId) {
		
		String queryShuffleDeckById = "https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1";
		CardDeck cardDeck = restTemplate.getForObject(queryShuffleDeckById, CardDeck.class);
		
		return cardDeck;
	}
    
}
