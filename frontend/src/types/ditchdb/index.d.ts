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
