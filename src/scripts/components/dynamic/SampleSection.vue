// Template
<template>
  <section :class="sectionClass">
    <picture>
      <img :src="settings.image" />
    </picture>
    <h2>{{ settings.title }}</h2>
  </section>
</template>

// Javascript
<script>
export default {
  name: 'SampleSection',
  props: {
    settings: {
      type: Object,
    },
  },
  methods: {},
  computed: {
    sectionClass() {
      return `sample-section ${this.settings.title_position}`;
    },
  },
  created() {},
};
</script>

// SCSS
<style lang="scss" scoped>
section {
  position: relative;
  padding: 48px;
  height: 50vh;
  text-align: center;
  overflow: hidden;
}

.flex {
  display: flex;
}

.flex.flex--top-left {
  align-items: flex-start;
  justify-content: flex-start;
}

.flex.flex--top-center {
  align-items: flex-start;
  justify-content: center;
}

.flex.flex--top-right {
  align-items: flex-start;
  justify-content: flex-end;
}

.flex.flex--mid-left {
  align-items: center;
  justify-content: flex-start;
}

.flex.flex--mid-center {
  align-items: center;
  justify-content: center;
}

.flex.flex--mid-right {
  align-items: center;
  justify-content: flex-end;
}

.flex.flex--bottom-left {
  align-items: flex-end;
  justify-content: flex-start;
}

.flex.flex--bottom-center {
  align-items: flex-end;
  justify-content: center;
}

.flex.flex--bottom-right {
  align-items: flex-end;
  justify-content: flex-end;
}

picture {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

img {
  width: 100vw;
  object-fit: cover;
  object-position: center;
}

h2 {
  position: relative;
}
</style>
