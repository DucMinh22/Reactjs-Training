export const ENDPOINT = "https://5c6521b719df280014b6267d.mockapi.io/api";
export const GET_PRODUCTS_API = "/products";
export const GET_CATEGORIES_API = "/categories";
export const GET_BILL_API = "/bills";

export const MENU = [
    {
        id: 1,
        name: "home",
        to: "/",
        exact: true,
        isAdmin: true,
        isHome: true,
    },
    {
        id: 2,
        name: "category",
        to: "/category",
        exact: false,
        isAdmin: false,
        isHome: true,
    },
    {
        id: 3,
        name: "cart",
        to: "/cart",
        exact: false,
        isAdmin: false,
        isHome: true,
    },
    {
        id: 4,
        name: "warehouse",
        to: "/warehouse",
        exact: false,
        isAdmin: true,
        isHome: false,
    },
    {
        id: 5,
        name: "login",
        to: "#",
        exact: false,
        isAdmin: true,
        isHome: true,
    },
];
