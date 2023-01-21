import { CountryType } from "./Exports"

type ExportedProps = {
	country: CountryType
}

export default function Country(props: ExportedProps): JSX.Element {
	let stuff = props.country
	return (
		<>
			<div
				style={{
					border: "1px solid black",
					borderRadius: "12px",
					margin: "1rem",
					padding: "1rem",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<p>{stuff.countryCode}</p>
				<p>{stuff.countryName}</p>
				<p>{stuff.currency}</p>
				<p>{stuff.currencyConversionRate}</p>
				<p>{stuff.currentPrice}</p>
				<p>
					{new Date(stuff.goldLastUpdated).toLocaleString("en-US", {
						timeZone: "UTC",
						dateStyle: "medium",
						timeStyle: "medium",
					})}
				</p>
				<p>{stuff.previousPrice}</p>
				<p>{stuff.priceChange}</p>
				<p>{stuff.priceChangePercentage}</p>
				<p>
					{new Date(stuff.updatedAt).toLocaleString("en-US", {
						timeZone: "UTC",
						dateStyle: "medium",
						timeStyle: "medium",
					})}
				</p>
			</div>
		</>
	)
}
