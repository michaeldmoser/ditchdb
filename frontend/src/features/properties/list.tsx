import { useGetPropertiesQuery } from './api';

function ListItem({ property }: { property: Property }) {
  return (
    <li className="flex justify-between gap-x-2 border-b border-base-content border-solid">
      <a href="" className="hover:text-base-100 hover:bg-base-content p-2 grow">
        {property.addr_number} {property.addr_predirectional}{' '}
        {property.addr_street} {property.addr_roadsuffix}{' '}
        {property.addr_postdirectional}
      </a>
    </li>
  );
}

export default function List() {
  const { data, isLoading } = useGetPropertiesQuery();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <section>
      <ul aria-labelledby="properties-title">
        {data?.results?.map((property: Property, key) => (
          <ListItem key={key} property={property} />
        ))}
      </ul>
    </section>
  );
}
