import React, { useState, Fragment } from "react"
import { Link as RouterLink, withRouter, Redirect, useHistory} from 'react-router-dom';
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import FirstStep from "./FirstStep"
import SecondStep from "./SecondStep"
import Confirm from "./Confirm"
import AuthService from "../../services/auth.service";
import SweetAlert from 'sweetalert2-react';
import {
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/styles';
//import Success from "./Success"

const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/)
const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/)
// Step titles
const labels = ["First Step", "Second Step", "Confirmation"]

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  },
  contentForm: {
    padding: 50
  }
}));

const SignUp = () => {
  const history = useHistory();
  const classes = useStyles();
  const [steps, setSteps] = useState(0)
  const [fields, setFields] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm: "",
    investment_type: "",
    birthdate: "",
    gender: "",
    cpf: "",
    cellphone: "",
    zipcode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    investment: "",
    password: "",
    salt: "",
    client_type: "",
  })
  // Copy fields as they all have the same name
  const [filedError, setFieldError] = useState({
    ...fields
  })

  const [isError, setIsError] = useState(false)
  const [statusFail, setStatusFail] = useState(false)
  const [status, setStatus] = useState(false)
  const [message, setMessage] = useState('')
  // Proceed to next step
  const handleNext = () => setSteps(steps + 1)
  // Go back to prev step
  const handleBack = () => setSteps(steps - 1)

  // Handle fields change
  const handleChange = input => ({ target: { value } }) => {
    // Set values to the fields
    setFields({
      ...fields,
      [input]: value
    })

    // Handle errors
    const formErrors = { ...filedError }
    const lengthValidate = value.length > 0 && value.length < 3

    switch (input) {
      case "full_name":
        formErrors.full_name = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
        break
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "Invalid email address"
      break
      case "cpf":
        formErrors.cpf = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "cellphone":
        formErrors.cellphone = phoneRegex.test(value)
          ? ""
          : "Please enter a valid phone number. i.e: xxx-xxx-xxxx"
      break
      case "password":
        formErrors.password = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "confirm":
        formErrors.confirm = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "zipcode":
        formErrors.zipcode = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "birthdate":
        formErrors.birthdate = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "gender":
        formErrors.gender = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "street":
        formErrors.street = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "number":
        formErrors.number = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "complement":
        formErrors.complement = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "neighborhood":
        formErrors.neighborhood = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "city":
        formErrors.city = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "state":
        formErrors.state = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      case "investment":
        formErrors.investment = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
      break
      default:
        break
    }
    // set error hook
    let error_count = 0;
    Object.values(formErrors).forEach(error => {
      if (error.length > 0) {
        error_count = error_count + 1;
        return;
      }
    })
    if(error_count > 0){
      setIsError(true)
    } else {
      setIsError(false)
    }
    // set errors hook
    setFieldError({
      ...formErrors
    })
  }
  const gotoSignIn = () => {
    history.push("/sign-in");
  }
  const handleSteps = step => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            handleNext={handleNext}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        )
      case 1:
        return (
          <SecondStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        )
      case 2:
        return (
          <Confirm
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            submit={submit}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        )
      default:
        break
    }
  }

  const submit = () => {
    if(!isError) {
      AuthService.register(
        fields
      ).then(
        response => {
          setStatusFail(false);
          setStatus(true);
          setMessage(response.data.message);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setStatusFail(true);
          setStatus(false);
          setMessage(resMessage);

        }
      );
    }
  } 
  // Handle components
  return (

    <div className={classes.root}>

      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                "O dinheiro, assim como as emoções, é algo que você precisa controlar para manter sua vida no caminho certo."
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Natasha Munson
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  xcapitalinv.com.br
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
      <div className={classes.content}>
        <div className={classes.contentHeader}>
          <IconButton onClick={gotoSignIn}>
            <ArrowBackIcon />
          </IconButton>
        </div>
      </div>
            <div className={classes.contentForm}>
                <Fragment>
                    {steps === labels.length ? (
                      // <Success />
                      <div></div>
                    ) : (
                      <Fragment>
                        <Stepper
                          activeStep={steps}
                          style={{ paddingTop: 30, paddingBottom: 50 }}
                          alternativeLabel
                        >
                          {labels.map(label => (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                        {handleSteps(steps)}
                      </Fragment>
                    )}
                </Fragment>
            </div>
           </Grid>
      </Grid>
        <SweetAlert
        show={status}
        title="Success"
        text={message}
        type='success'
        onConfirm={() => {
          setStatus(false)      
          history.push("/sign-in");    
        }}
        />
        <SweetAlert
        show={statusFail}
        title="Fail"
        text={message}
        type='error'
        onConfirm={() => {
          setStatusFail(false)
        }}
        />
    </div>
  )
}

export default withRouter(SignUp);
