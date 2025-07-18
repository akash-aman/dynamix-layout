'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { LayoutProps } from '@dynamix-layout/react'
import { tabs } from './comp'
import '@dynamix-layout/react/style.css'

const DynamixLayout = dynamic(
	async () => {
		const { DynamixLayout } = await import('@dynamix-layout/react')
		return {
			default: (props: LayoutProps) => (
				<DynamixLayout {...props} tabs={tabs} />
			),
		}
	},
	{ ssr: false, loading: () => <div>Loading...</div> }
)

export default function Home() {
	return (
		<>
			<DynamixLayout
				updateJSON={layoutTree => console.log(layoutTree)}
				style={{ height: '100vh', width: '100vw' }}
				tabs={tabs}
			/>
		</>
	)
}
