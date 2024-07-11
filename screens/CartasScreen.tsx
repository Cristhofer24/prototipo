import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import backImage from '../assets/back.png';

const totalCards = 12;
const availableCards: string[] = ['A', 'K', 'Q', 'J'];

interface Card {
  id: number;
  value: string;
  isActive: boolean;
  isMatched: boolean;
}

const CartasScreen = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [valuesUsed, setValuesUsed] = useState<number[]>([]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [currentAttempts, setCurrentAttempts] = useState<number>(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    let initialCards: Card[] = [];

    for (let i = 0; i < totalCards; i++) {
      initialCards.push({
        id: i,
        value: getFaceValue(randomValue()),
        isActive: false,
        isMatched: false,
      });
    }

    setCards(initialCards);
  };

  const activate = (id: number) => {
    if (currentMove < 2) {
      const updatedCards = cards.map((card) => {
        if (card.id === id && !card.isActive && !card.isMatched) {
          card.isActive = true;
          const newSelectedCards = [...selectedCards, card];
          setSelectedCards(newSelectedCards);
          setCurrentMove(currentMove + 1);

          if (newSelectedCards.length === 2) {
            setCurrentAttempts(currentAttempts + 1);

            if (newSelectedCards[0].value === newSelectedCards[1].value) {
              console.log("bbbbbbbbbbbbbbbb");
              
              if (updatedCards && Array.isArray(updatedCards)) {
                const matchedCards = updatedCards.map(c => {
                  console.log("aaaaaaaaaaaaaaaaa");
                  if (c.id === newSelectedCards[0].id || c.id === newSelectedCards[1].id) {
                    c.isMatched = true;
                  }
                  return c;
                });
                setCards(matchedCards);
              } else {
                console.error("updatedCards is not defined or not an array");
              }
              
              setSelectedCards([]);
              setCurrentMove(0);
            } else {
              setTimeout(() => {
                const resetCards = updatedCards.map(c => {
                  if (!c.isMatched) {
                    c.isActive = false;
                  }
                  return c;
                });
                setSelectedCards([]);
                setCurrentMove(0);
                setCards(resetCards);
              }, 1000);
            }
          }
        }
        return card;
      });

      setCards(updatedCards);
    }
  };

  const randomValue = () => {
    let rnd = Math.floor(Math.random() * (totalCards * 0.5));
    let values = valuesUsed.filter((value) => value === rnd);
    if (values.length < 2) {
      setValuesUsed([...valuesUsed, rnd]);
      return rnd;
    } else {
      return randomValue();
    }
  };

  const getFaceValue = (value: number): string => {
    return availableCards[value < availableCards.length ? value : 0];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stats}>{currentAttempts} intentos</Text>
      <View style={styles.game}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={() => activate(card.id)}
          >
            <View style={[styles.cardInner, card.isActive && styles.cardActive]}>
              <View style={[styles.cardFace, card.isActive && styles.cardFaceActive]}>
                <Text style={styles.cardText}>{card.value}</Text>
              </View>
              {!card.isActive && <Image source={backImage} style={styles.cardBack} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    color: 'white',
    fontSize: 25,
    marginBottom: 20,
  },
  game: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 120,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05d1fe',
    backfaceVisibility: 'hidden',
  },
  cardActive: {
    transform: [{ rotateY: '180deg' }],
  },
  cardInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardFace: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05d1fe',
    borderRadius: 10,
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  cardFaceActive: {
    zIndex: 1,
  },
  cardBack: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'lightgray',
    borderWidth: 3,
    borderColor: '#05d1fe',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 24,
    color: 'black',
  },
});

export default CartasScreen;
