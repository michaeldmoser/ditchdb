import { useGetPropertiesQuery } from "../api";
import { Link } from "react-router-dom";

export default function PropertiesSearch() {
  return <List />;
}

function ListItem({ property }: { property: Property }) {
  return (
    <li className="flex justify-between gap-x-2 border-b border-base-content border-solid">
      <Link to={property.id?.toString()} className="link link-hover p-2 grow">
        {property.address}
      </Link>
    </li>
  );
}

function List() {
  const { data, isLoading } = useGetPropertiesQuery();

  return isLoading ? <div>Loading...</div> : (
    <section>
      <h2 id="properties-title" className="text-2xl mb-2">Properties</h2>
      <ul
        aria-labelledby="properties-title"
        className="bg-neutral text-neutral-content"
      >
        {data?.results?.map((property, key) => (
          <ListItem key={key} property={property} />
        ))}
      </ul>
    </section>
  );
}
