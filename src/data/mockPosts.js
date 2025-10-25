import sampleMakeup from "../assets/sampleMakeup.jpg";
import sampleCrochet from "../assets/samplecrochet.jpg";
import sampleClothes from "../assets/shirt.jpg";
import sampleShoes from "../assets/shoes.jpg";
export const mockPosts = [
  {
    id: 1,
    authorUsername: "sample Makeup Store",
    timestamp: new Date().toISOString(),
    caption: "Check out this awesome makeup kit!",
    image: "/assets/sampleMakeup.jpg",
    likes: [],
    comments: [],
    price: 100,
  },
  {
    id: 2,
    authorUsername: "hana crochet",
    timestamp: new Date().toISOString(),
    caption: "I do crochet and have it in hand. Order via cart!",
    image: "/assets/samplecrochet.jpg",
    likes: [],
    comments: [],
    price: 200,
  },
  {
    id: 3,
    authorUsername: "lemlem clothes",
    timestamp: new Date().toISOString(),
    caption: "instock!",
    image: "/assets/shirt.jpg",
    likes: [],
    comments: [],
    price: 600,
  },
  {
    id: 4,
    authorUsername: "lemlem clothes",
    timestamp: new Date().toISOString(),
    caption: "we are having a hugeeeee sale buy now!",
    image: "/assets/shoes.jpg",
    likes: [],
    comments: [],
    price: 2500,
  },
];
