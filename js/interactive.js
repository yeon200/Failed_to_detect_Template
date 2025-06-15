document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("inputForm");
  const input = document.getElementById("userInput");
  const output = document.getElementById("outputArea");
  const image = document.getElementById("interactiveImage");
  const sound = document.getElementById("ambient");

  const validImages = [1,2,3,4,5,6,7,8,9,10,14,20];
  const ambientFiles = ['ambient1.mp3', 'ambient2.mp3', 'ambient3.mp3'];

  const patterns = {
    heart: {
      cols: 7,
      data: [
        0,1,1,0,1,1,0,
        1,1,1,1,1,1,1,
        0,1,1,1,1,1,0,
        0,0,1,1,1,0,0,
        0,0,0,1,1,0,0,
        0,0,0,1,0,0,0
      ]
    },
    star: {
      cols: 7,
      data: [
        0,0,1,0,1,0,0,
        0,0,1,1,1,0,0,
        1,1,1,1,1,1,1,
        0,0,1,1,1,0,0,
        0,1,0,1,0,1,0,
        1,0,0,1,0,0,1
      ]
    },
    cherry: {
      cols: 7,
      data: [
        0,0,0,1,1,0,0,
        0,0,1,1,1,1,0,
        0,0,0,1,1,0,0,
        0,1,0,1,0,1,0,
        1,0,1,0,1,0,1,
        0,1,0,0,0,1,0
      ]
    },
    mug: {
      cols: 7,
      data: [
        1,1,1,1,1,1,1,
        1,0,0,0,0,0,1,
        1,0,1,1,1,0,1,
        1,0,0,0,0,0,1,
        1,1,1,1,1,1,1,
        0,0,1,1,1,0,0
      ]
    },
    cloud: {
      cols: 7,
      data: [
        0,0,1,1,1,0,0,
        0,1,1,1,1,1,0,
        1,1,1,1,1,1,1,
        0,1,1,1,1,1,0,
        0,0,1,1,1,0,0
      ]
    }
  };

  const patternKeys = Object.keys(patterns);

  function drawPattern(text) {
    output.innerHTML = "";
    const selectedKey = patternKeys[Math.floor(Math.random() * patternKeys.length)];
    const { cols, data } = patterns[selectedKey];

    data.forEach((val) => {
      const span = document.createElement("span");
      span.className = val === 1 ? "word-shape" : "word-empty";
      if (val === 1) span.textContent = text;
      output.appendChild(span);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    drawPattern(text);
    input.value = "";

    // 이미지 변경
    const randImage = validImages[Math.floor(Math.random() * validImages.length)];
    image.src = `images/gen_${randImage}.jpg`;

    // 사운드 변경
    const randSound = ambientFiles[Math.floor(Math.random() * ambientFiles.length)];
    sound.src = `sound/${randSound}`;
    sound.play();
  });

  sound.volume = 0.4;
});