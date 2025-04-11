import React from 'react'
import StateMag from '../DashMag/StateMag'
import CercleStatique from '../ContenueDash/CercleStatique'
import Histogramme from '../ContenueDash/Histogramme'

export default function IncluDash() {
	return (
		<div className="flex flex-col gap-4">
			<StateMag />
			<div className="flex flex-row gap-4 w-full">
				<Histogramme />
				<CercleStatique />
			</div>
			
		</div>
	)
}