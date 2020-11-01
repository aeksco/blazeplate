import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SchemaEditorLayout } from "../component";
import { Story } from "../../dev";
import { testState } from "@codotype/core";
const { cdkGeneratorMeta } = testState;

// // // //

storiesOf("ProjectEditor/SchemaEditor", module).add("renders", () => {
    return (
        <Story>
            <SchemaEditorLayout
                schemas={[]}
                generatorMeta={cdkGeneratorMeta}
                onChange={updatedSchemas => {
                    console.log("Updated Schemas");
                    console.log(updatedSchemas);
                }}
            />
        </Story>
    );
});
