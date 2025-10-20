<template>
  <div class="multi-step-form" :style="containerStyle">
    <!-- Progress Bar -->
    <div v-if="showProgressBar" class="progress-section">
      <ProgressBar
        :progress="progressPercentage"
        :height="progressBarHeight"
        :background-color="progressBarBackgroundColor"
        :fill-color="progressBarFillColor"
        :border-radius="progressBarBorderRadius"
      />
    </div>

    <!-- Step Indicators -->
    <div v-if="showStepIndicators" class="indicators-section">
      <div class="indicators-container">
        <StepIndicator
          v-for="(step, index) in steps"
          :key="index"
          :step-number="index + 1"
          :label="step.label"
          :is-active="currentStepIndex === index"
          :is-completed="index < currentStepIndex"
          :active-color="activeStepColor"
          :completed-color="completedStepColor"
          :inactive-color="inactiveStepColor"
          :show-checkmark="showCheckmarkOnCompleted"
        />
        <div v-if="steps.length > 1" class="connector-line" :style="connectorStyle"></div>
      </div>
    </div>

    <!-- Steps Content -->
    <div class="steps-content" :style="stepsContentStyle">
      <!-- In edit mode, render steps that have content -->
      <template v-if="isEditing">
        <template v-for="index in 10" :key="index">
          <div
            v-if="content?.[`step${index}Content`]"
            class="step-wrapper"
            :style="{ display: (index - 1) === currentStepIndex ? 'block' : 'none' }"
          >
            <wwElement v-bind="content[`step${index}Content`]" />
          </div>
        </template>
      </template>
      <!-- In preview/published mode, use transition -->
      <template v-else>
        <transition :name="transitionName" :mode="transitionMode">
          <div :key="currentStepIndex" class="step-wrapper">
            <wwElement v-bind="currentStep?.content" />
          </div>
        </transition>
      </template>
    </div>

    <!-- Navigation Buttons -->
    <div v-if="showNavigationButtons" class="navigation-section" :style="navigationStyle">
      <button
        v-if="showPreviousButton && currentStepIndex > 0"
        class="nav-button prev-button"
        :style="previousButtonStyle"
        @click="previousStep"
      >
        {{ previousButtonLabel }}
      </button>
      
      <button
        v-if="showNextButton && currentStepIndex < steps.length - 1"
        class="nav-button next-button"
        :style="nextButtonStyle"
        :disabled="!canProceedToNext"
        @click="nextStep"
      >
        {{ nextButtonLabel }}
      </button>
      
      <button
        v-if="showSubmitButton && currentStepIndex === steps.length - 1"
        class="nav-button submit-button"
        :style="submitButtonStyle"
        :disabled="!canSubmit"
        @click="submitForm"
      >
        {{ submitButtonLabel }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import StepIndicator from './components/StepIndicator.vue';
import ProgressBar from './components/ProgressBar.vue';

export default {
  name: 'MultiStepForm',
  components: {
    StepIndicator,
    ProgressBar
  },
  props: {
    content: {
      type: Object,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    /* wwEditor:start */
    wwEditorState: {
      type: Object,
      required: true
    }
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    const isEditing = computed(() => {
      /* wwEditor:start */
      return props.wwEditorState.isEditing;
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    const steps = computed(() => {
      const numberOfSteps = props.content?.numberOfSteps || 3;
      const stepsArray = [];

      for (let i = 1; i <= numberOfSteps && i <= 10; i++) {
        const labelKey = `step${i}Label`;
        const contentKey = `step${i}Content`;
        stepsArray.push({
          label: props.content?.[labelKey] || `Step ${i}`,
          content: props.content?.[contentKey]
        });
      }

      return stepsArray;
    });
    
    const { value: currentStepIndex, setValue: setCurrentStepIndex } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'currentStepIndex',
      type: 'number',
      defaultValue: 0
    });

    const { value: isCompleted, setValue: setIsCompleted } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'isCompleted',
      type: 'boolean',
      defaultValue: false
    });

    const { value: validationStates, setValue: setValidationStates } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'validationStates',
      type: 'array',
      defaultValue: computed(() => (steps.value || []).map(() => true))
    });

    const currentStep = computed(() => steps.value?.[currentStepIndex.value] || null);

    const progressPercentage = computed(() => {
      const total = steps.value?.length || 1;
      return ((currentStepIndex.value + 1) / total) * 100;
    });

    const canProceedToNext = computed(() => {
      if (!props.content?.enableStepValidation) return true;
      return validationStates.value?.[currentStepIndex.value] !== false;
    });

    const canSubmit = computed(() => {
      if (!props.content?.enableStepValidation) return true;
      return validationStates.value?.every(state => state !== false);
    });

    const transitionName = computed(() => {
      const direction = props.content?.transitionDirection || 'horizontal';
      return direction === 'horizontal' ? 'slide' : 'fade';
    });

    const transitionMode = computed(() => props.content?.transitionMode || 'out-in');

    const containerStyle = computed(() => ({
      gap: props.content?.containerGap || '24px'
    }));

    const stepsContentStyle = computed(() => ({
      minHeight: props.content?.stepsMinHeight || 'auto',
      padding: props.content?.stepsPadding || '0px'
    }));

    const navigationStyle = computed(() => ({
      justifyContent: props.content?.navigationAlignment || 'space-between',
      gap: props.content?.navigationGap || '12px'
    }));

    const connectorStyle = computed(() => ({
      backgroundColor: props.content?.connectorColor || '#e0e0e0',
      height: props.content?.connectorHeight || '2px'
    }));

    const previousButtonStyle = computed(() => ({
      backgroundColor: props.content?.previousButtonBackgroundColor || '#6c757d',
      color: props.content?.previousButtonTextColor || '#ffffff',
      padding: props.content?.buttonPadding || '12px 24px',
      borderRadius: props.content?.buttonBorderRadius || '4px',
      fontSize: props.content?.buttonFontSize || '16px'
    }));

    const nextButtonStyle = computed(() => ({
      backgroundColor: props.content?.nextButtonBackgroundColor || '#007bff',
      color: props.content?.nextButtonTextColor || '#ffffff',
      padding: props.content?.buttonPadding || '12px 24px',
      borderRadius: props.content?.buttonBorderRadius || '4px',
      fontSize: props.content?.buttonFontSize || '16px'
    }));

    const submitButtonStyle = computed(() => ({
      backgroundColor: props.content?.submitButtonBackgroundColor || '#28a745',
      color: props.content?.submitButtonTextColor || '#ffffff',
      padding: props.content?.buttonPadding || '12px 24px',
      borderRadius: props.content?.buttonBorderRadius || '4px',
      fontSize: props.content?.buttonFontSize || '16px'
    }));

    const nextStep = () => {
      if (isEditing.value) return;
      
      if (currentStepIndex.value < steps.value.length - 1 && canProceedToNext.value) {
        const oldIndex = currentStepIndex.value;
        setCurrentStepIndex(currentStepIndex.value + 1);
        
        emit('trigger-event', {
          name: 'stepChange',
          event: {
            previousStep: oldIndex,
            currentStep: currentStepIndex.value,
            direction: 'next'
          }
        });
      }
    };

    const previousStep = () => {
      if (isEditing.value) return;
      
      if (currentStepIndex.value > 0) {
        const oldIndex = currentStepIndex.value;
        setCurrentStepIndex(currentStepIndex.value - 1);
        
        emit('trigger-event', {
          name: 'stepChange',
          event: {
            previousStep: oldIndex,
            currentStep: currentStepIndex.value,
            direction: 'previous'
          }
        });
      }
    };

    const goToStep = (stepIndex) => {
      if (isEditing.value) return false;
      
      if (stepIndex >= 0 && stepIndex < steps.value.length) {
        const oldIndex = currentStepIndex.value;
        setCurrentStepIndex(stepIndex);
        
        emit('trigger-event', {
          name: 'stepChange',
          event: {
            previousStep: oldIndex,
            currentStep: stepIndex,
            direction: stepIndex > oldIndex ? 'next' : 'previous'
          }
        });
        
        return true;
      }
      return false;
    };

    const setStepValidation = (stepIndex, isValid) => {
      if (stepIndex >= 0 && stepIndex < steps.value.length) {
        const newStates = [...(validationStates.value || [])];
        newStates[stepIndex] = isValid;
        setValidationStates(newStates);
        return true;
      }
      return false;
    };

    const resetForm = () => {
      if (isEditing.value) return;
      
      setCurrentStepIndex(0);
      setIsCompleted(false);
      setValidationStates((steps.value || []).map(() => true));
      
      emit('trigger-event', {
        name: 'reset',
        event: {}
      });
    };

    const submitForm = () => {
      if (isEditing.value) return;
      
      if (canSubmit.value) {
        setIsCompleted(true);
        
        emit('trigger-event', {
          name: 'submit',
          event: {
            completedSteps: steps.value.length,
            isValid: canSubmit.value
          }
        });
      }
    };

    watch(() => steps.value?.length, (newLength, oldLength) => {
      if (newLength !== oldLength) {
        setValidationStates((steps.value || []).map(() => true));
        if (currentStepIndex.value >= newLength) {
          setCurrentStepIndex(Math.max(0, newLength - 1));
        }
      }
    });

    return {
      isEditing,
      steps,
      currentStepIndex,
      currentStep,
      progressPercentage,
      canProceedToNext,
      canSubmit,
      transitionName,
      transitionMode,
      containerStyle,
      stepsContentStyle,
      navigationStyle,
      connectorStyle,
      previousButtonStyle,
      nextButtonStyle,
      submitButtonStyle,
      showProgressBar: computed(() => props.content?.showProgressBar !== false),
      showStepIndicators: computed(() => props.content?.showStepIndicators !== false),
      showNavigationButtons: computed(() => props.content?.showNavigationButtons !== false),
      showPreviousButton: computed(() => props.content?.showPreviousButton !== false),
      showNextButton: computed(() => props.content?.showNextButton !== false),
      showSubmitButton: computed(() => props.content?.showSubmitButton !== false),
      previousButtonLabel: computed(() => props.content?.previousButtonLabel || 'Previous'),
      nextButtonLabel: computed(() => props.content?.nextButtonLabel || 'Next'),
      submitButtonLabel: computed(() => props.content?.submitButtonLabel || 'Submit'),
      progressBarHeight: computed(() => props.content?.progressBarHeight || '8px'),
      progressBarBackgroundColor: computed(() => props.content?.progressBarBackgroundColor || '#e0e0e0'),
      progressBarFillColor: computed(() => props.content?.progressBarFillColor || '#007bff'),
      progressBarBorderRadius: computed(() => props.content?.progressBarBorderRadius || '4px'),
      activeStepColor: computed(() => props.content?.activeStepColor || '#007bff'),
      completedStepColor: computed(() => props.content?.completedStepColor || '#28a745'),
      inactiveStepColor: computed(() => props.content?.inactiveStepColor || '#e0e0e0'),
      showCheckmarkOnCompleted: computed(() => props.content?.showCheckmarkOnCompleted !== false),
      nextStep,
      previousStep,
      goToStep,
      setStepValidation,
      resetForm,
      submitForm
    };
  }
};
</script>

<style scoped lang="scss">
.multi-step-form {
  display: flex;
  flex-direction: column;
  width: 100%;

  .progress-section {
    width: 100%;
  }

  .indicators-section {
    width: 100%;
    
    .indicators-container {
      display: flex;
      align-items: flex-start;
      position: relative;
      
      .connector-line {
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
        z-index: 0;
      }
    }
  }

  .steps-content {
    width: 100%;
    position: relative;
    overflow: hidden;

    .step-wrapper {
      width: 100%;
    }
  }

  .navigation-section {
    display: flex;
    width: 100%;

    .nav-button {
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
      outline: none;

      &:hover:not(:disabled) {
        opacity: 0.9;
        transform: translateY(-1px);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>