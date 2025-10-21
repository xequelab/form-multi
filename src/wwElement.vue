<template>
  <div class="multi-step-form" :style="containerStyle" :class="[`orientation-${stepIndicatorsOrientation}`]">
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

    <!-- Main Content Area (for vertical layout: indicators left, content right) -->
    <div class="main-content-area" :class="[`orientation-${stepIndicatorsOrientation}`]">
      <!-- Step Indicators -->
      <div v-if="showStepIndicators" class="indicators-section">
        <div class="indicators-container" :class="[`orientation-${stepIndicatorsOrientation}`]">
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
            :is-clickable="enableFreeNavigation"
            @click="handleStepClick"
          />
          <div v-if="steps.length > 1" class="connector-line" :class="[`orientation-${stepIndicatorsOrientation}`]" :style="connectorStyle"></div>
        </div>
      </div>

      <!-- Steps Content -->
      <div class="steps-content" :style="stepsContentStyle">
        <template v-if="isEditing">
          <!-- Edit mode: simple v-show without transitions -->
          <template v-for="index in 10" :key="`edit-step-${index}`">
            <div
              v-if="content?.[`step${index}Content`]"
              v-show="(index - 1) === currentStepIndex"
              class="step-wrapper"
            >
              <wwElement v-bind="content[`step${index}Content`]" />
            </div>
          </template>
        </template>

        <template v-else>
          <!-- Preview/Published mode: use transition -->
          <transition :name="transitionName" :mode="transitionMode">
            <div :key="currentStepIndex" class="step-wrapper">
              <wwElement v-bind="currentStep?.content" />

              <!-- Validation Error Message -->
              <transition name="error-fade">
                <div v-if="showValidationError" class="validation-error" :style="errorMessageStyle">
                  <span class="error-icon">⚠</span>
                  <span class="error-text">{{ currentStep?.errorMessage }}</span>
                </div>
              </transition>
            </div>
          </transition>
        </template>
      </div>
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
        :title="!canSubmit && currentStep ? currentStep.errorMessage : ''"
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
        const conditionKey = `step${i}Condition`;
        const errorMessageKey = `step${i}ErrorMessage`;

        stepsArray.push({
          label: props.content?.[labelKey] || `Step ${i}`,
          content: props.content?.[contentKey],
          condition: props.content?.[conditionKey],
          errorMessage: props.content?.[errorMessageKey] || 'Please complete all required fields'
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

    const showValidationError = ref(false);

    const currentStep = computed(() => steps.value?.[currentStepIndex.value] || null);

    const currentStepIsValid = computed(() => {
      const step = currentStep.value;
      if (!step) return true;
      // If condition is undefined or true (default), step is valid
      return step.condition === undefined || step.condition === true || step.condition === 'true';
    });

    const progressPercentage = computed(() => {
      const total = steps.value?.length || 1;
      return ((currentStepIndex.value + 1) / total) * 100;
    });

    const canProceedToNext = computed(() => {
      if (!props.content?.enableStepValidation) return true;
      return validationStates.value?.[currentStepIndex.value] !== false;
    });

    const canSubmit = computed(() => {
      // Check if we're on the last step and if its condition is valid
      const lastStep = steps.value[steps.value.length - 1];
      const lastStepConditionValid = lastStep?.condition === undefined ||
                                     lastStep?.condition === true ||
                                     lastStep?.condition === 'true';

      if (!lastStepConditionValid) return false;

      // If enableStepValidation is on, check all validation states
      if (!props.content?.enableStepValidation) return true;
      return validationStates.value?.every(state => state !== false);
    });

    const transitionName = computed(() => {
      const direction = props.content?.transitionDirection || 'horizontal';
      return direction === 'horizontal' ? 'slide' : 'fade';
    });

    const transitionMode = computed(() => props.content?.transitionMode || 'out-in');

    const containerStyle = computed(() => ({
      gap: props.content?.containerGap || '24px',
      '--step-indicators-gap': props.content?.stepIndicatorsGap || '24px'
    }));

    const stepsContentStyle = computed(() => ({
      minHeight: props.content?.stepsMinHeight || 'auto',
      padding: props.content?.stepsPadding || '0px'
    }));

    const navigationStyle = computed(() => ({
      justifyContent: props.content?.navigationAlignment || 'space-between',
      gap: props.content?.navigationGap || '12px'
    }));

    const connectorStyle = computed(() => {
      const orientation = props.content?.stepIndicatorsOrientation || 'horizontal';
      const thickness = props.content?.connectorHeight || '2px';

      if (orientation === 'vertical') {
        return {
          backgroundColor: props.content?.connectorColor || '#e0e0e0',
          width: thickness,
          height: 'calc(100% - 80px)',
          top: '40px',
          left: '20px'
        };
      } else {
        return {
          backgroundColor: props.content?.connectorColor || '#e0e0e0',
          height: thickness
        };
      }
    });

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

    const errorMessageStyle = computed(() => ({
      backgroundColor: props.content?.errorMessageBackgroundColor || '#fee',
      color: props.content?.errorMessageTextColor || '#c33',
      padding: props.content?.errorMessagePadding || '12px 16px',
      borderRadius: props.content?.errorMessageBorderRadius || '4px'
    }));

    const nextStep = () => {
      if (isEditing.value) return;

      // Check current step validation condition
      if (!currentStepIsValid.value) {
        showValidationError.value = true;
        return;
      }

      if (currentStepIndex.value < steps.value.length - 1 && canProceedToNext.value) {
        const oldIndex = currentStepIndex.value;
        showValidationError.value = false; // Reset error when moving to next step
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
        showValidationError.value = false; // Reset error when going back
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

    const handleStepClick = (targetStepIndex) => {
      if (isEditing.value) return;
      if (!props.content?.enableFreeNavigation) return;
      if (targetStepIndex === currentStepIndex.value) return; // Already on this step

      // Going backwards is always allowed
      if (targetStepIndex < currentStepIndex.value) {
        const oldIndex = currentStepIndex.value;
        showValidationError.value = false;
        setCurrentStepIndex(targetStepIndex);

        emit('trigger-event', {
          name: 'stepChange',
          event: {
            previousStep: oldIndex,
            currentStep: targetStepIndex,
            direction: 'previous'
          }
        });
        return;
      }

      // Going forward - validate ALL steps from current to target (inclusive)
      // We need to check current step AND all intermediate steps
      for (let i = currentStepIndex.value; i < targetStepIndex; i++) {
        const step = steps.value[i];

        // Check step condition
        const conditionValid = step.condition === undefined || step.condition === true || step.condition === 'true';
        if (!conditionValid) {
          // Show error only if it's the current step
          if (i === currentStepIndex.value) {
            showValidationError.value = true;
          }
          return;
        }

        // Check validation state if enableStepValidation is on
        if (props.content?.enableStepValidation) {
          if (validationStates.value?.[i] === false) {
            return;
          }
        }
      }

      // All validations passed - navigate to target step
      const oldIndex = currentStepIndex.value;
      showValidationError.value = false;
      setCurrentStepIndex(targetStepIndex);

      emit('trigger-event', {
        name: 'stepChange',
        event: {
          previousStep: oldIndex,
          currentStep: targetStepIndex,
          direction: 'next'
        }
      });
    };

    const goToStep = (stepIndex) => {
      if (isEditing.value) return false;

      if (stepIndex >= 0 && stepIndex < steps.value.length) {
        const oldIndex = currentStepIndex.value;
        showValidationError.value = false; // Reset error when jumping to step
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

    // Watch for condition changes to auto-hide error when it becomes valid
    watch(currentStepIsValid, (isValid) => {
      if (isValid && showValidationError.value) {
        showValidationError.value = false;
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
      errorMessageStyle,
      showValidationError,
      currentStepIsValid,
      showProgressBar: computed(() => props.content?.showProgressBar !== false),
      showStepIndicators: computed(() => props.content?.showStepIndicators !== false),
      stepIndicatorsOrientation: computed(() => props.content?.stepIndicatorsOrientation || 'horizontal'),
      enableFreeNavigation: computed(() => props.content?.enableFreeNavigation === true),
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
      submitForm,
      handleStepClick
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

  // Main content area - controls layout of indicators and content
  .main-content-area {
    display: flex;
    width: 100%;
    gap: 24px;

    // Horizontal orientation: indicators on top, content below (stacked)
    &.orientation-horizontal {
      flex-direction: column;
    }

    // Vertical orientation: indicators on left, content on right (side by side)
    &.orientation-vertical {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  .indicators-section {
    // In horizontal mode: full width
    .main-content-area.orientation-horizontal & {
      width: 100%;
    }

    // In vertical mode: fixed width for indicators column
    .main-content-area.orientation-vertical & {
      flex-shrink: 0;
      min-width: 250px;
    }

    .indicators-container {
      display: flex;
      position: relative;

      &.orientation-horizontal {
        flex-direction: row;
        align-items: flex-start;
      }

      &.orientation-vertical {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--step-indicators-gap, 24px);
      }

      .connector-line {
        position: absolute;
        z-index: 0;

        &.orientation-horizontal {
          top: 20px;
          left: 0;
          right: 0;
          width: 100%;
        }

        &.orientation-vertical {
          // Position and dimensions set via inline style
        }
      }
    }
  }

  .steps-content {
    position: relative;
    overflow: hidden;

    // In horizontal mode: full width
    .main-content-area.orientation-horizontal & {
      width: 100%;
    }

    // In vertical mode: flex to take remaining space
    .main-content-area.orientation-vertical & {
      flex: 1;
    }

    .step-wrapper {
      width: 100%;
    }

    .validation-error {
      margin-top: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid currentColor;
      font-size: 14px;
      font-weight: 500;

      .error-icon {
        font-size: 18px;
        flex-shrink: 0;
      }

      .error-text {
        flex: 1;
      }
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

.error-fade-enter-active,
.error-fade-leave-active {
  transition: all 0.3s ease;
}

.error-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>