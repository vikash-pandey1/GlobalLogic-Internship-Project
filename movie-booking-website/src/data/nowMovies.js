 import theArrivalPoster from '../assets/the-arrival.jpeg';
 import uriPoster from '../assets/uri.jpg'
 import shershahPoster from '../assets/shershah.jpeg'
 import idiotPoster from '../assets/idiot.jpeg'
 import chhaavaPoster from '../assets/chhaava.jpeg'
 import animalPoster from '../assets/animal.jpeg'
const movies = [
  {
    id: 1,
    title: "The Arrival",
    genre: ["Sci-Fi", "Drama"],
    rating: 4.7,
    duration: "2h 15m",
    poster: theArrivalPoster, 
    price: 12,
    type: "now-playing",
  },
  {
    id: 2,
    title: "Uri",
    genre: ["Thriller", "Action"],
    rating: 3.9,
    duration: "2h 6m",
    poster: uriPoster,
    price: 10,
    type: "now-playing",
  },
  {
    id: 3,
    title: "Shershah",
    genre: ["Action", "War"],
    rating: 4.5,
    duration: "2h 30m",
    poster: shershahPoster,
    price: 15,
    type: "now-playing",
  },
  {
    id: 4,
    title: "3 Idiot",
    genre: ["Drama", "Comedy"],
    rating: 4.5,
    duration: "2h",
    poster: idiotPoster,
    price: 9,
    type: "now-playing",
  },
  {
    id: 5,
    title: "Chhaava",
    genre: ["War", "Biopic"],
    rating: 4.5,
    duration: "2h",
    poster: chhaavaPoster,
    price: 9,
    type: "now-playing",
  },
  {
    id: 6,
    title: "Animal",
    genre: ["Romance", "Action"],
    rating: 4.5,
    duration: "2h",
    poster: animalPoster,
    price: 9,
    type: "now-playing",
  },
];

export default movies;
