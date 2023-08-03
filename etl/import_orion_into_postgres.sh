#!/bin/bash
set -e

CURRENT_YEAR=${CURRENT_YEAR:-`date +"%Y"`}

source ../.env

rm -f *.ldf &> /dev/null
/opt/mssql/bin/sqlservr &

wget -q $ORION_SOURCE -O ORION.zip 
unzip -o ORION.zip

export SQLCMDPASSWORD=$SQL_SERVER_PASSWORD
while ! sqlcmd -H localhost -U sa -d master -Q "CREATE DATABASE mtorion ON ( FILENAME='/workspace/etl/Output.mdf') FOR ATTACH"; do
  echo "Waiting for sql server to become available..."
  sleep .5
done

sqlcmd -H localhost -U sa -d mtorion -Q "select PropertyID, TaxYear, GeoCode, QUOTENAME(Addr_Number, '\"'), QUOTENAME(Addr_PreDirectional, '\"'), QUOTENAME(Addr_Street, '\"'), QUOTENAME(Addr_RoadSuffix, '\"'), QUOTENAME(Addr_PostDirectional, '\"'), QUOTENAME(Addr_City, '\"'), QUOTENAME(Addr_State, '\"'), QUOTENAME(Addr_Zip, '\"'), QUOTENAME(Addr_UnitNumber, '\"'), QUOTENAME(Addr_UnitType, '\"'), QUOTENAME(PropType, '\"'), TotMarket_Acres, QUOTENAME(TimestampChange, '\"'), 0 as indistrict from Property WHERE TaxYear = ${CURRENT_YEAR}" -s "," -W -h-1 | tac | tail -n +3 > Property.csv
sqlcmd -H localhost -U sa -d mtorion -Q "select distinct partyid from Owner" -s "," -W -h-1 | tac | tail -n +3 > Parties.csv
sqlcmd -H localhost -U sa -d mtorion -Q "select PropertyID, TaxYear, PartyID, PercentOwnership, PrimaryOwner, InterestType, TimestampChange from Owner WHERE TaxYear = ${CURRENT_YEAR}" -s "," -W -h-1 | tac | tail -n +3 > Owners.csv
sqlcmd -H localhost -U sa -d mtorion -Q "select PartyNameID, PartyID, DefaultName, QUOTENAME(FullName, '\"'), NameType, NameType_Desc from PartyName" -s "," -W -h-1 | tac | tail -n +3 > PartyName.csv
sqlcmd -H localhost -U sa -d mtorion -Q "select PartyAddrID, PartyID, DefaultAddress, QUOTENAME(Address1, '\"'), QUOTENAME(Address2, '\"'), QUOTENAME(Address3, '\"'), QUOTENAME(Country, '\"'), PostalCode, City, State, ZIP from PartyAddr" -s "," -W -h-1 | tac | tail -n +3 > PartyAddr.csv

PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER $DB_NAME << EOF
BEGIN;
TRUNCATE orion_property CASCADE;
TRUNCATE orion_party CASCADE;
TRUNCATE orion_owner CASCADE;
TRUNCATE orion_partyname CASCADE;
TRUNCATE orion_partyaddr CASCADE;

\copy orion_property(PropertyID, TaxYear, GeoCode, Addr_Number, Addr_PreDirectional, Addr_Street, Addr_RoadSuffix, Addr_PostDirectional, Addr_City, Addr_State, Addr_Zip, Addr_UnitNumber, Addr_UnitType, PropType, TotMarket_Acres, lastupdated, indistrict) FROM 'Property.csv' WITH (FORMAT csv, NULL 'NULL');
\copy orion_party(id) FROM 'Parties.csv' WITH (FORMAT csv, NULL 'NULL');
\copy orion_owner(PropertyID, TaxYear, PartyID, PercentOwnership, PrimaryOwner, InterestType, TimestampChange) FROM 'Owners.csv' WITH (FORMAT csv, NULL 'NULL');``
\copy orion_partyname(PartyNameID, PartyID, DefaultName, FullName, NameType, NameType_Desc) FROM 'PartyName.csv' WITH (FORMAT csv, NULL 'NULL');
\copy orion_partyaddr(PartyAddrID, PartyID, DefaultAddress, Address1, Address2, Address3, Country, PostalCode, City, State, ZIP) FROM 'PartyAddr.csv' WITH (FORMAT csv, NULL 'NULL');

-- Because Django doesn't support composite foreign keys, we need to use the id from the property table as the foreign key in the owner table
update orion_owner o SET property_id = p.id from orion_property p WHERE  o.propertyid = p.propertyid and o.taxyear = p.taxyear;
COMMIT;
EOF
