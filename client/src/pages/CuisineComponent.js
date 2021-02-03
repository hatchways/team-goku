import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5px',
    borderRadius: 0,
  }
}));

export default function StandaloneToggleButton(props) {
  const [selected, setSelected] = useState(false);
  const classes = useStyles();
  function handleChange() {
    props.onChange(props.cuisine);
  }

  return (
    <ToggleButton
      value={props.cuisine}
      selected={selected}
      className={classes.root}
      onChange={() => {
        setSelected(!selected);
        handleChange();
      }}
    >
      {props.cuisine}
    </ToggleButton>
  );
}
