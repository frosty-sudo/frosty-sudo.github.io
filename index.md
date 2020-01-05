<!DOCTYPE html>
<html>
  <head>
    <link rel="shortcut icon" type="image/x-icon" href="ddos.png" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Nuclear missile control panel</title>
    <link href="style.css" rel="stylesheet" type="text/css" />
  </head>
  <body>

    <div id="wrapper" class="wrapper">
     <button class="button" type="button" id="button1" onclick="test()">Test</button>
     <button class="button" type="button" id="button2" onclick="launch()">Launch Missile on Hawaii</button>
    
     <h1 class="sure" style="display:none" id="sure">Are you sure?</h1>

     <button class="button" type="button" style="display:none" onclick="yes()" id="button3" onclick="">Yes</button>
     <button class="button" type="button" style="display:none" onclick="no()" id="button4" onclick="">No</button>
    
     <h1 id="rip" style="display:none">You now blew up Hawaii</h1>
     <h1  id="testBanner" style="visibility:collapse">The test is now going</h1>
    </div>
    <script src="script.js"></script>
  </body>
</html>
