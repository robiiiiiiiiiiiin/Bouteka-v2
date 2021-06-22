import BasketAttr from "./BasketAttr";

export default interface Basket {
    id: number;
    name: string;
    price: string;
    attributes: Array<BasketAttr>;
    parsed_short_description: string;
}