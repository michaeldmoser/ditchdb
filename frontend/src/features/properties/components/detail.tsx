import { Link, useParams } from 'react-router-dom';
import { useGetPropertyQuery } from '../api';

export default function PropertyDetail() {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useGetPropertyQuery(id);

  return isError ? (
    <div>{error?.data?.detail}</div>
  ) : isLoading ? (
    <div>Loading...</div>
  ) : (
    <article>
      <h2 className="text-2xl">
        {data?.addr_number} {data?.addr_predirectional} {data?.addr_street}{' '}
        {data?.addr_roadsuffix} {data?.addr_postdirectional}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <section className="card bg-neutral text-neutral-content shadow m-2">
            <div className="card-body">
              <h4 className="card-title">Property Details</h4>
              <dl className="grid grid-cols-2 gap-2">
                <dt>Acres</dt>
                <dd>{data?.totmarket_acres?.toFixed(2)}</dd>
                <dt>Address</dt>
                <dd>
                  {data?.addr_number} {data?.addr_predirectional}{' '}
                  {data?.addr_street} {data?.addr_roadsuffix}{' '}
                  {data?.addr_postdirectional}
                  <br />
                  {data?.addr_city}, {data?.addr_state} {data?.addr_zip}
                </dd>
              </dl>
            </div>
          </section>
          <section className="card bg-neutral text-neutral-content shadow m-2">
            <div className="card-body">
              <h4 className="card-title">Property Owners</h4>
              <ul>
                {data?.owners?.map((owner, key) => (
                  <li key={key}>
                    <Link to={`/${owner.type}/${owner.id}`}>{owner.name} ({owner.type})</Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="card bg-neutral text-neutral-content shadow m-2">
            <div className="card-body">
              <h4 className="card-title">Assessments</h4>
              <dl className="grid grid-cols-2 gap-2">
                <dt>Yearly Assessment</dt>
                <dd>${45}</dd>
                <dt>Current Balance</dt>
                <dd>${450}</dd>
              </dl>
            </div>
          </section>
          <section className="card bg-neutral text-neutral-content shadow m-2">
            <div className="card-body">
              <h4 className="card-title">Addresses</h4>
              <dl className="grid grid-cols-2 gap-2">
                <dt>Mailing Address</dt>
                <dd>
                  {data?.addr_number} {data?.addr_predirectional}{' '}
                  {data?.addr_street} {data?.addr_roadsuffix}{' '}
                  {data?.addr_postdirectional}
                  <br />
                  {data?.addr_city}, {data?.addr_state} {data?.addr_zip}
                </dd>
                <dt>Billing Address</dt>
                <dd>
                  {data?.addr_number} {data?.addr_predirectional}{' '}
                  {data?.addr_street} {data?.addr_roadsuffix}{' '}
                  {data?.addr_postdirectional}
                  <br />
                  {data?.addr_city}, {data?.addr_state} {data?.addr_zip}
                </dd>
              </dl>
            </div>
          </section>
        </div>
        <section>
          <div>A mini map goes heres</div>
        </section>
      </div>
    </article>
  );
}
