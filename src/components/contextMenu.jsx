import { MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import classNames from 'classnames';
import { addFilter } from '@wordpress/hooks';
import MyMediaUploader from './../mediaUpload';

const replaceMediaUpload = () => MediaUpload;

addFilter(
  'editor.MediaUpload',
  'core/edit-post/components/media-upload/replace-media-upload',
  replaceMediaUpload
);

export default function ContextMenu({
  position,
  onUpload,
  placeText,
  toggleGrid,
  isGridVisible,
  hideContextMenu,
  visible,
}) {
  const { x, y } = position;

  return (
    <div
      className={classNames('context-menu', visible ? 'visible' : 'hidden')}
      style={{ left: x + 10, top: y + 10 }}
    >
      <MyMediaUploader onUpload={onUpload} />
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
