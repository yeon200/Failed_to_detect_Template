document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const overlay = document.getElementById("overlay");
  const originalImage = document.getElementById("originalImage");
  const generatedImage = document.getElementById("generatedImage");
  const analysisText = document.getElementById("analysisText");

  fetch('data/archive.json')
    .then(res => res.json())
    .then(data => {
      const total = data.length;
      const radius = 250; // 원 반지름
      const spacing = 1.3; // 간격 조정
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      data.forEach((item, index) => {
        const angle = (2 * Math.PI / total) * index;
        const x = centerX + radius * Math.cos(angle) * spacing;
        const y = centerY + radius * Math.sin(angle) * spacing;

        const img = document.createElement("img");
        img.src = `images/${item.image}`;
        img.style.left = `${x - 40}px`;
        img.style.top = `${y - 40}px`;
        img.classList.add("circle-thumb");

        img.addEventListener("click", () => {
          const imageName = item.image.replace(".jpg", "");
          originalImage.src = `images/${imageName}.jpg`;
          generatedImage.src = `images/gen_${imageName}.jpg`;
          generatedImage.classList.add("hidden"); // 숨기기

          analysisText.textContent = formatAnalysisText(item);

          overlay.classList.remove("hidden");

          overlay.onclick = () => {
            if (generatedImage.classList.contains("hidden")) {
              generatedImage.classList.remove("hidden");
            } else {
              overlay.classList.add("hidden");
              generatedImage.classList.add("hidden");
            }
          };
        });

        imageGrid.appendChild(img);
      });
    });

  function formatAnalysisText(item) {
    let result = "";
    if (item.predictions && item.predictions.length > 0) {
      result += item.predictions.map(p => `${p.label} (${p.confidence})`).join(" / ");
    }
    if (item.final_decision) {
      result += `\nfinal_decision : ${item.final_decision}`;
    }
    return result || "분석 결과 없음";
  }
});