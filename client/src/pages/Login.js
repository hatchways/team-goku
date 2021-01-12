import React, { useState } from "react";

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

function Login() {

    const [validationState, setValidationState] = useState(false);

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function validateEmail(email) {
        return re.test(String(email));
    }

    const handleInput = event => {
        if (validateEmail(event.target.value)) {
            setValidationState(true);
        }
        else {
            setValidationState(false);
        }
    };

    return (
        <div>
            Login
            <form>
                <label for="email-input">EMAIL</label>
                {/* <Input
                    onChange={handleInput}
                    required="true"
                    type="email"
                    id="email-input"
                />
                <label for="password-input">PASSWORD</label>
                <Input
                    id="password-input"
                    type="password"
                    minLength="6"
                /> */}
                <input
                    onChange={handleInput}
                    required="true"
                    type="email"
                    id="email-input"
                />
                <label for="password-input">PASSWORD</label>
                <input
                    id="password-input"
                    type="password"
                    minLength="6"
                />
                <Button>
                    SIGN IN
                </Button>
            </form>
            <div>
                Is email valid? {validationState.toString()}
            </div>
        </div>

    );
}

export default Login;