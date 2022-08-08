import { getTimeZones } from "@vvo/tzdb";
import { utcToZonedTime, format } from "date-fns-tz";

// NOTE: If you're looking to used the typed event
// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
export const main = () => {
  const country = "France";

  const timeZone = getTimeZones().find((timeZone) => timeZone.countryName === country);

  return timeZone
    ? (() => {
        const zonedDate = utcToZonedTime(new Date(), timeZone.name);
        const pattern = "dd-MM-yyyy HH:mm:ss.SSS 'GMT' XXX (z)";
        const output = format(zonedDate, pattern, { timeZone: timeZone.name });

        return {
          statusCode: 200,
          headers: { "Content-Type": "text/json" },
          body: JSON.stringify({ time: output }),
        };
      })()
    : {
        statusCode: 400,
        headers: { "Content-Type": "text/json" },
        body: JSON.stringify({ message: "Timezone not found for this country!" }),
      };
};
