import { CountryType } from "../Exports"
import styles from "./country.module.css"

type ExportedProps = {
	country: CountryType
}

export default function Country(props: ExportedProps): JSX.Element {
	let stuff = props.country
	return (
		<>
			<div className={styles.countryCard}>
				<span className={styles.countryName}>
					<p>{stuff.countryName}</p>
					<p className={styles.countryCode}>({stuff.countryCode})</p>
				</span>
				<p>
					{stuff.currentPrice} {stuff.currency}
				</p>
				<p className={styles.lastUpdated}>
					{"Last Updated: "}
					{new Date(stuff.goldLastUpdated).toLocaleString("en-US", {
						timeZone: "UTC",
						dateStyle: "medium",
						timeStyle: "medium",
					})}
				</p>
				<p className={styles.percentageIncrease}>
					{stuff.priceChangePercentage.toFixed(2)}
					{"%"}
				</p>
			</div>
		</>
	)
}
