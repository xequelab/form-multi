---
name: Multi-Step Form
description: A sophisticated multi-step form component with smooth transitions, progress tracking, step indicators, and customizable navigation controls. Each step acts as a dropzone for flexible content.
keywords: multi-step, form, wizard, stepper, progress, validation, transitions, navigation
---

#### Multi-Step Form

***Purpose:***
A comprehensive multi-step form component that guides users through a sequential process with visual feedback and smooth transitions. Perfect for complex forms, onboarding flows, checkout processes, or any multi-stage user journey.

***Features:***
- Dropzone-based steps allowing any WeWeb elements to be added
- Smooth slide and fade transitions between steps
- Visual progress bar showing completion percentage
- Step indicators with active, completed, and inactive states
- Customizable navigation buttons (Previous, Next, Submit)
- Optional step validation to prevent progression
- Flexible styling options for all visual elements
- Exposed internal state for current step and completion status

***Properties:***
- numberOfSteps: number - Number of steps in the form (1-10, default: 3)
- step1Label through step10Label: string - Labels for each step
- step1Content through step10Content: Element - Content dropzones for each step (visibility controlled by numberOfSteps)
- showProgressBar: boolean - Display progress bar (default: true)
- showStepIndicators: boolean - Display step indicators (default: true)
- showNavigationButtons: boolean - Display navigation buttons (default: true)
- enableStepValidation: boolean - Enable step validation (default: false)
- transitionDirection: 'horizontal'|'fade' - Animation style between steps (default: 'horizontal')
- transitionMode: 'out-in'|'in-out'|'default' - Transition timing mode (default: 'out-in')
- previousButtonLabel: string - Text for Previous button (default: 'Previous')
- nextButtonLabel: string - Text for Next button (default: 'Next')
- submitButtonLabel: string - Text for Submit button (default: 'Submit')
- navigationAlignment: 'flex-start'|'center'|'flex-end'|'space-between' - Button alignment (default: 'space-between')
- showCheckmarkOnCompleted: boolean - Show checkmark on completed steps (default: true)
- progressBarHeight: string - Height of progress bar (default: '8px')
- progressBarBackgroundColor: string - Progress bar track color (default: '#e0e0e0')
- progressBarFillColor: string - Progress bar fill color (default: '#007bff')
- activeStepColor: string - Color for active step indicator (default: '#007bff')
- completedStepColor: string - Color for completed step indicators (default: '#28a745')
- inactiveStepColor: string - Color for inactive step indicators (default: '#e0e0e0')
- connectorColor: string - Color of line connecting step indicators (default: '#e0e0e0')
- previousButtonBackgroundColor: string - Previous button background (default: '#6c757d')
- nextButtonBackgroundColor: string - Next button background (default: '#007bff')
- submitButtonBackgroundColor: string - Submit button background (default: '#28a745')
- buttonPadding: string - Padding for all navigation buttons (default: '12px 24px')
- buttonBorderRadius: string - Border radius for buttons (default: '4px')
- containerGap: string - Spacing between sections (default: '24px')

***Events:***
- stepChange: Triggered when navigating between steps. Payload: { previousStep: number, currentStep: number, direction: 'next'|'previous' }
- submit: Triggered when form is submitted on final step. Payload: { completedSteps: number, isValid: boolean }
- reset: Triggered when form is reset. No payload

***Exposed Actions:***
- `nextStep`: Navigate to the next step. No arguments
- `previousStep`: Navigate to the previous step. No arguments
- `goToStep`: Navigate to a specific step. Args: stepIndex (number)
- `setStepValidation`: Set validation state for a step. Args: stepIndex (number), isValid (boolean)
- `resetForm`: Reset form to first step and clear validation states. No arguments
- `submitForm`: Submit the form (only works if on last step and validation passes). No arguments

***Exposed Variables:***
- currentStepIndex: Current step index (0-based). (path: variables['uid-currentStepIndex'])
- isCompleted: Whether form has been submitted. (path: variables['uid-isCompleted'])
- validationStates: Array of validation states for each step. (path: variables['uid-validationStates'])

***Notes:***
- Set the "Number of Steps" property to control how many steps appear (1-10)
- Each step has a separate label and content dropzone (stepXLabel and stepXContent)
- Only the properties for active steps are visible in the editor (based on numberOfSteps)
- Each step dropzone can contain any WeWeb elements (inputs, text, images, etc.)
- When step validation is enabled, use the `setStepValidation` action in workflows to control step progression
- The component automatically prevents navigation in edit mode to allow proper editing
- Step indicators show checkmarks on completed steps when enabled
- The submit button only appears on the final step
- All colors, spacing, and styling can be customized through the properties panel
- Use the exposed variables to create conditional logic based on current step or completion status