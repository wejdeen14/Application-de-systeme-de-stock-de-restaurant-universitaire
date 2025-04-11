import React from 'react'
import CercleFacture from './CercleFacture'
import StateFi from './StateFi'
import Histogramme from '../ContenueDash/Histogramme'


export default function IncluDash() {
	return (
		<div className="flex flex-col gap-4">
			<StateFi />
			<div className="flex flex-row gap-4 w-full">
				<Histogramme />
				<CercleFacture />
			</div>
			
		</div>
	)
}