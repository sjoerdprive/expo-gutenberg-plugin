import { useCanvas } from './../components/canvasContext';
import { __experimentalInputControl as InputControl } from '@wordpress/components';

export default function CanvasMenu() {
  const { setAttributes, canvasHeight, canvasWidth } = useCanvas();
  return (
    <>
      <div className="prop-control">
        <InputControl
          label="Canvashoogte"
          value={canvasHeight}
          type="number"
          onChange={(val) => setAttributes({ canvasHeight: parseInt(val) })}
        />
      </div>
      <div className="prop-control">
        <InputControl
          label="Canvasbreedte"
          value={canvasWidth}
          type="number"
          onChange={(val) => setAttributes({ canvasWidth: parseInt(val) })}
        />
      </div>
    </>
  );
}
