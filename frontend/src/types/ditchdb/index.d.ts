interface Contact {
  id?: number;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  alternate_phone?: string | null;
  notes?: string | null;
}

interface Organization {
  id?: number;
  name: string;
  phone?: string | null;
  notes?: string | null;
}

interface Property {
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
