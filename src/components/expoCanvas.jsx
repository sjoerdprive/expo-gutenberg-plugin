import DraggableItem from './draggableItem';
import { useState, useRef } from '@wordpress/element';
import {
  Button,
  __experimentalInputControl as InputControl,
} from '@wordpress/components';

import classNames from 'classnames';
import PropControl from './propControl';
import Grid from './grid';
import ContextMenu from './contextMenu';
import CanvasContextProvider from './canvasContext';
import ItemMenu from '../partials/itemMenu';
import CanvasMenu from '../partials/canvasMenu';

const ExpoCanvas = ({ attributes, setAttributes }) => {
  const { items } = attributes;
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [draggingItemIndex, setDraggingItemIndex] = useState(undefined);
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [isGridVisible, setGridVisible] = useState(true);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const mouseState = useState({ x: 0, y: 0 });
  const cellState = useState({ x: 0, y: 0 });

  const [targetSquare] = cellState;
  const canvasWidth = Number(
    (attributes.canvasWidth ||= attributes.columnCount)
  );
  const canvasHeight = Number(attributes.canvasHeight);
  const gridSize = Number(attributes.gridSize);

  const getSelectedItem = () => {
    return items[selectedIndex];
  };

  const getDraggingItem = () => {
    return items[draggingItemIndex];
  };

  const toggleGrid = () => {
    setGridVisible((prev) => !prev);
  };

  const transformItem = (newProps, index = selectedIndex) => {
    let newItems = items;

    let editedItem = { ...newItems[index], ...newProps };

    const x = Math.max(editedItem.x, 1);
    const y = Math.max(editedItem.y, 1);
    const w = Math.max(editedItem.w, 1);
    const h = Math.max(editedItem.h, 1);

    const xMax = Math.max(canvasWidth - w + 1, 1);
    const yMax = Math.max(canvasHeight - h + 1, 1);

    editedItem.w = w > canvasWidth ? canvasWidth : w;
    editedItem.h = h > canvasHeight ? canvasHeight : h;
    editedItem.x = x > xMax ? xMax : x;
    editedItem.y = y > yMax ? yMax : y;

    newItems[index] = { ...editedItem };
    setAttributes({ items: [...newItems] });
  };

  const appendItem = (item) => {
    let newItems = items;
    newItems.push(item);
    setAttributes({
      items: [...newItems],
    });
  };

  const uploadImage = (media) => {
    setContextMenuVisible(false);
    appendItem({
      ...targetSquare,
      w: 4,
      h: 4,
      contentType: 'image',
      content: media.url,
      order: items.length,
    });
    setSelectedIndex(items.length - 1);
    transformItem(targetSquare, items.length - 1);
  };

  const placeText = () => {
    setContextMenuVisible(false);
    appendItem({
      ...targetSquare,
      w: 4,
      h: 4,
      contentType: 'text',
      content: 'Typ hier',
      order: items.length,
    });
    setSelectedIndex(items.length - 1);
    transformItem(targetSquare, items.length - 1);
  };

  const deleteItem = () => {
    const indexToDelete = selectedIndex;

    setSelectedIndex(undefined);

    let newItems = items.filter((item, i) => i !== indexToDelete);

    setAttributes({ items: [...newItems] });
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
    setSelectedIndex(undefined);
  };

  const showContextMenu = (pos) => {
    setMenuPos(pos);
    setContextMenuVisible(true);
  };

  const handleDrop = (pos) => {
    transformItem(pos, draggingItemIndex);
    setDraggingItemIndex(undefined);
  };

  const changeOrder = ({ order }) => {
    let newItems = items;

    const oldValue = getSelectedItem().order;

    const indexToSwitch = items.findIndex((item) => item.order === order);

    if (indexToSwitch > -1) {
      newItems[indexToSwitch].order = oldValue;
    }
    newItems[selectedIndex].order = order;

    setAttributes({ items: [...newItems] });
  };

  return (
    <CanvasContextProvider
      value={{
        getSelectedItem,
        transformItem,
        changeOrder,
        deleteItem,
        hideContextMenu,
        showContextMenu,
        uploadImage,
        toggleGrid,
        placeText,
        setAttributes,
        menuPos,
        mouseState,
        cellState,
        canvasHeight,
        canvasWidth,
        gridSize,
        isContextMenuVisible,
        isGridVisible,
      }}
    >
      <div className="expo-root">
        <div className="menu-section">
          <h2>Canvasinstellingen</h2>
          <CanvasMenu />
        </div>
        <div className="menu-section">
          <h2>Objectinstellingen</h2>
          {getSelectedItem() ? (
            <ItemMenu />
          ) : (
            <p>
              Geen item geselecteerd. Klik op een afbeelding of tekst om te
              selecteren.
            </p>
          )}
        </div>
        <div className="expo-canvas">
          <Grid isGridVisible={isGridVisible}>
            {items.map((item, i) => {
              const isCurrentItemDragging = i === draggingItemIndex;
              const isCurrentItemSelected = i === selectedIndex;
              return (
                <DraggableItem
                  key={i}
                  initItem={item}
                  select={() => {
                    setSelectedIndex((prev) => (prev === i ? undefined : i));
                  }}
                  onDragStart={() => {
                    setDraggingItemIndex(i);
                  }}
                  onDragEnd={handleDrop}
                  onChange={(val) => {
                    transformItem({ content: val });
                  }}
                  isSelected={isCurrentItemSelected}
                  isDragging={isCurrentItemDragging}
                />
              );
            })}
          </Grid>
        </div>
      </div>
    </CanvasContextProvider>
  );
};

export default ExpoCanvas;
