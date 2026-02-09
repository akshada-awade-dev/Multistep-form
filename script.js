// Initialize Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
const stepBoxes = [...document.querySelectorAll("[data-step-number]")];
const stepIndicator = document.querySelector(".step-indicator");

let currentStep = 0;
let isReverse = false;
showCurrentStep();

multiStepForm.addEventListener("click", e => {
    let incrementor;

    if (e.target.matches("[data-next]")) {
        incrementor = 1;
        isReverse = false;
    } else if (e.target.matches("[data-previous]")) {
        incrementor = -1;
        isReverse = true;
    } else if (e.target.matches("[data-step-number]")) {
        // Handle step indicator clicks
        const targetStep = parseInt(e.target.dataset.stepNumber) - 1;
        if (targetStep === currentStep) {
            return; // Already on this step
        }
        isReverse = targetStep < currentStep;
        incrementor = targetStep - currentStep;
    } else {
        return;
    }

    if (incrementor == null) {
        return;
    }
    const skipValidation = e.target.matches("[data-step-number]");
    const inputs = [...formSteps[currentStep].querySelectorAll("input")]
    const allValid = skipValidation || inputs.every(input => input.reportValidity());

    if (allValid) {
        const previousStep = currentStep;
        currentStep += incrementor;

        // Animate out the previous step
        formSteps[previousStep].classList.remove("show");
        formSteps[previousStep].classList.add("animating");
        if (isReverse) {
            formSteps[previousStep].classList.add("reverse");
        } else {
            formSteps[previousStep].classList.remove("reverse");
        }

        // Wait for animation to complete, then switch steps
        setTimeout(() => {
            formSteps[previousStep].classList.remove("animating");
            formSteps[previousStep].classList.remove("reverse");
            showCurrentStep();
        }, 500);
    }
});

function showCurrentStep() {
    formSteps.forEach((step, index) => {
        if (index !== currentStep) {
            step.classList.add("hidden");
            step.classList.remove("show");
            step.classList.remove("reverse");
        } else {
            step.classList.remove("hidden");
            step.classList.add("show");
            if (isReverse) {
                step.classList.add("reverse");
            } else {
                step.classList.remove("reverse");
            }
        }
    });

    // Update step indicators
    stepBoxes.forEach((box, index) => {
        if (index === currentStep) {
            box.classList.add("active");
        } else {
            box.classList.remove("active");
        }
    });

    // Update progress bar
    stepIndicator.classList.remove("step-1", "step-2", "step-3");
    stepIndicator.classList.add(`step-${currentStep + 1}`);
}