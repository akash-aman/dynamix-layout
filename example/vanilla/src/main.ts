import './style.css'
import LayoutCore from '@dynamix-layout/core/src/index'
import { AreaValue } from '@dynamix-layout/core/src/types';

const app = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;

let end : string;
let start : string;
let area : string;
let hoverElement = document.createElement('div');
hoverElement.className = 'hover-tab';

const layout = new LayoutCore({
  range: 5,
  dimension: [app?.getBoundingClientRect().width ?? 0, app?.getBoundingClientRect().height ?? 0],
  tabs: [
    'tab-1',
    'tab-2',
    'tab-3',
    'tab-4',
    'tab-5',
  ]
});

function updateLayout() {
  app.innerHTML = '';
  app.appendChild(hoverElement);
  hoverElement.style.position = 'absolute';
  
  layout.getElements().tabs.forEach((tab) => {

    if (!app) return;
    const div = document.createElement('div');
    div.style.left = tab.coordinate[0] + 'px';
    div.style.top = tab.coordinate[1] + 'px';
    div.style.width = tab.dimension[0] + 'px';
    div.style.height = tab.dimension[1] + 'px';
    div.style.position = 'absolute';
    div.draggable = true;
    div.className = 'tab';
    div.innerHTML = tab.name;
    div.id = tab.name;

    div.addEventListener('dragstart', (e: any) => {
      e.stopPropagation();
      const dragImage = new Image();
			dragImage.src = '';
			e.dataTransfer.setDragImage(dragImage, 0, 0);
      if (e.currentTarget instanceof HTMLElement) {
        start =  e.currentTarget.id;
      }
    });
  
    div.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.currentTarget instanceof HTMLElement) {

        end =  e.currentTarget.id;
  
          const rect = div.getBoundingClientRect();
          const leftOffset = app.offsetLeft;
          const topOffset = app.offsetTop;
          const x = e.clientX - rect.left - leftOffset;
          const y = e.clientY - rect.top - topOffset;
          const w = rect.width;
          const h = rect.height;
  
          if (x < w / 3) {
            area = "left";
            hoverElement.style.left = (rect.left - app.offsetLeft) + 'px';
            hoverElement.style.top = (rect.top - app.offsetTop) + 'px';
            hoverElement.style.width = w / 2 + 'px';
            hoverElement.style.height = h + 'px';
  
          } else if (x > (2 * w) / 3) {
            area = "right";
            hoverElement.style.left = (rect.left - app.offsetLeft) + w / 2 + 'px';
            hoverElement.style.top = (rect.top - app.offsetTop) + 'px';
            hoverElement.style.width = w / 2 + 'px';
            hoverElement.style.height = h + 'px';
  
          } else if (y < h / 3) {
            area = "top";
            hoverElement.style.left = (rect.left - app.offsetLeft) + 'px';
            hoverElement.style.top = (rect.top - app.offsetTop) + 'px';
            hoverElement.style.width = w + 'px';
            hoverElement.style.height = h / 2 + 'px';
  
          } else if (y > (2 * h) / 3) {
            area = "bottom";
            hoverElement.style.left = (rect.left - app.offsetLeft) + 'px';
            hoverElement.style.top = (rect.top - app.offsetTop) + h / 2 + 'px';
            hoverElement.style.width = w + 'px';
            hoverElement.style.height = h / 2 + 'px';
  
          } 

          hoverElement.style.display = 'block';
  
      }
    });
  
    div.addEventListener('dragend', () => {
      hoverElement.style.display = 'none';
      if (start == end) return;
      if (start == undefined || end == undefined) return;
  
      layout.shiftTree(start, end, area as AreaValue);
      updateLayout();

    });
  
    app?.appendChild(div);
  });
}

updateLayout();
console.log(JSON.stringify(layout.jsonify()));



