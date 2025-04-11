import React from 'react'
import CercleStatique from './CercleStatique'
import StateBloc from './StateBloc'
import Histogramme from './Histogramme'
import Calcul  from './Calcul'

export default function IncluDash() {
	return (
		<div className="flex flex-col gap-4">
			<StateBloc />
			<div className="flex flex-row gap-4 w-full">
				<Histogramme />
				<CercleStatique />
			</div>
			
		</div>
	)
}