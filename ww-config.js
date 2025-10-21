export default {
  options: {
    displayAllowedValues: ['flex', 'inline-flex']
  },
  inherit: {
    type: 'ww-layout'
  },
  editor: {
    label: {
      en: 'Multi-Step Form'
    },
    icon: 'view-list'
  },
  triggerEvents: [
    {
      name: 'stepChange',
      label: { en: 'On step change' },
      event: {
        previousStep: 0,
        currentStep: 1,
        direction: 'next'
      },
      default: true
    },
    {
      name: 'submit',
      label: { en: 'On form submit' },
      event: {
        completedSteps: 0,
        isValid: true
      }
    },
    {
      name: 'reset',
      label: { en: 'On form reset' },
      event: {}
    }
  ],
  actions: [
    {
      label: { en: 'Go to next step' },
      action: 'nextStep'
    },
    {
      label: { en: 'Go to previous step' },
      action: 'previousStep'
    },
    {
      label: { en: 'Go to specific step' },
      action: 'goToStep',
      args: [
        {
          name: 'stepIndex',
          type: 'number'
        }
      ]
    },
    {
      label: { en: 'Set step validation' },
      action: 'setStepValidation',
      args: [
        {
          name: 'stepIndex',
          type: 'number'
        },
        {
          name: 'isValid',
          type: 'boolean'
        }
      ]
    },
    {
      label: { en: 'Reset form' },
      action: 'resetForm'
    },
    {
      label: { en: 'Submit form' },
      action: 'submitForm'
    }
  ],
  properties: {
    numberOfSteps: {
      label: { en: 'Number of Steps' },
      type: 'Number',
      section: 'settings',
      bindable: true,
      defaultValue: 3,
      options: {
        min: 1,
        max: 10
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'number',
        tooltip: 'Number of steps in the form (1-10)'
      },
      propertyHelp: {
        tooltip: 'Set how many steps your form should have'
      }
      /* wwEditor:end */
    },
    step1Label: {
      label: { en: 'Step 1 - Label' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Step 1',
      options: {
        placeholder: 'Enter step 1 label'
      }
    },
    step1Content: {
      label: { en: 'Step 1 - Content' },
      type: 'Element',
      section: 'settings',
      options: {
        placeholder: 'Add content to step 1'
      },
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Step 1'
      }
    },
    step1Condition: {
      label: { en: 'Step 1 - Validation Condition' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      options: {
        placeholder: 'Binding that returns true/false'
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean condition that must be true to proceed from this step'
      },
      propertyHelp: {
        tooltip: 'When false, user cannot proceed to next step and error message is shown'
      }
      /* wwEditor:end */
    },
    step1ErrorMessage: {
      label: { en: 'Step 1 - Error Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Please complete all required fields',
      options: {
        placeholder: 'Error message to display'
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Message shown when validation condition is false'
      },
      propertyHelp: {
        tooltip: 'This message appears within the step when validation fails'
      }
      /* wwEditor:end */
    },
    step2Label: {
      label: { en: 'Step 2 - Label' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Step 2',
      options: {
        placeholder: 'Enter step 2 label'
      },
      hidden: content => (content.numberOfSteps || 3) < 2
    },
    step2Content: {
      label: { en: 'Step 2 - Content' },
      type: 'Element',
      section: 'settings',
      options: {
        placeholder: 'Add content to step 2'
      },
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Step 2'
      },
      hidden: content => (content.numberOfSteps || 3) < 2
    },
    step2Condition: {
      label: { en: 'Step 2 - Validation Condition' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      options: {
        placeholder: 'Binding that returns true/false'
      },
      hidden: content => (content.numberOfSteps || 3) < 2
    },
    step2ErrorMessage: {
      label: { en: 'Step 2 - Error Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Please complete all required fields',
      options: {
        placeholder: 'Error message to display'
      },
      hidden: content => (content.numberOfSteps || 3) < 2
    },
    step3Label: {
      label: { en: 'Step 3 - Label' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Step 3',
      options: {
        placeholder: 'Enter step 3 label'
      },
      hidden: content => (content.numberOfSteps || 3) < 3
    },
    step3Content: {
      label: { en: 'Step 3 - Content' },
      type: 'Element',
      section: 'settings',
      options: {
        placeholder: 'Add content to step 3'
      },
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Step 3'
      },
      hidden: content => (content.numberOfSteps || 3) < 3
    },
    step3Condition: {
      label: { en: 'Step 3 - Validation Condition' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      options: {
        placeholder: 'Binding that returns true/false'
      },
      hidden: content => (content.numberOfSteps || 3) < 3
    },
    step3ErrorMessage: {
      label: { en: 'Step 3 - Error Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Please complete all required fields',
      options: {
        placeholder: 'Error message to display'
      },
      hidden: content => (content.numberOfSteps || 3) < 3
    },
    step4Label: {
      label: { en: 'Step 4 - Label' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Step 4',
      options: {
        placeholder: 'Enter step 4 label'
      },
      hidden: content => (content.numberOfSteps || 3) < 4
    },
    step4Content: {
      label: { en: 'Step 4 - Content' },
      type: 'Element',
      section: 'settings',
      options: {
        placeholder: 'Add content to step 4'
      },
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Step 4'
      },
      hidden: content => (content.numberOfSteps || 3) < 4
    },
    step4Condition: {
      label: { en: 'Step 4 - Validation Condition' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      options: {
        placeholder: 'Binding that returns true/false'
      },
      hidden: content => (content.numberOfSteps || 3) < 4
    },
    step4ErrorMessage: {
      label: { en: 'Step 4 - Error Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Please complete all required fields',
      options: {
        placeholder: 'Error message to display'
      },
      hidden: content => (content.numberOfSteps || 3) < 4
    },
    step5Label: {
      label: { en: 'Step 5 - Label' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Step 5',
      options: {
        placeholder: 'Enter step 5 label'
      },
      hidden: content => (content.numberOfSteps || 3) < 5
    },
    step5Content: {
      label: { en: 'Step 5 - Content' },
      type: 'Element',
      section: 'settings',
      options: {
        placeholder: 'Add content to step 5'
      },
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Step 5'
      },
      hidden: content => (content.numberOfSteps || 3) < 5
    },
    step5Condition: {
      label: { en: 'Step 5 - Validation Condition' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      options: {
        placeholder: 'Binding that returns true/false'
      },
      hidden: content => (content.numberOfSteps || 3) < 5
    },
    step5ErrorMessage: {
      label: { en: 'Step 5 - Error Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Please complete all required fields',
      options: {
        placeholder: 'Error message to display'
      },
      hidden: content => (content.numberOfSteps || 3) < 5
    },
    step6Label: {
      label: { en: 'Step 6 - Label' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Step 6',
      options: {
        placeholder: 'Enter step 6 label'
      },
      hidden: content => (content.numberOfSteps || 3) < 6
    },
    step6Content: {
      label: { en: 'Step 6 - Content' },
      type: 'Element',
      section: 'settings',
      options: {
        placeholder: 'Add content to step 6'
      },
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Step 6'
      },
      hidden: content => (content.numberOfSteps || 3) < 6
    },
    step6Condition: {
      label: { en: 'Step 6 - Validation Condition' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      options: {
        placeholder: 'Binding that returns true/false'
      },
      hidden: content => (content.numberOfSteps || 3) < 6
    },
    step6ErrorMessage: {
      label: { en: 'Step 6 - Error Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Please complete all required fields',
      options: {
        placeholder: 'Error message to display'
      },
      hidden: content => (content.numberOfSteps || 3) < 6
    },
    step7Label: {
      label: { en: 'Step 7 - Label' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Step 7',
      options: {
        placeholder: 'Enter step 7 label'
      },
      hidden: content => (content.numberOfSteps || 3) < 7
    },
    step7Content: {
      label: { en: 'Step 7 - Content' },
      type: 'Element',
      section: 'settings',
      options: {
        placeholder: 'Add content to step 7'
      },
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Step 7'
      },
      hidden: content => (content.numberOfSteps || 3) < 7
    },
    step7Condition: {
      label: { en: 'Step 7 - Validation Condition' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      options: {
        placeholder: 'Binding that returns true/false'
      },
      hidden: content => (content.numberOfSteps || 3) < 7
    },
    step7ErrorMessage: {
      label: { en: 'Step 7 - Error Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Please complete all required fields',
      options: {
        placeholder: 'Error message to display'
      },
      hidden: content => (content.numberOfSteps || 3) < 7
    },
    step8Label: {
      label: { en: 'Step 8 - Label' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Step 8',
      options: {
        placeholder: 'Enter step 8 label'
      },
      hidden: content => (content.numberOfSteps || 3) < 8
    },
    step8Content: {
      label: { en: 'Step 8 - Content' },
      type: 'Element',
      section: 'settings',
      options: {
        placeholder: 'Add content to step 8'
      },
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Step 8'
      },
      hidden: content => (content.numberOfSteps || 3) < 8
    },
    step8Condition: {
      label: { en: 'Step 8 - Validation Condition' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      options: {
        placeholder: 'Binding that returns true/false'
      },
      hidden: content => (content.numberOfSteps || 3) < 8
    },
    step8ErrorMessage: {
      label: { en: 'Step 8 - Error Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Please complete all required fields',
      options: {
        placeholder: 'Error message to display'
      },
      hidden: content => (content.numberOfSteps || 3) < 8
    },
    step9Label: {
      label: { en: 'Step 9 - Label' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Step 9',
      options: {
        placeholder: 'Enter step 9 label'
      },
      hidden: content => (content.numberOfSteps || 3) < 9
    },
    step9Content: {
      label: { en: 'Step 9 - Content' },
      type: 'Element',
      section: 'settings',
      options: {
        placeholder: 'Add content to step 9'
      },
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Step 9'
      },
      hidden: content => (content.numberOfSteps || 3) < 9
    },
    step9Condition: {
      label: { en: 'Step 9 - Validation Condition' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      options: {
        placeholder: 'Binding that returns true/false'
      },
      hidden: content => (content.numberOfSteps || 3) < 9
    },
    step9ErrorMessage: {
      label: { en: 'Step 9 - Error Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Please complete all required fields',
      options: {
        placeholder: 'Error message to display'
      },
      hidden: content => (content.numberOfSteps || 3) < 9
    },
    step10Label: {
      label: { en: 'Step 10 - Label' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Step 10',
      options: {
        placeholder: 'Enter step 10 label'
      },
      hidden: content => (content.numberOfSteps || 3) < 10
    },
    step10Content: {
      label: { en: 'Step 10 - Content' },
      type: 'Element',
      section: 'settings',
      options: {
        placeholder: 'Add content to step 10'
      },
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Step 10'
      },
      hidden: content => (content.numberOfSteps || 3) < 10
    },
    step10Condition: {
      label: { en: 'Step 10 - Validation Condition' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      options: {
        placeholder: 'Binding that returns true/false'
      },
      hidden: content => (content.numberOfSteps || 3) < 10
    },
    step10ErrorMessage: {
      label: { en: 'Step 10 - Error Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Please complete all required fields',
      options: {
        placeholder: 'Error message to display'
      },
      hidden: content => (content.numberOfSteps || 3) < 10
    },
    showProgressBar: {
      label: { en: 'Show Progress Bar' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to show or hide the progress bar'
      },
      propertyHelp: {
        tooltip: 'Display a progress bar showing completion percentage'
      }
      /* wwEditor:end */
    },
    showStepIndicators: {
      label: { en: 'Show Step Indicators' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to show or hide step indicators'
      },
      propertyHelp: {
        tooltip: 'Display numbered indicators for each step'
      }
      /* wwEditor:end */
    },
    showNavigationButtons: {
      label: { en: 'Show Navigation Buttons' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to show or hide navigation buttons'
      },
      propertyHelp: {
        tooltip: 'Display Previous/Next/Submit buttons for navigation'
      }
      /* wwEditor:end */
    },
    enableStepValidation: {
      label: { en: 'Enable Step Validation' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to enable or disable step validation'
      },
      propertyHelp: {
        tooltip: 'When enabled, users cannot proceed to next step unless current step is validated using the "Set step validation" action'
      }
      /* wwEditor:end */
    },
    transitionDirection: {
      label: { en: 'Transition Direction' },
      type: 'TextRadioGroup',
      section: 'settings',
      bindable: true,
      defaultValue: 'horizontal',
      options: {
        choices: [
          {
            value: 'horizontal',
            title: 'Horizontal',
            icon: 'arrow-right'
          },
          {
            value: 'fade',
            title: 'Fade',
            icon: 'eye'
          }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string: "horizontal" or "fade"'
      },
      propertyHelp: {
        tooltip: 'The animation style when transitioning between steps'
      }
      /* wwEditor:end */
    },
    transitionMode: {
      label: { en: 'Transition Mode' },
      type: 'TextSelect',
      section: 'settings',
      bindable: true,
      defaultValue: 'out-in',
      options: {
        options: [
          { value: 'out-in', label: 'Out-In' },
          { value: 'in-out', label: 'In-Out' },
          { value: 'default', label: 'Default' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string: "out-in", "in-out", or "default"'
      },
      propertyHelp: {
        tooltip: 'Controls the timing of enter/leave transitions'
      }
      /* wwEditor:end */
    },
    showPreviousButton: {
      label: { en: 'Show Previous Button' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to show or hide the previous button'
      },
      propertyHelp: {
        tooltip: 'Display the Previous button in navigation'
      }
      /* wwEditor:end */
    },
    showNextButton: {
      label: { en: 'Show Next Button' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to show or hide the next button'
      },
      propertyHelp: {
        tooltip: 'Display the Next button in navigation'
      }
      /* wwEditor:end */
    },
    showSubmitButton: {
      label: { en: 'Show Submit Button' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to show or hide the submit button'
      },
      propertyHelp: {
        tooltip: 'Display the Submit button on the last step'
      }
      /* wwEditor:end */
    },
    previousButtonLabel: {
      label: { en: 'Previous Button Label' },
type: 'Text',
section: 'settings',
bindable: true,
defaultValue: 'Previous',
options: {
placeholder: 'Previous'
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A string for the previous button text'
},
propertyHelp: {
tooltip: 'The text displayed on the Previous button'
}
/* wwEditor:end */
},
nextButtonLabel: {
label: { en: 'Next Button Label' },
type: 'Text',
section: 'settings',
bindable: true,
defaultValue: 'Next',
options: {
placeholder: 'Next'
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A string for the next button text'
},
propertyHelp: {
tooltip: 'The text displayed on the Next button'
}
/* wwEditor:end */
},
submitButtonLabel: {
label: { en: 'Submit Button Label' },
type: 'Text',
section: 'settings',
bindable: true,
defaultValue: 'Submit',
options: {
placeholder: 'Submit'
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A string for the submit button text'
},
propertyHelp: {
tooltip: 'The text displayed on the Submit button'
}
/* wwEditor:end */
},
navigationAlignment: {
label: { en: 'Navigation Alignment' },
type: 'TextRadioGroup',
section: 'settings',
bindable: true,
defaultValue: 'space-between',
options: {
choices: [
{
value: 'flex-start',
title: 'Left',
icon: 'align-left'
},
{
value: 'center',
title: 'Center',
icon: 'align-center'
},
{
value: 'flex-end',
title: 'Right',
icon: 'align-right'
},
{
value: 'space-between',
title: 'Space Between',
icon: 'align-justify'
}
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A string: "flex-start", "center", "flex-end", or "space-between"'
},
propertyHelp: {
tooltip: 'How navigation buttons are aligned horizontally'
}
/* wwEditor:end */
},
showCheckmarkOnCompleted: {
label: { en: 'Show Checkmark on Completed' },
type: 'OnOff',
section: 'settings',
bindable: true,
defaultValue: true,
/* wwEditor:start */
bindingValidation: {
type: 'boolean',
tooltip: 'A boolean to show or hide checkmarks on completed steps'
},
propertyHelp: {
tooltip: 'Display a checkmark icon on completed step indicators'
}
/* wwEditor:end */
},
progressBarHeight: {
label: { en: 'Progress Bar Height' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '8px',
options: {
unitChoices: [
{ value: 'px', label: 'px', min: 1, max: 50 }
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for progress bar height (e.g., "8px")'
},
propertyHelp: {
tooltip: 'The height of the progress bar'
}
/* wwEditor:end */
},
progressBarBackgroundColor: {
label: { en: 'Progress Bar Background' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#e0e0e0',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for the progress bar background'
},
propertyHelp: {
tooltip: 'The background color of the progress bar track'
}
/* wwEditor:end */
},
progressBarFillColor: {
label: { en: 'Progress Bar Fill Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#007bff',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for the progress bar fill'
},
propertyHelp: {
tooltip: 'The color of the progress bar fill'
}
/* wwEditor:end */
},
progressBarBorderRadius: {
label: { en: 'Progress Bar Border Radius' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '4px',
options: {
unitChoices: [
{ value: 'px', label: 'px', min: 0, max: 50 }
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for border radius (e.g., "4px")'
},
propertyHelp: {
tooltip: 'The border radius of the progress bar'
}
/* wwEditor:end */
},
activeStepColor: {
label: { en: 'Active Step Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#007bff',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for the active step indicator'
},
propertyHelp: {
tooltip: 'The color of the current active step indicator'
}
/* wwEditor:end */
},
completedStepColor: {
label: { en: 'Completed Step Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#28a745',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for completed step indicators'
},
propertyHelp: {
tooltip: 'The color of completed step indicators'
}
/* wwEditor:end */
},
inactiveStepColor: {
label: { en: 'Inactive Step Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#e0e0e0',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for inactive step indicators'
},
propertyHelp: {
tooltip: 'The color of inactive/upcoming step indicators'
}
/* wwEditor:end */
},
connectorColor: {
label: { en: 'Connector Line Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#e0e0e0',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for the connector line between steps'
},
propertyHelp: {
tooltip: 'The color of the line connecting step indicators'
}
/* wwEditor:end */
},
connectorHeight: {
label: { en: 'Connector Line Height' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '2px',
options: {
unitChoices: [
{ value: 'px', label: 'px', min: 1, max: 10 }
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for connector line height (e.g., "2px")'
},
propertyHelp: {
tooltip: 'The thickness of the connector line'
}
/* wwEditor:end */
},
previousButtonBackgroundColor: {
label: { en: 'Previous Button Background' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#6c757d',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for the previous button background'
},
propertyHelp: {
tooltip: 'The background color of the Previous button'
}
/* wwEditor:end */
},
previousButtonTextColor: {
label: { en: 'Previous Button Text Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#ffffff',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for the previous button text'
},
propertyHelp: {
tooltip: 'The text color of the Previous button'
}
/* wwEditor:end */
},
nextButtonBackgroundColor: {
label: { en: 'Next Button Background' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#007bff',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for the next button background'
},
propertyHelp: {
tooltip: 'The background color of the Next button'
}
/* wwEditor:end */
},
nextButtonTextColor: {
label: { en: 'Next Button Text Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#ffffff',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for the next button text'
},
propertyHelp: {
tooltip: 'The text color of the Next button'
}
/* wwEditor:end */
},
submitButtonBackgroundColor: {
label: { en: 'Submit Button Background' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#28a745',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for the submit button background'
},
propertyHelp: {
tooltip: 'The background color of the Submit button'
}
/* wwEditor:end */
},
submitButtonTextColor: {
label: { en: 'Submit Button Text Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#ffffff',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for the submit button text'
},
propertyHelp: {
tooltip: 'The text color of the Submit button'
}
/* wwEditor:end */
},
buttonPadding: {
label: { en: 'Button Padding' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '12px 24px',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for button padding (e.g., "12px 24px")'
},
propertyHelp: {
tooltip: 'The padding inside navigation buttons'
}
/* wwEditor:end */
},
buttonBorderRadius: {
label: { en: 'Button Border Radius' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '4px',
options: {
unitChoices: [
{ value: 'px', label: 'px', min: 0, max: 50 }
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for button border radius (e.g., "4px")'
},
propertyHelp: {
tooltip: 'The border radius of navigation buttons'
}
/* wwEditor:end */
},
buttonFontSize: {
label: { en: 'Button Font Size' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '16px',
options: {
unitChoices: [
{ value: 'px', label: 'px', min: 10, max: 32 }
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for button font size (e.g., "16px")'
},
propertyHelp: {
tooltip: 'The font size of navigation button text'
}
/* wwEditor:end */
},
containerGap: {
label: { en: 'Container Gap' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '24px',
options: {
unitChoices: [
{ value: 'px', label: 'px', min: 0, max: 100 }
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for gap between sections (e.g., "24px")'
},
propertyHelp: {
tooltip: 'The spacing between progress bar, indicators, content, and navigation'
}
/* wwEditor:end */
},
navigationGap: {
label: { en: 'Navigation Gap' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '12px',
options: {
unitChoices: [
{ value: 'px', label: 'px', min: 0, max: 50 }
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for gap between navigation buttons (e.g., "12px")'
},
propertyHelp: {
tooltip: 'The spacing between navigation buttons'
}
/* wwEditor:end */
},
stepsMinHeight: {
label: { en: 'Steps Min Height' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: 'auto',
options: {
unitChoices: [
{ value: 'px', label: 'px', min: 0, max: 1000 },
{ value: 'auto', label: 'auto' }
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for minimum height of step content (e.g., "300px" or "auto")'
},
propertyHelp: {
tooltip: 'The minimum height of the step content area'
}
/* wwEditor:end */
},
stepsPadding: {
label: { en: 'Steps Padding' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '0px',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for padding around step content (e.g., "20px")'
},
propertyHelp: {
tooltip: 'The padding around the step content area'
}
/* wwEditor:end */
},
errorMessageBackgroundColor: {
label: { en: 'Error Message Background' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#fee',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for error message background'
},
propertyHelp: {
tooltip: 'Background color of validation error messages'
}
/* wwEditor:end */
},
errorMessageTextColor: {
label: { en: 'Error Message Text Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#c33',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A color value for error message text'
},
propertyHelp: {
tooltip: 'Text color of validation error messages'
}
/* wwEditor:end */
},
errorMessagePadding: {
label: { en: 'Error Message Padding' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '12px 16px',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for error message padding (e.g., "12px 16px")'
},
propertyHelp: {
tooltip: 'Padding inside error messages'
}
/* wwEditor:end */
},
errorMessageBorderRadius: {
label: { en: 'Error Message Border Radius' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '4px',
options: {
unitChoices: [
{ value: 'px', label: 'px', min: 0, max: 50 }
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A length value for error message border radius (e.g., "4px")'
},
propertyHelp: {
tooltip: 'Border radius of error messages'
}
/* wwEditor:end */
}
}
};