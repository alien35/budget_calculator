import React from 'react';
import OnboardingBudgetStepContent from './OnboardingBudgetStepContent/OnboardingBudgetStepContent.container';
import OnboardingChecklistStepContent from './OnboardingChecklistStepContent/OnboardingChecklistStepContent.container';
import OnboardingReviewStepContent from './OnboardingReviewStepContent/OnboardingReviewStepContent.container';
import { Switch, Route } from "react-router-dom";
import RedirectToBudget from './RedirectToBudget.component';
import OnboardingStep404 from './OnboardingStep404/OnboardingStep404.component';

export default function OnboardingStepContent(props) {

  return (
    <Switch>
      <Route exact path="/budget">
        <OnboardingBudgetStepContent
          minMaxBudget={props.minMaxBudget}
          onCompleteBudget={props.onCompleteBudget}
        />
      </Route>
      <Route exact path="/checklist">
        <OnboardingChecklistStepContent
          minMaxBudget={props.minMaxBudget}
        />
      </Route>
      <Route exact path="/review">
        <OnboardingReviewStepContent />
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
