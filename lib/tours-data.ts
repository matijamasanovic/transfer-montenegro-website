export type TourStop = {
  name: string;
  desc: string;
};

export type Tour = {
  id: string;
  price: number;
  duration: string;
  image: string;
};

export const TOURS: Tour[] = [
  {
    id: "kotor-perast-tivat",
    price: 200,
    duration: "8h",
    image:
      "https://images.unsplash.com/photo-1614122027743-50a9e6e8002f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "biogradska-gora",
    price: 180,
    duration: "8h",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  },
  {
    id: "durmitor-tara",
    price: 200,
    duration: "10h",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  },
  {
    id: "lipa-rijeka-pavlova",
    price: 180,
    duration: "8h",
    image:
      "https://lipa-cave.me/wp-content/uploads/2024/12/lipa-cave-entrance.jpg",
  },
  {
    id: "budva-sveti-stefan-virpazar",
    price: 180,
    duration: "9h",
    image:
      "https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=800&q=80",
  },
];
