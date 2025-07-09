<template>
  <div class="github-contributors">
    <h3>🏆 项目贡献者</h3>
    <div class="contributors-grid">
      <!-- 通过GitHub API获取贡献者信息 -->
      <img
        src="https://contrib.rocks/image?repo=PandaTestGrid/pandatestgrid.github.io"
        alt="GitHub Contributors"
        loading="lazy"
        @error="handleImageError"
      />
    </div>
    <p class="contributors-note">
      感谢所有为 PandaTest 项目做出贡献的开发者！
      <br />
      <a
        href="https://github.com/PandaTestGrid/pandatestgrid.github.io/graphs/contributors"
        target="_blank"
        rel="noopener"
      >
        查看完整贡献者列表 →
      </a>
    </p>
  </div>
</template>

<script setup>
function handleImageError(event) {
  // 如果贡献者图片加载失败，隐藏该元素
  event.target.style.display = "none";
}
</script>

<style scoped>
.github-contributors {
  text-align: center;
  padding: 24px 0;
  margin: 20px 0;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.github-contributors h3 {
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.contributors-grid img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.contributors-note {
  margin: 16px 0 0 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.contributors-note a {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.contributors-note a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .github-contributors {
    padding: 16px;
    margin: 16px 0;
  }

  .github-contributors h3 {
    font-size: 1.1rem;
  }
}
</style> 