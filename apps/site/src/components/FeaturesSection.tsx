import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
	MousePointer2,
	Move3d,
	Split,
	Save,
	Layers,
	Code,
	Zap,
	Shield,
	Palette,
	Cpu,
	GitBranch,
	Sparkles,
} from 'lucide-react'

const features = [
	{
		icon: MousePointer2,
		title: 'Draggable Tabs',
		description:
			'Easily drag and drop tabs to rearrange them or create new panel splits with intuitive visual feedback.',
		gradient: 'from-blue-500 to-cyan-500',
	},
	{
		icon: Move3d,
		title: 'Resizable Panels',
		description:
			'Users can click and drag the space between panels to resize them dynamically with smooth animations.',
		gradient: 'from-purple-500 to-pink-500',
	},
	{
		icon: Split,
		title: 'Dynamic Splits',
		description:
			'Split any panel horizontally or vertically by dropping a tab onto its edge with real-time preview.',
		gradient: 'from-green-500 to-emerald-500',
	},
	{
		icon: Save,
		title: 'Save & Restore',
		description:
			'Serialize the entire layout state to JSON and restore it later, perfect for user preferences.',
		gradient: 'from-orange-500 to-red-500',
	},
	{
		icon: Code,
		title: 'Framework-Agnostic Core',
		description:
			'The core logic is written in pure TypeScript with zero dependencies for maximum flexibility.',
		gradient: 'from-indigo-500 to-blue-500',
	},
	{
		icon: Layers,
		title: 'React & SolidJS Wrapper',
		description:
			'Official React & Solid component with hooks for easy integration and advanced state management.',
		gradient: 'from-cyan-500 to-teal-500',
	},
]

const benefits = [
	{
		icon: Zap,
		title: 'High Performance',
		description:
			'Optimized for smooth 60fps interactions even with complex layouts',
	},
	{
		icon: Shield,
		title: 'Type Safe',
		description:
			'Built with TypeScript for better developer experience and fewer bugs',
	},
	{
		icon: Palette,
		title: 'Customizable',
		description:
			'Fully customizable styling and behavior to match your design system',
	},
	{
		icon: Cpu,
		title: 'Lightweight',
		description:
			'Minimal bundle size with tree-shaking support for production builds',
	},
	{
		icon: GitBranch,
		title: 'Open Source',
		description:
			'MIT licensed with active community contributions and support',
	},
	{
		icon: Sparkles,
		title: 'Modern API',
		description:
			'Clean, intuitive API design following modern JavaScript patterns',
	},
]

const FeaturesSection = () => {
	return (
		<section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
			<div className="max-w-7xl mx-auto">
				{/* Main Features */}
				<div className="text-center mb-16">
					<Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
						✨ Key Features
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Everything You Need for Modern Layouts
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Build complex, multi-panel interfaces with the power and
						flexibility of modern layout engines.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
					{features.map((feature, index) => (
						<Card
							key={feature.title}
							className="feature-card group cursor-pointer"
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<div
								className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow`}
							>
								<feature.icon className="w-7 h-7 text-white" />
							</div>

							<h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
								{feature.title}
							</h3>

							<p className="text-muted-foreground leading-relaxed">
								{feature.description}
							</p>
						</Card>
					))}
				</div>

				{/* Benefits */}
				<div className="text-center mb-12">
					<Badge className="bg-secondary/50 text-foreground border-border mb-4">
						🚀 Why Choose Dynamix Layout
					</Badge>
					<h3 className="text-2xl md:text-3xl font-bold mb-4">
						Built for Modern Development
					</h3>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{benefits.map((benefit, index) => (
						<Card
							key={benefit.title}
							className="p-6 bg-card/50 border-border/50 hover:bg-card hover:border-primary/20 transition-all duration-300"
							style={{ animationDelay: `${(index + 6) * 0.1}s` }}
						>
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
									<benefit.icon className="w-5 h-5 text-primary" />
								</div>

								<div>
									<h4 className="font-semibold mb-2">
										{benefit.title}
									</h4>
									<p className="text-sm text-muted-foreground">
										{benefit.description}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}

export default FeaturesSection
