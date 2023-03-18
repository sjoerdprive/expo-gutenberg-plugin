import { MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import classNames from 'classnames';
import { addFilter } from '@wordpress/hooks';
import MyMediaUploader from './mediaUpload';
import { useCanvas } from './canvasContext';

const replaceMediaUpload = () => MediaUpload;

addFilter(
  'editor.MediaUpload',
  'core/edit-post/components/media-upload/replace-media-upload',
  replaceMediaUpload
);

export default function ContextMenu() {
  const {
    menuPos,
    uploadImage,
    placeText,
    toggleGrid,
    isGridVisible,
    hideContextMenu,
    isContextMenuVisible,
  } = useCanvas();

  const { x, y } = menuPos;

  return (
    <div
      className={classNames(
        'context-menu',
        isContextMenuVisible ? 'visible' : 'hidden'
      )}
      style={{ left: x + 10, top: y + 10 }}
    >
      <MyMediaUploader onUpload={uploadImage} />
      <Button
        icon={'editor-textcolor'}
        showTooltip
        label="Voeg tekst toe"
        onClick={placeText}
      />
      <Button
        icon="screenoptions"
        showTooltip
        label={isGridVisible ? 'Verberg raster' : 'Toon raster'}
        isPressed={isGridVisible}
        onClick={toggleGrid}
      />
      <Button
        icon={'no'}
        showTooltip
        label="Sluit menu"
        onClick={hideContextMenu}
      />
    </div>
  );
}
