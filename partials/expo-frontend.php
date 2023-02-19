<?php function render_expo($attributes)
{
  $CANVAS_WIDTH = isset($attributes['canvasWidth']) ? $attributes['canvasWidth'] :
    $attributes['columnCount'];

  $CANVAS_HEIGHT = $attributes['canvasHeight'];

  $GRID_SIZE = $attributes['gridSize'];
  ob_start()
?>
  <div class="expo-canvas" style="grid-template-columns: repeat(<?php echo $CANVAS_WIDTH ?>, <?php echo $GRID_SIZE ?>px);
        grid-template-rows: repeat(<?php echo $CANVAS_HEIGHT ?>, <?php echo $GRID_SIZE ?>px);">
    <?php
    foreach ($attributes['items'] as $item) {
      $w = $item['w'];
      $h = $item['h'];
      $x = $item['x'];
      $y = $item['y'];
      $z = isset($item['z']) ? $item['z'] : 100;

    ?>
      <div style="<?php echo "grid-column: " . $x . " / span " . $w . " ; grid-row: " . $y . " / span " . $h . "; z-index: " . $z . ";" ?>">
        <div class="draggable-root">
          <div class="content-wrapper">


            <?php
            $contentType = $item['contentType'];
            $content = $item['content'];

            switch ($contentType) {
              case 'text':
            ?>
                <span><?php echo $content ?></span>
              <?php
                break;
              case 'image':
              ?>
                <img class="content-image" src="<?php echo $content ?>" alt="">
            <?php
                break;
            }
            ?>
          </div>
        </div>

      </div>
    <?php
      // end foreach loop
    }
    ?>
  </div>
<?php
  $html = ob_get_clean();

  return $html;
  // end function
}
?>
