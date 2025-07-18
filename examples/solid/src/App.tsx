import { tabs } from './comp'
import { DynamixLayout } from '@dynamix-layout/solid'
import '@dynamix-layout/solid/style.css'
import './App.css'

function App() {
	return (
		<>
			<DynamixLayout
				updateJSON={layoutTree => console.log(layoutTree)}
				tabs={tabs}
				pad={{ t: 0, b: 0, l: 0, r: 0 }}
				tabHeadHeight={40}
				bondWidth={10}
				minTabHeight={40}
				minTabWidth={100}
			/>
		</>
	)
}

export default App
