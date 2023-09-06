export interface Property {
  id: number;
  geocode?: string | null;
  addr_number?: string | null;
  addr_predirectional?: string | null;
  addr_street?: string | null;
  addr_roadsuffix?: string | null;
  addr_postdirectional?: string | null;
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

export interface PropertyOwner {
  id?: number;
  defaultname?: boolean;
  fullname?: string | null;
  nametype?: number | null;
  nametype_desc?: string | null;
}

export interface PropertyAddress {
  id?: number;
  defaultaddress?: boolean;
  address1?: string | null;
  address3?: string | null;
  country?: string | null;
  postalcode?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
}

export interface PropertyBilling {
  address_to_line?: string | null;
  attention_to_line?: string | null;
  street_address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  current_balance?: number | null;
}
