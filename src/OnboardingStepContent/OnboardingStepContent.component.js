import React from 'react';
import OnboardingBudgetStepContent from './OnboardingBudgetStepContent/OnboardingBudgetStepContent.container';
import OnboardingChecklistStepContent from './OnboardingChecklistStepContent/OnboardingChecklistStepContent.container';
import OnboardingReviewStepContent from './OnboardingReviewStepContent/OnboardingReviewStepContent.container';
import { Switch, Route } from "react-router-dom";
import RedirectToBudget from './RedirectToBudget.component';
import OnboardingStep404 from './OnboardingStep404/OnboardingStep404.component';
import { withRouter } from 'react-router-dom';
import StepsService from '../Services/Steps.service';

function OnboardingStepContent(props) {

  console.log(props.history.location, 'props.history.location')

  const proceedToNext = () => {
    const currentStage = props.history.location.pathname;
    const allSteps = StepsService.getSteps();
    const currentStageIndex = allSteps.map((step) => step.path).indexOf(currentStage);
    props.history.push(allSteps[currentStageIndex + 1].path);
  }

  const goBack = () => {
    const currentStage = props.history.location.pathname;
    const allSteps = StepsService.getSteps();
    const currentStageIndex = allSteps.map((step) => step.path).indexOf(currentStage);
    props.history.push(allSteps[currentStageIndex - 1].path);
  }

  return (
    <Switch>
      <Route exact path="/budget">
        <OnboardingBudgetStepContent
          user={props.user}
          goBack={goBack}
          onComplete={proceedToNext}
        />
      </Route>
      <Route exact path="/checklist">
        <OnboardingChecklistStepContent
          handleBack={goBack}
          onComplete={proceedToNext}
          user={props.user}
        />
      </Route>
      <Route exact path="/review">
        <OnboardingReviewStepContent
          handleBack={goBack}
        />
      </Route>
      <Route exact path="/">
        <RedirectToBudget />
      </Route>
      <Route path="*">
        <OnboardingStep404 />
      </Route>
    </Switch>
  )

}

export default withRouter(OnboardingStepContent);
