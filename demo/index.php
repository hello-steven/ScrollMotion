<?
$speedY = isset($_POST['speedY']) ? $_POST['speedY'] : -2;
$speedX = isset($_POST['speedX']) ? $_POST['speedX'] : 0;
$translateX = isset($_POST['translateX']) ? $_POST['translateX'] : '0';
$translateY = isset($_POST['translateY']) ? $_POST['translateY'] : '-15vw';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible">
  <title>Scroll Motion</title>
</head>
<body>
  <style>
    body {
      background: #333;
    }
    .push {
      position: relative;
      width: 90vw;
      height: 500px;
      background: gray;
      margin: 0 auto 2em;
    }
    .push.blue:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: linear-gradient( to bottom, #345e98, #345e98 50%, #2b438c 50%, #2b438c );
      background-size: 100% 20px;
    }
    .lines.active:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: linear-gradient(
        to bottom,
        #5d9634,
        #5d9634 50%,
        #538c2b 50%,
        #538c2b
      );
      /* The rectangle in which to repeat. 
        It can be fully wide in this case */
      background-size: 100% 20px;
    }
    .push.lines {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: center;
    }
    .scroll-motion {
      width: 30vw;
      height: 15vw;
      margin: 1.5vh 0;
      background: lightblue;
      transform: translateX(<?=$translateX?>) translateY(<?=$translateY?>);
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
    }
    .control {
      width: 30vw;
      height: 15vw;
      margin: 1.5vh 0;
      margin-left: 2vw;
      background: lightgreen;
      transform: translateX(<?=$translateX?>) translateY(<?=$translateY?>);
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
    }
    .controller {
      background: firebrick;
      position: fixed;
      padding: 2em 3em;
      top: 3vw;
      right: 3vw;
      z-index: 10;
      max-width: 400px;
      box-sizing: border-box;
      font-family: monospace;
    }
    .controller p {
      margin-top: 0;
      margin-bottom: 1em;
    }
    .controller label {
      display: block;
      margin-bottom: 1em;
    }
    .controller input {
      margin-bottom: 1em;
    }
    .controller button {
      border: none;
      border-radius: 4px;
      box-shadow: none;
      background: #5c0a0a;
      color: #fff;
      font-size: 14px;
      font-family: monospace;
      padding: .5em 1em;
    }
  </style>
  <div class="controller">
    <form action="/demo/" name="scrollMotion" method="post">
      <p><b>Scroll Motion Speeds</b></p>
      <label>speed X: <input type="text" name="speedX" value="<?=$speedX?>"></label>
      <label>speed Y: <input type="text" name="speedY" value="<?=$speedY?>"></label>
      <label>translateX: <input type="text" name="translateX" value="<?=$translateX?>"></label>
      <label>translateY: <input type="text" name="translateY" value="<?=$translateY?>"></label>
      <button>Load</button>
    </form>
  </div>
  <div class="push blue"></div>
  <div class="push lines active">
    <div class="scroll-motion" data-speed-y="<?=$speedY?>" data-speed-x="<?=$speedX?>">VARIABLE</div>
    <div class="control">CONTROL</div>
  </div>
  <div class="push blue"></div>
  <div class="push blue"></div>
  <div class="push blue"></div>
  <div class="push lines active">
    <div class="scroll-motion" data-speed-y="<?=$speedY?>" data-speed-x="<?=$speedX?>">VARIABLE</div>
    <div class="control">CONTROL</div>
  </div>
  <div class="push blue"></div>
  <div class="push blue"></div>
  <div class="push blue"></div>
  <div class="push lines active">
    <div class="scroll-motion" data-speed-y="<?=$speedY?>" data-speed-x="<?=$speedX?>" data-observe="0">VARIABLE</div>
    <div class="control">CONTROL</div>
  </div>
  <script src="/intersection-observer.js"></script>
  <script src="/scroll_motion.js"></script>
  <script src="/demo/main.js"></script>
</body>
</html>