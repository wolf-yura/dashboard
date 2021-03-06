import React, {useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import UserService from "../../services/user.service";
import PlanService from "../../services/plan.service";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PlanList = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await UserService.getDeactiveUsers();
            setUsers(response.data);
        } catch (e) {
            setUsers([]);
        }
    };
    fetchUsers();
  }, []);
  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable
        history={history}
        users={users} />
      </div>
    </div>
  );
};

export default PlanList;
