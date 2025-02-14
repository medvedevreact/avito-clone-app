declare module "react-stepper-horizontal" {
  import React from "react";

  interface Step {
    title: string;
  }

  interface StepperProps {
    steps: Step[];
    activeStep?: number;
    className?: string;
  }

  const Stepper: React.FC<StepperProps>;

  export default Stepper;
}
