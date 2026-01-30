import React from "react";
import {
  Connector,
  StepCircle,
  StepContainer,
  StepLabel,
  StepperWrapper,
} from "../../styles/components/Stepper";

export default function Stepper({ steps, currentStep, onStepChange }) {
  const handleStepClick = (id) => {
    onStepChange(id);
  };
  return (
    <div>
      <StepperWrapper>
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <StepContainer
              key={step.id}
              onClick={() => handleStepClick(step.id)}

            >
              <StepCircle active={isActive} completed={isCompleted}>
                {step.id}
              </StepCircle>
              <StepLabel active={isActive} style={{
    borderBottom: isActive ? "2.5px solid #006172" : "2.5px solid transparent",
    paddingBottom: "8px",
  }}>{step.label}</StepLabel>
              {index !== steps.length - 1 && (
                <Connector completed={isCompleted} />
              )}
            </StepContainer>
          );
        })}
      </StepperWrapper>

      <div
        style={{
          marginTop: "24px",
          padding: "16px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        {steps[currentStep - 1] ? steps[currentStep - 1].content : null}
      </div>
    </div>
  );
}
