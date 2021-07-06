export default interface Accessory {
    id: number;
    name: string;
    slug: string;
    type: string;
    price: string;
    stock_status: string; /* instock | outofstock */
}