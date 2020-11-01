import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../dev";
import { AppFooter } from "../AppFooter";

// // // //

storiesOf("Components/AppFooter", module).add("renders", () => {
    return (
        <Story>
            <AppFooter />
        </Story>
    );
});
