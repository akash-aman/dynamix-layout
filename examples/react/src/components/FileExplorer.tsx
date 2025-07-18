import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileCode, Folder } from 'lucide-react'

export function FileExplorer() {
	return (
		<Card className="h-full w-full border-1 hide-scrollbar">
			<CardHeader className="p-4">
				<CardTitle className="text-sm font-medium">Files</CardTitle>
			</CardHeader>
			<CardContent className="p-4 pt-0">
				<ul className="space-y-2">
					<li className="flex items-center text-sm cursor-pointer hover:bg-muted p-1 rounded">
						<Folder className="h-4 w-4 mr-2" /> src
					</li>
					<li className="flex items-center text-sm cursor-pointer hover:bg-muted p-1 rounded ml-4">
						<FileCode className="h-4 w-4 mr-2" /> index.html
					</li>
					<li className="flex items-center text-sm cursor-pointer hover:bg-muted p-1 rounded ml-4">
						<FileCode className="h-4 w-4 mr-2" /> style.css
					</li>
					<li className="flex items-center text-sm cursor-pointer hover:bg-muted p-1 rounded ml-4">
						<FileCode className="h-4 w-4 mr-2" /> script.js
					</li>
				</ul>
			</CardContent>
		</Card>
	)
}
