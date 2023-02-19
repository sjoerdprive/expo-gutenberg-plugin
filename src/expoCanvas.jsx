import DraggableItem from './draggableItem';
import { useState, useRef, useEffect } from '@wordpress/element';
import {
  Button,
  __experimentalInputControl as InputControl,
} from '@wordpress/components';

import classNames from 'classnames';
import PropControl from './components/propControl';
import Grid from './components/grid';
import ContextMenu from './components/contextMenu';

const deleteItem = () => {};

const ExpoCanvas = ({ attributes, setAttributes }) => {
  const { items } = attributes;
  const grid = useRef();
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [draggingItemIndex, setDraggingItemIndex] = useState(undefined);
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [isGridVisible, setGridVisible] = useState(true);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const mouseState = useState({ x: 0, y: 0 });
  const cellState = useState({ x: 0, y: 0 });

  const [targetSquare] = cellState;
  const canvasWidth = Number(attributes.canvasWidth || attributes.columnCount);
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

  return (
    <div className="expo-root">
      <div className={classNames('expo-menu', 'active')}>
        <h2>Canvasinstellingen</h2>
        <div className="prop-control">
          <InputControl
            label="Canvashoogte"
            value={canvasHeight}
            type="number"
            onChange={(nextValue) => setAttributes({ canvasHeight: nextValue })}
          />
        </div>
        <div className="prop-control">
          <InputControl
            label="Canvasbreedte"
            value={canvasWidth}
            type="number"
            onChange={(nextValue) => setAttributes({ canvasWidth: nextValue })}
          />
        </div>
        {getSelectedItem() ? (
          <>
            <h2>Objectinstellingen</h2>
            <h3>Formaat</h3>

            <PropControl
              selectedItem={getSelectedItem()}
              transformItem={transformItem}
              prop="w"
              label="Breedte"
            />
            <PropControl
              selectedItem={getSelectedItem()}
              transformItem={transformItem}
              prop="h"
              label="Hoogte"
            />
            <h3>Positie</h3>
            <PropControl
              selectedItem={getSelectedItem()}
              transformItem={transformItem}
              prop="x"
              label="X-as"
            />
            <PropControl
              selectedItem={getSelectedItem()}
              transformItem={transformItem}
              prop="y"
              label="Y-as"
            />
            <PropControl
              selectedItem={getSelectedItem()}
              transformItem={transformItem}
              prop="z"
              label="Z-as"
            />

            <h3>Functies</h3>

            <Button
              className="delete"
              icon={'trash'}
              showTooltip
              label="Verwijder item"
              isDestructive
              onClick={deleteItem}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <Grid
        grid={grid}
        gridSize={gridSize}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        mouseState={mouseState}
        cellState={cellState}
        hideContextMenu={hideContextMenu}
        showContextMenu={showContextMenu}
        isGridVisible={isGridVisible}
      >
        <ContextMenu
          toggleGrid={toggleGrid}
          onUpload={uploadImage}
          placeText={placeText}
          position={menuPos}
          hideContextMenu={hideContextMenu}
          visible={isContextMenuVisible}
          isGridVisible={isGridVisible}
        />
        {items.map((item, i) => {
          const isCurrentItemDragging = i === draggingItemIndex;
          return (
            <DraggableItem
              mouseState={mouseState}
              cellState={cellState}
              key={i}
              grid={grid}
              initItem={item}
              select={() => {
                setSelectedIndex((prev) => (prev === i ? undefined : i));
              }}
              onDragStart={() => {
                setDraggingItemIndex(i);
              }}
              onDragEnd={handleDrop}
              onChange={(val) => {
                let items = attributes.items;
                items[i].content = val;

                setAttributes({ items: [...items] });
              }}
              isSelected={i === selectedIndex}
              isDragging={isCurrentItemDragging}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default ExpoCanvas;
