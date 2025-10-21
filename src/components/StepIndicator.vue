<template>
  <div
    class="step-indicator"
    :class="{ active: isActive, completed: isCompleted, clickable: isClickable }"
    @click="handleClick"
  >
    <div class="step-number" :style="indicatorStyle">
      <span v-if="!isCompleted || !showCheckmark">{{ stepNumber }}</span>
      <svg v-else class="checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <div v-if="label" class="step-label" :style="labelStyle">{{ label }}</div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'StepIndicator',
  props: {
    stepNumber: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: '#007bff'
    },
    completedColor: {
      type: String,
      default: '#28a745'
    },
    inactiveColor: {
      type: String,
      default: '#e0e0e0'
    },
    showCheckmark: {
      type: Boolean,
      default: true
    },
    isClickable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = () => {
      if (props.isClickable) {
        emit('click', props.stepNumber - 1);
      }
    };
    const indicatorStyle = computed(() => {
      let backgroundColor = props.inactiveColor;
      let color = '#666';
      
      if (props.isCompleted) {
        backgroundColor = props.completedColor;
        color = '#fff';
      } else if (props.isActive) {
        backgroundColor = props.activeColor;
        color = '#fff';
      }
      
      return {
        backgroundColor,
        color,
        borderColor: backgroundColor
      };
    });

    const labelStyle = computed(() => {
      let color = '#666';
      
      if (props.isCompleted) {
        color = props.completedColor;
      } else if (props.isActive) {
        color = props.activeColor;
      }
      
      return { color };
    });

    return {
      indicatorStyle,
      labelStyle,
      handleClick
    };
  }
};
</script>

<style scoped lang="scss">
.step-indicator {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  position: relative;

  // In vertical mode, label appears to the right
  .indicators-container.orientation-vertical & {
    flex-direction: row;
    width: 100%;
    padding: 4px 0; // Add vertical spacing
  }

  // In horizontal mode, label appears below
  .indicators-container.orientation-horizontal & {
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  &.clickable {
    cursor: pointer;

    &:hover .step-number {
      transform: scale(1.05);
    }

    &:active .step-number {
      transform: scale(0.95);
    }
  }

  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
    border: 2px solid;
    transition: all 0.3s ease;
    z-index: 1;
    background: white;
    flex-shrink: 0;

    .checkmark {
      width: 20px;
      height: 20px;
    }
  }

  .step-label {
    font-size: 14px;
    transition: color 0.3s ease;
    font-weight: 500;

    .indicators-container.orientation-horizontal & {
      text-align: center;
    }

    .indicators-container.orientation-vertical & {
      text-align: left;
    }
  }

  &.active .step-number {
    transform: scale(1.1);
  }
}
</style>