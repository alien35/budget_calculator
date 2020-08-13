import React from 'react';
import OnboardingStepTitle from '../../Shared/OnboardingStep/OnboardingStepTitle.component';
import OnboardingStepSubtitle from '../../Shared/OnboardingStep/OnboardingStepSubtitle.component';
import OnboardingStepNavBtnsComponent from '../../Shared/OnboardingStep/OnboardingStepNavBtns.component';

export default function OnboardingReviewStepContent(props) {

  return (
    <div>
      <OnboardingStepTitle>
        Review
      </OnboardingStepTitle>
      <OnboardingStepSubtitle>
        If we had a review page, it would go here!
      </OnboardingStepSubtitle>
      <br />
      <br />
      <OnboardingStepNavBtnsComponent
        canGoNext={false}
        handleBack={props.handleBack}
        canGoBack={true}
      />
    </div>
  )

}
