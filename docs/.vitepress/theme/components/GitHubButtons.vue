<template>
  <div class="github-buttons">
    <!-- GitHub Star 按钮 -->
    <iframe
      src="https://ghbtns.com/github-btn.html?user=PandaTestGrid&repo=pandatestgrid.github.io&type=star&count=true&size=large"
      frameborder="0"
      scrolling="0"
      width="120"
      height="30"
      title="GitHub Star"
    ></iframe>

    <!-- GitHub Fork 按钮 -->
    <iframe
      src="https://ghbtns.com/github-btn.html?user=PandaTestGrid&repo=pandatestgrid.github.io&type=fork&count=true&size=large"
      frameborder="0"
      scrolling="0"
      width="120"
      height="30"
      title="GitHub Fork"
    ></iframe>

    <!-- GitHub Watch 按钮 -->
    <iframe
      src="https://ghbtns.com/github-btn.html?user=PandaTestGrid&repo=pandatestgrid.github.io&type=watch&count=true&size=large&v=2"
      frameborder="0"
      scrolling="0"
      width="120"
      height="30"
      title="GitHub Watch"
    ></iframe>
  </div>
</template>

<style scoped>
.github-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  flex-wrap: wrap;
}

.github-buttons iframe {
  vertical-align: middle;
}

@media (max-width: 768px) {
  .github-buttons {
    flex-direction: column;
    gap: 12px;
  }
}
</style> 