import React from "react";
import "./style.scss";
import Check from "./check";
const Step = ({
  stepNum,
  stepTitle,
  isDisabled,
  isActive,
  isLastElement = false,
  handleStepNumClick,
  isCompleted,
  isNextStepCompleted,
  stepsGap,
  isHorizontal,
}) => {
  const stepSeparatorStyle = {
    height: !isHorizontal
      ? typeof stepsGap === "number"
        ? `${stepsGap}px`
        : stepsGap
      : undefined,
    width: isHorizontal
      ? typeof stepsGap === "number"
        ? `${stepsGap}px`
        : stepsGap
      : undefined,
  };

  return (
    <div
      className={`stepContainer ${
        isHorizontal ? "horizontalStepContainer" : ""
      }`}
    >
      <div className={`step ${isHorizontal ? "horizontalStep" : ""}`}>
        <div
          className={`outerCircle ${isDisabled ? "disabled" : ""} ${
            isActive ? "active" : ""
          }`}
          onClick={handleStepNumClick}
        >
          {isCompleted && !isActive ? (
            <Check height={32} width={32} />
          ) : (
            stepNum
          )}
        </div>
        <span className="stepTitle">{stepTitle}</span>
      </div>
      {!isLastElement && (
        <div
          className={`stepSeparator ${
            isCompleted ? "completedSeparator" : ""
          } ${isActive ? "activeSeparator" : ""} ${
            isActive && !isNextStepCompleted && isHorizontal
              ? "splitInHalfHor"
              : isActive && !isNextStepCompleted && !isHorizontal
              ? "splitInHalfVer"
              : ""
          } ${isHorizontal ? "horizontalSeparator" : ""}`}
          style={stepSeparatorStyle}
        ></div>
      )}
    </div>
  );
};

const Stepper = ({
  stepperInfo,
  completedSteps,
  currentStep = 0,
  setCurrentStep,
  className = "",
  direction = "vertical",
  stepsGap = direction === "horizontal" ? "30px" : "15px",
}) => {
  const isHorizontal = direction === "horizontal";

  const handleStepNumClick = (index) => {
    if (
      completedSteps?.includes(index) ||
      completedSteps?.includes(index - 1)
    ) {
      setCurrentStep(index);
    }
  };

  const checkIfDisabled = (index) => {
    if (
      completedSteps?.includes(index) ||
      completedSteps?.includes(index - 1) ||
      index === 0
    ) {
      return false;
    }
    return true;
  };

  const checkIfCompleted = (index) => {
    return completedSteps?.includes(index);
  };

  return (
    <div
      className={`stepperContainer ${className} ${
        isHorizontal ? "horizontal" : ""
      }`}
    >
      {stepperInfo.length <= 0 ? (
        <></>
      ) : (
        <>
          {stepperInfo.map((step, index) => (
            <Step
              stepsGap={stepsGap}
              stepNum={index + 1}
              stepTitle={step.title}
              isDisabled={checkIfDisabled(index)}
              isLastElement={stepperInfo.length === index + 1}
              isCompleted={checkIfCompleted(index)}
              isNextStepCompleted={checkIfCompleted(index + 1)}
              isActive={currentStep === index}
              handleStepNumClick={() => handleStepNumClick(index)}
              key={index}
              isHorizontal={isHorizontal}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Stepper;
