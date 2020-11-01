import * as React from "react";
import { ConfigurationInput } from "../configuration_group_input";
import { SchemaEditorLayout } from "../schema_editor";
import {
    Project,
    Schema,
    GeneratorMeta,
    ConfigurationGroup,
    OptionValueInstance,
} from "@codotype/core";
import { GeneratorStart } from "../generator_start";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

// // // //

export function ConfigurationGroupTab(props: {
    label: string;
    active: boolean;
    pinned?: boolean;
    onClick: () => void;
}) {
    const { label, pinned = false } = props;
    const btnClassName: string[] = ["nav-link"];
    if (props.active) {
        btnClassName.push("active");
    }

    if (props.pinned) {
        btnClassName.push("bg-dark mr-2 text-white");
    }

    return (
        <li className="nav-item">
            <a
                // href="#"
                // TODO - fix styles here, replace with <button>
                className={btnClassName.join(" ")}
                style={{
                    cursor: "pointer",
                }}
                onClick={props.onClick}
            >
                {props.pinned && (
                    <FontAwesomeIcon icon={faFlag} className="mr-2" />
                )}
                {label}
            </a>
        </li>
    );
}

/**
 * ConfigurationGroupSelector
 * @param props.project
 * @param props.generatorMeta
 * @param props.onChange
 */
export function ConfigurationGroupSelector(props: {
    project: Project;
    generatorMeta: GeneratorMeta;
    onChange: (updatedProject: Project) => void;
}) {
    const { generatorMeta } = props;
    // Gets default ConfigurationGroup to render
    const defaultConfigurationGroup: ConfigurationGroup | undefined =
        generatorMeta.configurationGroups[0];

    // If there is no default ConfigurationGroup, return null
    if (!defaultConfigurationGroup) {
        return null;
    }

    // Stores the currently selected ConfigurationGroup
    const [
        selectedConfigurationGroup,
        selectConfigurationGroup,
    ] = React.useState<ConfigurationGroup>(defaultConfigurationGroup);

    // Defines a flag indicating whether or not the SchemaEditor is enabled for props.generator
    // If false, schemas will not be selectable
    const {
        configurationGroups,
        supportedDatatypes,
        supportedRelations,
    } = generatorMeta.schemaEditorConfiguration;
    const enableSchemaEditor: boolean =
        configurationGroups.length > 0 ||
        supportedDatatypes.length > 0 ||
        supportedRelations.length > 0;

    // NOTE - enable/disable this if schemas aren't supported
    const [viewingSchemas, setViewingSchemas] = React.useState<boolean>(
        enableSchemaEditor,
    );

    // NOTE - enable/disable this if schemas aren't supported
    const [viewingReadme, setViewingReadme] = React.useState<boolean>(false);

    return (
        <div className="row">
            <div className="col-lg-12">
                <ul className="nav nav-pills">
                    <ConfigurationGroupTab
                        pinned
                        onClick={() => {
                            setViewingReadme(true);
                            setViewingSchemas(false);
                        }}
                        active={viewingReadme}
                        label={"Start"}
                        // label={"README.md"}
                    />

                    {enableSchemaEditor && (
                        <ConfigurationGroupTab
                            onClick={() => {
                                setViewingReadme(false);
                                setViewingSchemas(true);
                            }}
                            active={viewingSchemas}
                            label={"Schemas"}
                        />
                    )}

                    {/* Renders the navigation for selecting a ConfigurationGroup */}
                    {generatorMeta.configurationGroups.map(
                        (configurationGroup: ConfigurationGroup) => {
                            return (
                                <ConfigurationGroupTab
                                    key={configurationGroup.identifier}
                                    onClick={() => {
                                        setViewingSchemas(false);
                                        setViewingReadme(false);
                                        selectConfigurationGroup(
                                            configurationGroup,
                                        );
                                    }}
                                    active={
                                        configurationGroup.identifier ===
                                            selectedConfigurationGroup.identifier &&
                                        !viewingSchemas &&
                                        !viewingReadme
                                    }
                                    label={configurationGroup.label}
                                />
                            );
                        },
                    )}
                </ul>
            </div>
            <div className="col-lg-12">
                {/* Renders the ConfigurationInput */}
                {!viewingSchemas && !viewingReadme && (
                    <ConfigurationInput
                        configurationGroup={selectedConfigurationGroup}
                        value={
                            props.project.configuration[
                                selectedConfigurationGroup.identifier
                            ]
                        }
                        onChange={(updatedVal: OptionValueInstance) => {
                            // Defines updatd project with latest configuration value
                            const updatedProject: Project = {
                                ...props.project,
                                configuration: {
                                    ...props.project.configuration,
                                    [selectedConfigurationGroup.identifier]: updatedVal,
                                },
                            };

                            // Invokes props.onChange with updated project
                            props.onChange(updatedProject);
                        }}
                    />
                )}

                {/* Render README tab */}
                {viewingReadme && (
                    <div className="mt-4">
                        <div className="card card-body">
                            <GeneratorStart generator={props.generatorMeta} />
                        </div>
                    </div>
                )}

                {/* Render SchemaEditorLayout */}
                {viewingSchemas && enableSchemaEditor && (
                    <SchemaEditorLayout
                        schemas={props.project.schemas}
                        generatorMeta={generatorMeta}
                        onChange={(updatedSchemas: Schema[]) => {
                            console.log("Updated Schemas");
                            console.log(updatedSchemas);
                            // Defines updated project
                            // TODO - update configuation after schemas update?
                            const updatedProject: Project = {
                                ...props.project,
                                schemas: [...updatedSchemas],
                            };

                            // Invokes props.onChange with updated project
                            props.onChange(updatedProject);
                        }}
                    />
                )}
            </div>
            {/* <pre>{JSON.stringify(val, null, 4)}</pre> */}
            {/* <pre>{JSON.stringify(props.configurationGroup, null, 4)}</pre> */}
        </div>
    );
}
