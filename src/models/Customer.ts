export default interface Customer {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    billing: {
        first_name: string,
        last_name: string,
        address_1: string,
        city: string,
        postcode: string,
        phone: string
    }
}