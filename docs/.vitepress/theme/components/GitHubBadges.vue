<template>
  <div class="github-badges">
    <!-- GitHub Stars -->
    <img
      src="https://img.shields.io/github/stars/PandaTestGrid/pandatestgrid.github.io?style=for-the-badge&logo=github&logoColor=white"
      alt="GitHub stars"
      loading="lazy"
    />

    <!-- GitHub Forks -->
    <img
      src="https://img.shields.io/github/forks/PandaTestGrid/pandatestgrid.github.io?style=for-the-badge&logo=github&logoColor=white"
      alt="GitHub forks"
      loading="lazy"
    />

    <!-- GitHub Issues -->
    <img
      src="https://img.shields.io/github/issues/PandaTestGrid/pandatestgrid.github.io?style=for-the-badge&logo=github&logoColor=white"
      alt="GitHub issues"
      loading="lazy"
    />

    <!-- License -->
    <img
      src="https://img.shields.io/github/license/PandaTestGrid/pandatestgrid.github.io?style=for-the-badge&logo=github&logoColor=white"
      alt="License"
      loading="lazy"
    />

    <!-- Last Commit -->
    <img
      src="https://img.shields.io/github/last-commit/PandaTestGrid/pandatestgrid.github.io?style=for-the-badge&logo=github&logoColor=white"
      alt="Last commit"
      loading="lazy"
    />
  </div>
</template>

<style scoped>
.github-badges {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  flex-wrap: wrap;
}

.github-badges img {
  height: 28px;
  transition: transform 0.2s ease;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.github-badges img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .github-badges {
    gap: 6px;
    padding: 16px 0;
  }

  .github-badges img {
    height: 24px;
  }
}
</style> 