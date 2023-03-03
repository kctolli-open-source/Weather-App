import type { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Page } from "~/components/Page";
import type { Unit } from "~/weatherapi";
import { getTempByZipCode, enumLabels } from "~/weatherapi";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const zipcode = url.searchParams.get("zipcode") ?? "";
  const country = url.searchParams.get("countryCode") || "US";
  const unit = (url.searchParams.get("unit") ?? "metric") as Unit;

  if (!zipcode) return { temp: null, description: null };

  return getTempByZipCode(zipcode, country, unit);
}

export default function Index() {
  const { temp, description, city } = useLoaderData<typeof loader>();

  return (
    <Page>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        {temp && <div>temp: {temp}°</div>}
        {description && <div>description: {description}</div>}
        {city && <div>city: {city}</div>}
        <Form method="get" action=".">
          <label>
            Enter zipcode:{" "}
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              placeholder="zipcode"
            />
          </label>
          <br />
          <label>
            Enter country code:{" "}
            <input
              type="text"
              name="countryCode"
              id="countryCode"
              placeholder="US"
            />
          </label>
          <br />
          <label>
            Unit:{" "}
            <select name="unit">
              {Object.entries(enumLabels).map(([key, value]) => (
                <option value={key} key={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">Get Temp</button>
        </Form>
      </div>
    </Page>
  );
}
