import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Maximize2 } from 'lucide-react'

const DemoSection = () => {
	return (
		<section className="py-20 px-6">
			<div className="max-w-7xl mx-auto">
				{/* Section Header */}
				<div className="text-center mb-16">
					<Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
						Interactive Demo
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Experience the Power
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Try the full-featured demo with draggable tabs,
						resizable panels, and dynamic splits. See how easy it is
						to create VS Code-like interfaces.
					</p>
				</div>

				{/* Demo Container */}
				<Card className="relative bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden shadow-card">
					{/* Demo Header */}
					<div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/30">
						<div className="flex items-center gap-3">
							<div className="flex gap-2">
								<div className="w-3 h-3 rounded-full bg-red-500/80" />
								<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
								<div className="w-3 h-3 rounded-full bg-green-500/80" />
							</div>
							<span className="text-sm font-medium">
								Dynamix Layout Demo
							</span>
						</div>

						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="sm"
								className="hover:bg-primary/10"
								onClick={() =>
									window.open(
										'https://dx.xcode.cx',
										'_blank'
									)
								}
							>
								<Maximize2 className="w-4 h-4 mr-2" />
								Open in New Tab
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="hover:bg-primary/10"
								onClick={() =>
									window.open(
										'https://dx.xcode.cx',
										'_blank'
									)
								}
							>
								<ExternalLink className="w-4 h-4" />
							</Button>
						</div>
					</div>

					{/* Iframe Container */}
					<div className="relative">
						<iframe
							src="https://dx.xcode.cx"
							className="w-full h-[600px] md:h-[700px] lg:h-[800px] border-0"
							title="Dynamix Layout Demo"
							loading="lazy"
							sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
						/>

						{/* Loading overlay */}
						<div
							className="absolute inset-0 bg-muted/20 backdrop-blur-sm flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300"
							id="demo-loading"
						>
							<div className="text-center">
								<div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
								<p className="text-sm text-muted-foreground">
									Loading demo...
								</p>
							</div>
						</div>
					</div>
				</Card>

				{/* Demo Features */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
					<Card className="feature-card text-center">
						<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
							<span className="text-xl">🎯</span>
						</div>
						<h3 className="font-semibold mb-2">Drag & Drop</h3>
						<p className="text-sm text-muted-foreground">
							Drag tabs to rearrange or create new panel splits
						</p>
					</Card>

					<Card className="feature-card text-center">
						<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
							<span className="text-xl">📏</span>
						</div>
						<h3 className="font-semibold mb-2">Resizable</h3>
						<p className="text-sm text-muted-foreground">
							Click and drag between panels to resize them
						</p>
					</Card>

					<Card className="feature-card text-center">
						<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
							<span className="text-xl">💾</span>
						</div>
						<h3 className="font-semibold mb-2">Save & Restore</h3>
						<p className="text-sm text-muted-foreground">
							Serialize layout state to JSON and restore later
						</p>
					</Card>
				</div>
			</div>
		</section>
	)
}

export default DemoSection
