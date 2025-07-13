import {
	LayoutTree,
	DynamixLayoutCore,
	Node,
	NodeOptions,
} from '@dynamix-layout/core'
import React, { useState, useEffect } from 'react'
import { useDynamixLayoutOptions } from '../types'

export const useDynamixLayout = ({
	tabOutput,
	rootId,
	layoutTree,
	dimensions,
	tabHeadHeight,
	enableTabbar,
	bondWidth,
	minTabHeight,
	minTabWidth,
	sliderUpdateTimeout,
	windowResizeTimeout,
	disableSliderTimeout,
	disableResizeTimeout,
}: useDynamixLayoutOptions) => {
	const tabsetsRef = React.useRef(new Map<string, HTMLDivElement>())
	const slidersRef = React.useRef(new Map<string, HTMLDivElement>())
	const panelsRef = React.useRef(new Map<string, HTMLDivElement>())
	const tabsRef = React.useRef(new Map<string, HTMLDivElement>())
	const hoverElementRef = React.useRef<HTMLDivElement>(null)
	const rootSplitHoverEl = React.useRef<HTMLDivElement[]>([])
	const [layoutJSON, setLayoutJSON] = useState<LayoutTree | undefined>(
		layoutTree
	)
	const [tabsets, setTabsets] = useState<Map<string, NodeOptions>>()
	const [sliders, setSliders] = useState<Map<string, NodeOptions>>()
	const [dragging, setDragging] = useState(false)
	const animationFrameRef = React.useRef<number | null>(null)
	const [isUpdating, setIsUpdating] = useState(false)
	const dragElemRef = React.useRef<{
		src?: HTMLDivElement
		des?: HTMLDivElement
		drag?: boolean
		area?: 'top' | 'bottom' | 'left' | 'right' | 'contain'
	} | null>({
		src: undefined,
		des: undefined,
		area: undefined,
		drag: false,
	})

	// --- REFACTORED: Using Pointer Events for Slider ---
	const dragSliderRef = React.useRef<{
		sliderId?: string
		isSliding?: boolean
	}>({
		sliderId: undefined,
		isSliding: false,
	})

	const layoutInstance = React.useMemo(() => {
		DynamixLayoutCore._bond = bondWidth
		DynamixLayoutCore._minH = minTabHeight
		DynamixLayoutCore._minW = minTabWidth

		const LT = new DynamixLayoutCore({
			tabs: tabOutput.keys,
			tree: layoutJSON,
			minW: minTabWidth,
			minH: minTabHeight,
			bond: bondWidth,
			uqid: rootId,
			tabsIds: tabOutput.name,
		})
		return LT
	}, [layoutJSON, tabOutput, bondWidth, minTabHeight, minTabWidth, rootId])

	const updateTabsets = (nodes: Map<string, NodeOptions>) => {
		const newTabsets = new Map<string, NodeOptions>(nodes)
		setTabsets(newTabsets)
	}

	const updateSliders = (nodes: Map<string, NodeOptions>) => {
		const newSliders = new Map<string, NodeOptions>(nodes)
		setSliders(newSliders)
	}

	Node.cache.nodOpts.onChange((nodes: Map<string, NodeOptions>) => {
		nodes.forEach((node, id) => {
			const panelEl = panelsRef.current.get(id)
			if (panelEl) {
				panelEl.style.width = `${node.nodDims.w}px`
				panelEl.style.height = `${node.nodDims.h}px`
				panelEl.style.left = `${node.nodDims.x}px`
				panelEl.style.top = `${node.nodDims.y}px`
			}

			const tabsetEl = tabsetsRef.current.get(id)
			if (tabsetEl && enableTabbar) {
				tabsetEl.style.width = `${node.nodDims.w}px`
				tabsetEl.style.height = enableTabbar
					? `${tabHeadHeight}px`
					: `0px`
				tabsetEl.style.left = `${node.nodDims.x}px`
				tabsetEl.style.top = `${node.nodDims.y}px`
			}
		})
	})

	Node.cache.bndOpts.onChange((nodes: Map<string, NodeOptions>) => {
		nodes.forEach((node, id) => {
			const sliderEl = slidersRef.current.get(id)
			if (sliderEl) {
				sliderEl.style.width = `${node.nodDims.w}px`
				sliderEl.style.height = `${node.nodDims.h}px`
				sliderEl.style.left = `${node.nodDims.x}px`
				sliderEl.style.top = `${node.nodDims.y}px`
			}
		})
	})

	Node.cache.tabOpts.onChange((nodes: Map<string, NodeOptions>) => {
		nodes.forEach((node, id) => {
			const tabEl = tabsRef.current.get(id)
			if (tabEl) {
				tabEl.style.width = `${node.nodDims.w}px`
				tabEl.style.height = enableTabbar
					? `${node.nodDims.h - tabHeadHeight}px`
					: `${node.nodDims.h}px`
				tabEl.style.left = `${node.nodDims.x}px`
				tabEl.style.top = enableTabbar
					? `${node.nodDims.y + tabHeadHeight}px`
					: `${node.nodDims.y}px`
				tabEl.style.display = node.nodOpen ? 'block' : 'none'
			}
		})
	})

	// --- START: SLIDER POINTER EVENT HANDLERS ---
	const onPointerMove = (e: PointerEvent) => {
		if (!dragSliderRef.current.isSliding) return
		layoutInstance.updateSlider(
			dragSliderRef.current.sliderId!,
			{
				x: e.clientX,
				y: e.clientY,
			},
			disableSliderTimeout,
			sliderUpdateTimeout
		)
	}

	const onPointerUp = (e: PointerEvent) => {
		if (!dragSliderRef.current.isSliding) return

		const sliderElement = e.currentTarget as HTMLDivElement
		dragSliderRef.current.isSliding = false
		dragSliderRef.current.sliderId = undefined

		// Release pointer capture and remove listeners
		sliderElement.releasePointerCapture(e.pointerId)
		sliderElement.removeEventListener('pointermove', onPointerMove)
		sliderElement.removeEventListener('pointerup', onPointerUp)
		sliderElement.removeEventListener('pointercancel', onPointerUp)
	}

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		e.preventDefault()

		const sliderElement = e.currentTarget
		dragSliderRef.current.isSliding = true
		dragSliderRef.current.sliderId = sliderElement.id

		// Capture the pointer to ensure events are received
		sliderElement.setPointerCapture(e.pointerId)

		// Add listeners
		sliderElement.addEventListener('pointermove', onPointerMove)
		sliderElement.addEventListener('pointerup', onPointerUp)
		sliderElement.addEventListener('pointercancel', onPointerUp)
	}
	// --- END: SLIDER POINTER EVENT HANDLERS ---

	const lastHoverState = React.useRef<{
		area?: string
		left?: number
		top?: number
		width?: number
		height?: number
	}>({})

	const findDropTargetTabset = (
		clientX: number,
		clientY: number,
		target: HTMLDivElement
	) => {
		if (!hoverElementRef.current || !dragElemRef.current || !target) {
			return null
		}

		dragElemRef.current.des = target

		const rect = target.getBoundingClientRect()
		if (!rect) return null

		const w = rect.width
		const h = rect.height
		const x = clientX - rect.left
		const y = clientY - rect.top

		let newArea: string
		let newLeft: number
		let newTop: number
		let newWidth: number
		let newHeight: number

		if (x < w / 3) {
			newArea = 'left'
			newLeft = rect.left
			newTop = rect.top
			newWidth = w / 2
			newHeight = h
		} else if (x > (2 * w) / 3) {
			newArea = 'right'
			newLeft = rect.left + w / 2
			newTop = rect.top
			newWidth = w / 2
			newHeight = h
		} else if (y < h / 3) {
			newArea = 'top'
			newLeft = rect.left
			newTop = rect.top
			newWidth = w
			newHeight = h / 2
		} else if (y > (2 * h) / 3) {
			newArea = 'bottom'
			newLeft = rect.left
			newTop = rect.top + h / 2
			newWidth = w
			newHeight = h / 2
		} else {
			newArea = 'contain'
			newLeft = rect.left + w * 0.1
			newTop = rect.top + h * 0.1
			newWidth = w * 0.8
			newHeight = h * 0.8
		}

		const lastState = lastHoverState.current
		if (
			lastState.area !== newArea ||
			lastState.left !== newLeft ||
			lastState.top !== newTop ||
			lastState.width !== newWidth ||
			lastState.height !== newHeight
		) {
			updateHoverElement(newLeft, newTop, newWidth, newHeight, newArea)

			lastHoverState.current = {
				area: newArea,
				left: newLeft,
				top: newTop,
				width: newWidth,
				height: newHeight,
			}
		}

		dragElemRef.current.area = newArea as
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'
			| 'contain'
	}

	const handleNavbarDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()

		const navbarElement = e.currentTarget
		const tabElems = Array.from(
			navbarElement.childNodes
		) as HTMLDivElement[]

		const clientX = e.clientX
		const clientY = e.clientY

		if (
			!hoverElementRef.current ||
			!dragElemRef.current ||
			tabElems.length === 0
		)
			return

		const navbarContainer = tabElems[0].parentElement
		if (!navbarContainer) return

		const navbarRect = navbarContainer.getBoundingClientRect()
		const firstTab = tabElems[0]
		const lastTab = tabElems[tabElems.length - 1]
		const firstRect = firstTab.getBoundingClientRect()
		const lastRect = lastTab.getBoundingClientRect()

		if (clientY < navbarRect.top || clientY > navbarRect.bottom) return

		if (clientX > lastRect.right) {
			const newLeft = lastRect.right + 1
			const newTop = lastRect.top
			const newWidth = 4
			const newHeight = lastRect.height
			const newArea = 'right'

			updateHoverElement(newLeft, newTop, newWidth, newHeight, newArea)
			dragElemRef.current.des = lastTab
			dragElemRef.current.area = newArea as
				| 'top'
				| 'bottom'
				| 'left'
				| 'right'
				| 'contain'
			return
		}

		if (clientX < firstRect.left) {
			const newLeft = firstRect.left - 5
			const newTop = firstRect.top
			const newWidth = 4
			const newHeight = firstRect.height
			const newArea = 'left'

			updateHoverElement(newLeft, newTop, newWidth, newHeight, newArea)
			dragElemRef.current.des = firstTab
			dragElemRef.current.area = newArea as
				| 'top'
				| 'bottom'
				| 'left'
				| 'right'
				| 'contain'
			return
		}

		let closestTab = null
		let minDistance = Infinity
		let isLeftSide = false

		for (let i = 0; i < tabElems.length; i++) {
			const tabRect = tabElems[i].getBoundingClientRect()
			const tabCenterX = tabRect.left + tabRect.width / 2
			const distance = Math.abs(clientX - tabCenterX)

			if (distance < minDistance) {
				minDistance = distance
				closestTab = tabElems[i]
				isLeftSide = clientX < tabCenterX
			}
		}

		if (closestTab) {
			const tabRect = closestTab.getBoundingClientRect()
			const newLeft = isLeftSide ? tabRect.left - 5 : tabRect.right + 1
			const newTop = tabRect.top
			const newWidth = 4
			const newHeight = tabRect.height
			const newArea = isLeftSide ? 'left' : 'right'

			updateHoverElement(newLeft, newTop, newWidth, newHeight, newArea)
			dragElemRef.current.des = closestTab
			dragElemRef.current.area = newArea as
				| 'top'
				| 'bottom'
				| 'left'
				| 'right'
				| 'contain'
		}
	}

	const handleRootSplit = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()

		const dataArea = e.currentTarget.dataset.area
		const dataUid = e.currentTarget.dataset.uid

		if (
			!dataArea ||
			!dataUid ||
			!hoverElementRef.current ||
			!dragElemRef.current
		) {
			return
		}

		dragElemRef.current.des = e.currentTarget as HTMLDivElement
		dragElemRef.current.area = dataArea as
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'

		const dimension = dimensions()

		let newLeft = dimension.x
		let newTop = dimension.y
		let newWidth = dimension.w
		let newHeight = dimension.h
		if (dataArea === 'left') {
			newLeft = dimension.x
			newTop = dimension.y
			newWidth = dimension.w / 2
			newHeight = dimension.h
		} else if (dataArea === 'right') {
			newLeft = dimension.x + dimension.w / 2
			newTop = dimension.y
			newWidth = dimension.w / 2
			newHeight = dimension.h
		} else if (dataArea === 'top') {
			newLeft = dimension.x
			newTop = dimension.y
			newWidth = dimension.w
			newHeight = dimension.h / 2
		} else if (dataArea === 'bottom') {
			newLeft = dimension.x
			newTop = dimension.y + dimension.h / 2
			newWidth = dimension.w
			newHeight = dimension.h / 2
		}

		updateHoverElement(newLeft, newTop, newWidth, newHeight, dataArea)
	}

	const updateHoverElement = (
		newLeft: number,
		newTop: number,
		newWidth: number,
		newHeight: number,
		newArea: string
	) => {
		const lastState = lastHoverState.current
		if (
			lastState.area !== newArea ||
			lastState.left !== newLeft ||
			lastState.top !== newTop ||
			lastState.width !== newWidth ||
			lastState.height !== newHeight
		) {
			const hoverEl = hoverElementRef.current
			if (hoverEl) {
				const styleClone: Record<string, string> = {}

				for (let i = 0; i < hoverEl.style.length; i++) {
					const propName = hoverEl.style[i]
					if (propName) {
						styleClone[propName] =
							hoverEl.style.getPropertyValue(propName)
					}
				}

				Object.assign(hoverEl.style, styleClone, {
					left: `${newLeft}px`,
					top: `${newTop}px`,
					width: `${newWidth}px`,
					height: `${newHeight}px`,
					display: 'block',
					zIndex: '100',
				})

				lastHoverState.current = {
					area: newArea,
					left: newLeft,
					top: newTop,
					width: newWidth,
					height: newHeight,
				}
			}
		}
	}

	const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		e.stopPropagation()
		setDragging(true)

		if (e.currentTarget) {
			const dragImage = new Image()
			dragImage.src = ''
			e.dataTransfer?.setDragImage(dragImage, 0, 0)

			rootSplitHoverEl.current.forEach((el) => {
				if (el) {
					el.style.display = 'block'
					el.style.zIndex = '99'
				}
			})

			panelsRef.current.forEach((el) => {
				if (el) {
					el.style.display = 'block'
					el.style.zIndex = '95'
				}
			})

			dragElemRef.current!.src = e.currentTarget as HTMLDivElement
			dragElemRef.current!.drag = true
		}
	}

	const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (!dragElemRef.current?.src) {
			return
		}

		const target = e.currentTarget as HTMLDivElement
		const clientX = e.clientX
		const clientY = e.clientY

		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current)
		}

		animationFrameRef.current = requestAnimationFrame(() => {
			findDropTargetTabset(clientX, clientY, target)
		})
	}

	const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => { // eslint-disable-line @typescript-eslint/no-unused-vars
		rootSplitHoverEl.current.forEach((el) => {
			if (el) {
				el.style.display = 'none'
				el.style.zIndex = '-1'
			}
		})

		panelsRef.current.forEach((el) => {
			if (el) {
				el.style.display = 'none'
				el.style.zIndex = '-1'
			}
		})

		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current)
			animationFrameRef.current = null
		}

		if (hoverElementRef.current) {
			hoverElementRef.current.style.display = 'none'
			hoverElementRef.current.style.zIndex = '-1'
		}

		lastHoverState.current = {}
		dragElemRef.current!.drag = false

		if (!dragElemRef.current?.src || !dragElemRef.current?.des) {
			dragElemRef.current!.area = undefined
			dragElemRef.current!.src = undefined
			dragElemRef.current!.des = undefined

			setDragging(false)
			return
		}

		if (dragElemRef.current.src === dragElemRef.current.des) {
			dragElemRef.current!.area = undefined
			dragElemRef.current!.src = undefined
			dragElemRef.current!.des = undefined

			setDragging(false)
			return
		}

		if (dragElemRef.current.src && dragElemRef.current.des) {
			if (!dragElemRef.current.area) {
				console.warn('No area specified for drag and drop')

				setDragging(false)
				return
			}

			const result = layoutInstance.updateTree(
				dragElemRef.current.src.dataset.uid as string,
				dragElemRef.current.des.dataset.uid as string,
				dragElemRef.current.area || 'contain'
			)

			if (!result) {
				console.warn('Failed to update layout tree')

				setDragging(false)
				return
			}

			requestAnimationFrame(() => {
				updateTabsets(Node.cache.nodOpts.get())
				updateSliders(Node.cache.bndOpts.get())
			})
		}

		dragElemRef.current!.area = undefined
		dragElemRef.current!.src = undefined
		dragElemRef.current!.des = undefined
	}

	const updateActiveTab = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.currentTarget as HTMLDivElement
		const uid = target.dataset.uid

		if (!uid) return

		const node = Node.cache.mapElem.get(uid)

		if (!(node instanceof Node)) {
			console.warn(`Element with uid ${uid} is not a Node instance`)
			return
		}

		if (!node || !node.host || !node.host.unId) {
			console.warn(`Node with uid ${uid} not found in mapNode`)
			return
		}

		if (node.host.open == node.name) {
			console.warn(`Node ${node.name} is already open`)
			return
		}

		const nodeOpts = Node.cache.nodOpts.get().get(node.host.unId)

		if (!nodeOpts) return

		if (nodeOpts.nodOpen && node?.open) {
			return
		}

		node.host.open = node.name
		nodeOpts.nodOpen = node.name

		const childNodes = target?.parentElement
			?.childNodes as NodeListOf<HTMLDivElement>

		childNodes?.forEach((child) => {
			if (child instanceof HTMLDivElement && child.dataset.uid !== uid) {
				child.dataset.state = 'inactive'
			} else {
				child.dataset.state = 'active'
			}
		})

		nodeOpts.nodKids?.forEach((kid) => {
			if (kid.nodName == node.name) {
				kid.nodOpen = true
				tabsRef.current
					.get(kid.uidNode)
					?.style.setProperty('display', 'block')
			} else {
				kid.nodOpen = false
				tabsRef.current
					.get(kid.uidNode)
					?.style.setProperty('display', 'none')
			}
		})
	}

	useEffect(() => {
		const updateDimension = (flag: boolean) => {
			layoutInstance.updateDimension(
				dimensions(),
				flag,
				windowResizeTimeout
			)
		};

		updateDimension(true)

		const handler = async (
			_: UIEvent // eslint-disable-line @typescript-eslint/no-unused-vars
		) => updateDimension(disableResizeTimeout ?? false)

		window.addEventListener('resize', handler)

		updateTabsets(Node.cache.nodOpts.get())
		updateSliders(Node.cache.bndOpts.get())

		Node.cache.nodOpts.triggerChange()
		Node.cache.bndOpts.triggerChange()
		Node.cache.tabOpts.triggerChange()

		return () => {
			window.removeEventListener('resize', handler)

			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
		}
	}, [dimensions, disableResizeTimeout, windowResizeTimeout]) // eslint-disable-line

	useEffect(() => {
		Node.cache.nodOpts.triggerChange()
		Node.cache.bndOpts.triggerChange()
		Node.cache.tabOpts.triggerChange()
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
		}
	}, [tabsets, sliders])

	return {
		tabsets,
		sliders,
		tabsetsRef,
		panelsRef,
		tabsRef,
		slidersRef,
		layoutJSON,
		layoutInstance,
		hoverElementRef,
		rootSplitHoverEl,
		dragging,
		isUpdating,
		setIsUpdating,
		setDragging,
		setTabsets,
		setSliders,
		setLayoutJSON,
		onDragStart,
		onDragOver,
		onDragEnd,
		onPointerDown,
		updateActiveTab,
		handleRootSplit,
		handleNavbarDragOver,
	}
}
