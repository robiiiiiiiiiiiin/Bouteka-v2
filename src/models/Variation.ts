import BasketAttr from "./BasketAttr";

export default interface Variation {
    id: number;
    name: string;
    price: string;
    attributes: Array<BasketAttr>;
}