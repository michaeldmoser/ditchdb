interface Billing {
    id?: number;
    address_to_line?: string | null;
    attention_to_line?: string | null;
    street_address?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    current_balance?: number;
}

interface MailingAddress {
    id?: number;
    defaultaddress?: boolean;
    address1?: string | null;
    address2?: string | null;
    address3?: string | null;
    country?: string | null;
    postalcode?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
}

interface Organization {
    id?: number;
    name: string;
    phone?: string | null;
    notes?: string | null;
}

interface Owner {
    id?: number;
    defaultname?: boolean;
    fullname?: string | null;
    nametype?: number | null;
    nametype_desc?: string | null;
}

interface Person {
    id?: number;
    name?: any;
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    phone?: string | null;
    alternate_phone?: string | null;
    notes?: string | null;
}

interface Property {
    id: number;
    geocode?: string | null;
    address?: string | null;
    addr_city?: string | null;
    addr_state?: string | null;
    addr_zip?: string | null;
    addr_unitnumber?: string | null;
    addr_unittype?: string | null;
    proptype?: string | null;
    totmarket_acres?: number | null;
    propcategory?: string | null;
    propsubcategory?: string | null;
    propsubcategory_desc?: string | null;
}

