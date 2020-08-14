import React from 'react';
import OnboardingStepTitle from '../../Shared/OnboardingStep/OnboardingStepTitle.component';
import OnboardingStepSubtitle from '../../Shared/OnboardingStep/OnboardingStepSubtitle.component';
import OnboardingStepNavBtnsComponent from '../../Shared/OnboardingStep/OnboardingStepNavBtns.component';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import OnboardingStepReviewItem from '../../Shared/OnboardingStep/OnboardingStepReviewItem.component';
import Divider from '@material-ui/core/Divider';
import CurrencyService from '../../Services/Currency.service';

const useStyles = makeStyles((theme) => ({
  selectedItem: {

  }
}));

export default function OnboardingReviewStepContent(props) {
  const classes = useStyles();

  return (
    <div>
      <OnboardingStepTitle>
        Review
      </OnboardingStepTitle>
      <OnboardingStepSubtitle>
        Take a minute to review your selected items before continuing.
      </OnboardingStepSubtitle>
      <br />
      <br />
      {
        props.user.selectedItems.map((item) => (
          <React.Fragment key={item}>
            <OnboardingStepReviewItem
              id={item}
              items={props.items}
            />
          </React.Fragment>
        ))
      }
      <br />
      <Divider />
      <br />
      <Typography variant="h6" component="h1" className={classes.bottomText}>Estimate: {props.user.prettySelectedItemsPriceRange(props.items)}</Typography>
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
