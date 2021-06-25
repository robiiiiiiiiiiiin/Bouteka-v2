import BasketAttrOption from './BasketAttrOption'

export default interface BasketAttr {
    id: number;
    name: string;
    variation?: boolean;
    options?: Array<string>;
    option?: string;
    isVariable?: boolean;
    processed_options: Array<BasketAttrOption>;
    position?: number;
    visible?: boolean;
    price?: string;
}