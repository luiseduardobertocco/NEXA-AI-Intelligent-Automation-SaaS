"use strict";

const workflowSteps = document.querySelectorAll('.workflow-step');
const workflowStatus = document.getElementById('workflowStatus');
const workflowMessage = document.getElementById('workflowMessage');
const runWorkflowBtn = document.getElementById('runWorkflowBtn');
const resetWorkflowBtn = document.getElementById('resetWorkflowBtn');

const setWorkflowState = (state) => {
  workflowStatus.classList.remove('idle', 'processing', 'completed');
  workflowStatus.classList.add(state);

  if (state === 'processing') {
    workflowStatus.textContent = 'Processing';
  } else if (state === 'completed') {
    workflowStatus.textContent = 'Completed';
  } else {
    workflowStatus.textContent = 'Idle';
  }
};

const resetWorkflow = () => {
  workflowSteps.forEach((step) => {
    step.classList.remove('active', 'completed');
  });
  workflowMessage.textContent = 'Demo workflow is ready to run.';
  setWorkflowState('idle');
};

const runWorkflow = () => {
  resetWorkflow();
  setWorkflowState('processing');
  workflowMessage.textContent = 'Workflow running...';

  let currentIndex = 0;

  const interval = window.setInterval(() => {
    if (currentIndex >= workflowSteps.length) {
      clearInterval(interval);
      workflowSteps.forEach((step) => step.classList.add('completed'));
      setWorkflowState('completed');
      workflowMessage.textContent = 'Workflow completed successfully.';
      return;
    }

    workflowSteps[currentIndex].classList.add('active');
    currentIndex += 1;
  }, 450);
};

if (runWorkflowBtn) {
  runWorkflowBtn.addEventListener('click', runWorkflow);
}

if (resetWorkflowBtn) {
  resetWorkflowBtn.addEventListener('click', resetWorkflow);
}

resetWorkflow();
