export type pizzaDataType = {
    name: string;
    ingredients: string;
    price: Number;
    photoName: string;
    soldOut: Boolean
}
export const pizzaData: pizzaDataType[] = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "https://th.bing.com/th/id/OIP.q5OEAidYyDlzb5iDlkj2NwHaE8?w=295&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "https://th.bing.com/th/id/OIP.Ct04r0akZsrq4kJxbe_MBwHaE8?w=304&h=203&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "https://th.bing.com/th/id/OIP.TaSOJdUTxn0NSuEtYbNxSgHaFj?w=214&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "https://th.bing.com/th/id/OIP.k7ka8gCwKec_Ny9s0NBQugHaFB?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "https://th.bing.com/th/id/OIP.pYYGIDWR00Ef0fMTLc3ztwHaHa?w=184&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "https://th.bing.com/th/id/OIP.nS1T4ySsFstKgLZiKcwTGwHaGl?w=213&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        soldOut: false,
    },
];