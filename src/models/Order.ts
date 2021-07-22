export default interface Order {
    id: number;
    order_key: string;
    billing: object;
    shipping: object;
    line_items: object[];
    shipping_lines: object[];
}