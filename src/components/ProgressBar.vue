<template>
  <div class="progress-bar-container" :style="containerStyle">
    <div class="progress-bar-fill" :style="fillStyle"></div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ProgressBar',
  props: {
    progress: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 100
    },
    height: {
      type: String,
      default: '8px'
    },
    backgroundColor: {
      type: String,
      default: '#e0e0e0'
    },
    fillColor: {
      type: String,
      default: '#007bff'
    },
    borderRadius: {
      type: String,
      default: '4px'
    }
  },
  setup(props) {
    const containerStyle = computed(() => ({
      height: props.height,
      backgroundColor: props.backgroundColor,
      borderRadius: props.borderRadius
    }));

    const fillStyle = computed(() => ({
      width: `${props.progress}%`,
      backgroundColor: props.fillColor,
      borderRadius: props.borderRadius
    }));

    return {
      containerStyle,
      fillStyle
    };
  }
};
</script>

<style scoped lang="scss">
.progress-bar-container {
  width: 100%;
  overflow: hidden;
  position: relative;

  .progress-bar-fill {
    height: 100%;
    transition: width 0.4s ease;
  }
}
</style>