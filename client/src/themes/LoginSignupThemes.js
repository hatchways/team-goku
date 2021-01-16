import { makeStyles } from '@material-ui/core/styles';


const themes = makeStyles({
    primary: {
        fontSize: "1em",
        backgroundColor: "#FF743D",
        color: "#fff",
        textTransform: "none",
        padding: "1em 3em 1em 3em",
        margin: "1em 0 1em 0",
        borderRadius: "0 0 0 0",
        '&:hover': {
            backgroundColor: '#AD6800'
          },
    },
    formTitle: {
        fontSize: "2em",
        margin: "1em 0 1em 0",
    },
    formLabel: {
        color: "#000",
        fontWeight: "bold",
        margin: "0.5em 0 0.5em 0",
    },
    redirect: {
        margin: "0 1em 0 1em"
    },
    redirectAlt: {
        color: "#fff",
        margin: "0 1em 0 1em"
    },
    redirectTextMargin: {
        margin: "0 1em 0 1em"
    },
});

export { themes }