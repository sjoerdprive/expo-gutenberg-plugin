import classNames from 'classnames';
import { useRef } from '@wordpress/element';
import { useCanvas } from './canvasContext';
import ContextMenu from './contextMenu';

export default function Grid({ children, isGridVisible }) {
  const {
    canvasHeight,
    canvasWidth,
    mouseState,
    gridSize,
    cellState,
    hideContextMenu,
    showContextMenu,
  } = useCanvas();
  const grid = useRef();
  const [mousePos, setMousePos] = mouseState;
  const [targetCell, setTargetCell] = cellState;

  const getGridPos = (e) => {
    const bounds = grid.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const offsetX = bounds.left;
    const offsetY = bounds.top;

    let col = Math.ceil(Math.round(x - offsetX) / gridSize);
    let row = Math.ceil(Math.round(y - offsetY) / gridSize);

    col = col < 1 ? 1 : col;
    row = row < 1 ? 1 : row;

    return { x: col, y: row };
  };

  const trackMouse = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();

    setMousePos({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  const trackDrag = (e) => {
    const pos = getGridPos(e);

    if (pos.x === targetCell.x && pos.y === targetCell.y) return;

    setTargetCell(pos);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    showContextMenu(mousePos);
  };

  return (
    <div
      ref={grid}
      onMouseMove={(e) => {
        trackMouse(e);
        trackDrag(e);
      }}
      onDragOver={(e) => {
        trackMouse(e);
        trackDrag(e);
      }}
      onContextMenu={handleContextMenu}
      className="grid "
      style={{
        gridTemplateColumns: `repeat(${canvasWidth}, ${gridSize}px)`,
        gridTemplateRows: `repeat(${canvasHeight}, ${gridSize}px)`,
        width: `${gridSize * canvasWidth}px`,
        height: `${gridSize * canvasHeight}px`,
      }}
    >
      <div
        onClick={hideContextMenu}
        className={classNames('grid-bg', isGridVisible && 'show')}
        style={{
          backgroundSize: `${gridSize}px`,
        }}
      ></div>
      <ContextMenu />
      {children}
    </div>
  );
}
