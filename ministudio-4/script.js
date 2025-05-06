var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);

DeviceOrientationEvent
  .requestPermission()
  .then(() => {
    new Parallax(scene)
  })