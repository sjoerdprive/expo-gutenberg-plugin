import { Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

const ALLOWED_MEDIA_TYPES = ['image'];

function MyMediaUploader({ onUpload }) {
  return (
    <MediaUploadCheck>
      <MediaUpload
        onSelect={onUpload}
        allowedTypes={ALLOWED_MEDIA_TYPES}
        render={({ open }) => (
          <Button
            icon={'format-image'}
            showTooltip
            label="Voeg afbeelding toe"
            onClick={open}
          />
        )}
      />
    </MediaUploadCheck>
  );
}
export default MyMediaUploader;
