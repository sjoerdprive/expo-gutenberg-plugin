import { useState, useRef, useEffect } from '@wordpress/element';
import classNames from 'classnames';
import { Button } from '@wordpress/components';

const DraggableItem = ({
  initItem,
  mouseState,
  cellState,
  onDragEnd,
  onDragStart,
  onChange,
  select,
  isSelected,
  isDragging,
}) => {
  const ref = useRef();
  const { x, y, w, h, z, content, contentType } = initItem;
  const [mousePos, setMousePos] = mouseState;
  const [targetCell, setTargetCell] = cellState;
  const [editableText, setEditableText] = useState(content);

  const handleDragStart = (e) => {
    e.dataTransfer.setDragImage(new Image(0, 0), 0, 0);
    onDragStart();
  };

  const handleDrop = () => {
    onDragEnd(targetCell);
  };

  let Child;

  switch (contentType) {
    case 'text': {
      Child = (
        <textarea
          onClick={(e) => {
            // e.stopPropagation();
          }}
          style={{
            background: 'transparent',
            resize: 'none',
            width: '100%',
            height: '100%',
          }}
          onChange={(e) => {
            setEditableText(e.currentTarget.value);
          }}
          onBlur={() => {
            onChange(editableText);
          }}
          value={editableText}
        />
      );
      break;
    }
    case 'image': {
      Child = <img className="content-image" src={content} alt="" />;
      break;
    }
    default: {
      Child = <span>{content}</span>;
    }
  }

  return (
    <div
      ref={ref}
      className={classNames(
        'draggable-root',
        isDragging ? 'dragging' : 'placed',
        isSelected && 'selected',
        'has-' + contentType
      )}
      style={{
        gridColumn: `${x} / span ${w}`,
        gridRow: `${y} / span ${h}`,
        zIndex: z,
      }}
      draggable
      onDragStart={handleDragStart}
      // onDrag={handleDrag}
      onDragEnd={handleDrop}
    >
      <div
        className="content-wrapper"
        style={
          isDragging
            ? {
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
              }
            : {}
        }
        onClick={select}
      >
        {Child}
      </div>
    </div>
  );
};

export default DraggableItem;
