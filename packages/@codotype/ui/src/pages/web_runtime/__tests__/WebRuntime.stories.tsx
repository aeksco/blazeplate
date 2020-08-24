import * as React from "react";
import { storiesOf } from "@storybook/react";
import { WebRuntime } from "../component";
import { Story } from "@src/components/dev";
import { RuntimeProvider } from "@src/components/runtime_provider";
import { ProjectEditor } from "@src/components/project_editor";
import {
    Project,
    Datatype,
    SchemaSource,
    GeneratorMeta,
    testState,
    ATTRIBUTE_ADDON_UNIQUE,
    ATTRIBUTE_ADDON_REQUIRED,
    ATTRIBUTE_ADDON_NULLABLE,
    ATTRIBUTE_ADDON_PRIMARY_KEY,
    RelationType,
    OptionType,
    Codotype,
    GroupLayoutVariant,
    PropertyLayoutVariant,
} from "@codotype/core";
import { generatorReadme } from "@src/components/markdown_renderer/__tests__/test_state";
const { cdkGeneratorMeta, dummyGeneratorMeta } = testState;

// // // //

const ApiActionsProperty = new Codotype.ConfigurationGroupProperty({
    type: OptionType.COLLECTION,
    identifier: "api_actions_value",
    label: "API Actions",
    description: "Generate additional API actions",
    defaultValue: [],
    layoutVariant: PropertyLayoutVariant.COL_12,
    properties: [
        new Codotype.ConfigurationGroupProperty({
            label: "API Scope",
            identifier: "scope",
            description:
                "Whether this route is scoped to the Collection or a single Model",
            type: OptionType.DROPDOWN,
            layoutVariant: PropertyLayoutVariant.COL_6,
            defaultValue: "COLLECTION",
            dropdownOptions: [
                { value: "COLLECTION", label: "Collection" },
                { value: "MODEL", label: "Model" },
            ],
        }),
        new Codotype.ConfigurationGroupProperty({
            label: "API Verb",
            identifier: "verb",
            description: "RETS API VERB",
            type: OptionType.DROPDOWN,
            layoutVariant: PropertyLayoutVariant.COL_6,
            defaultValue: "GET",
            dropdownOptions: [
                { value: "GET", label: "GET" },
                { value: "POST", label: "POST" },
                { value: "PUT", label: "PUT" },
                {
                    value: "DELETE",
                    label: "DELETE",
                },
            ],
        }),
        new Codotype.ConfigurationGroupProperty({
            label: "API Route",
            identifier: "route",
            description: "Route for the API Action",
            defaultValue: "verify",
            type: OptionType.STRING,
            layoutVariant: PropertyLayoutVariant.COL_6,
        }),
        new Codotype.ConfigurationGroupProperty({
            label: "Function Name",
            identifier: "functionName",
            description: "Name of this function in the Express.js controller",
            defaultValue: "verify",
            type: OptionType.STRING,
            layoutVariant: PropertyLayoutVariant.COL_6,
        }),
    ],
});

const NestedCollectionProperty = {
    ...ApiActionsProperty,
    identifier: "nested_api_actions",
    properties: [
        ...ApiActionsProperty.properties,
        {
            ...ApiActionsProperty,
            layoutVariant: PropertyLayoutVariant.CARD_COL_12,
        },
    ],
};

const stories: [string, GeneratorMeta][] = [
    ["w/ schemas", dummyGeneratorMeta],
    [
        "w/ schemas + schema configuration groups",
        {
            ...dummyGeneratorMeta,
            id: "chrome_extension_generator_03", // unique ID for the generator
            schemaEditorConfiguration: {
                ...dummyGeneratorMeta.schemaEditorConfiguration,
                attributeAddons: [
                    ATTRIBUTE_ADDON_UNIQUE,
                    ATTRIBUTE_ADDON_REQUIRED,
                    ATTRIBUTE_ADDON_NULLABLE,
                    ATTRIBUTE_ADDON_PRIMARY_KEY,
                ],
                configurationGroups: [
                    {
                        ...dummyGeneratorMeta.configurationGroups[0],
                        layoutVariant: GroupLayoutVariant.LIST,
                    },
                ],
            },
        },
    ],
    [
        "w/ schemas + default attributes",
        {
            ...dummyGeneratorMeta,
            id: "chrome_extension_generator_04", // unique ID for the generator
            schemaEditorConfiguration: {
                ...dummyGeneratorMeta.schemaEditorConfiguration,
                attributeAddons: [
                    ATTRIBUTE_ADDON_UNIQUE,
                    ATTRIBUTE_ADDON_REQUIRED,
                    ATTRIBUTE_ADDON_NULLABLE,
                    ATTRIBUTE_ADDON_PRIMARY_KEY,
                ],
                defaultAttributes: [
                    {
                        id: "UUID-Attribute",
                        identifiers: {
                            label: "ID",
                            snake: "id",
                            camel: "id",
                            pascal: "Id",
                            kebab: "id",
                        },
                        addons: {
                            [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: true,
                        },
                        datatype: Datatype.UUID,
                        locked: true,
                        source: SchemaSource.GENERATOR,
                        internalNote: "",
                        defaultValue: null,
                    },
                ],
            },
        },
    ],
    [
        "AWS CDK Starter",
        {
            ...cdkGeneratorMeta,
            configurationGroups: [
                {
                    ...testState.ComponentBuilderConfigurationGroup,
                    layoutVariant: GroupLayoutVariant.LIST,
                },
                testState.SideBySideConfigurationGroup,
                {
                    ...testState.SideBySideConfigurationGroup,
                    label: "API Actions",
                    identifier: "api_actions",
                    properties: [ApiActionsProperty],
                },
                {
                    ...testState.SideBySideConfigurationGroup,
                    label: "Nested API Actions",
                    identifier: "nested_api_actions",
                    properties: [NestedCollectionProperty],
                },
            ],
            id: "chrome_extension_generator_05", // unique ID for the generator
            documentation: generatorReadme,
            schemaEditorConfiguration: {
                enableAttributeDefaultValue: true,
                documentation: "",
                supportedRelations: [RelationType.TO_ONE, RelationType.TO_MANY],
                supportedDatatypes: [
                    Datatype.STRING,
                    Datatype.DATE,
                    Datatype.DATETIME,
                    Datatype.INTEGER,
                    Datatype.FLOAT,
                    Datatype.STRING_ARRAY,
                ],
                configurationGroups: [
                    new Codotype.ConfigurationGroup({
                        label: "Meta",
                        identifier: "meta",
                        description:
                            "Define additional metadata for this Schema",
                        layoutVariant: GroupLayoutVariant.LIST,
                        properties: [
                            new Codotype.ConfigurationGroupProperty({
                                label: "Internal Note",
                                identifier: "internal_note",
                                description:
                                    "Write an internal note describing this schema",
                                defaultValue: "",
                                type: OptionType.STRING,
                            }),
                        ],
                    }),
                    new Codotype.ConfigurationGroup({
                        label: "API Actions",
                        identifier: "api_actions",
                        description: "Define individual REST api actions.",
                        documentation:
                            "This is documentation for the API Actions configuration group",
                        layoutVariant: GroupLayoutVariant.LIST,
                        properties: [ApiActionsProperty],
                    }),
                    new Codotype.ConfigurationGroup({
                        label: "GraphQL API",
                        identifier: "graphql_api",
                        description:
                            "Configure the GraphQL API for this Schema",
                        layoutVariant: GroupLayoutVariant.LIST,
                        properties: [
                            new Codotype.ConfigurationGroupProperty({
                                type: OptionType.BOOLEAN,
                                defaultValue: true,
                                identifier: "generate_crud_api",
                                label: "Generate CRUD API",
                                description:
                                    "Generate a CRUD API with GraphQL for this resource",
                            }),
                            new Codotype.ConfigurationGroupProperty({
                                label: "DynamoDB table name",
                                identifier: "dynamodb_table_name",
                                description:
                                    "Define the name of the DynamoDB table for this",
                                defaultValue: "",
                                type: OptionType.STRING,
                            }),
                            ApiActionsProperty,
                        ],
                    }),
                ],
                attributeAddons: [
                    ATTRIBUTE_ADDON_UNIQUE,
                    ATTRIBUTE_ADDON_NULLABLE,
                    ATTRIBUTE_ADDON_PRIMARY_KEY,
                    {
                        ...ATTRIBUTE_ADDON_REQUIRED,
                        supportedDatatypes: [
                            Datatype.STRING,
                            Datatype.DATE,
                            Datatype.DATETIME,
                            Datatype.INTEGER,
                            Datatype.FLOAT,
                            Datatype.STRING_ARRAY,
                        ],
                    },
                    {
                        ...ATTRIBUTE_ADDON_REQUIRED,
                        label: "Mock Data",
                        identifier: "mock_data_type",
                        description:
                            "Type of Mockaroo mock data to use for this field",
                        propertyType: OptionType.DROPDOWN,
                        dropdownOptions: [
                            {
                                value: "name",
                                label: "Name",
                                description: "First + Last",
                            },
                            {
                                value: "zipcode",
                                label: "Zipcode",
                                description: "Zipcode",
                            },
                        ],
                        supportedDatatypes: [
                            Datatype.STRING,
                            Datatype.DATE,
                            Datatype.DATETIME,
                            Datatype.INTEGER,
                            Datatype.FLOAT,
                            Datatype.STRING_ARRAY,
                        ],
                    },
                ],
                defaultRelations: [
                    {
                        id: "USER-RELATION-ID",
                        required: true,
                        type: RelationType.TO_ONE,
                        destinationSchemaAlias: "Creator",
                        sourceSchemaAlias: "",
                        source: SchemaSource.GENERATOR,
                        destinationSchemaId: "USER_SCHEMA",
                    },
                ],
                defaultAttributes: [
                    {
                        id: "UUID-Attribute",
                        identifiers: {
                            label: "ID",
                            snake: "id",
                            camel: "id",
                            pascal: "Id",
                            kebab: "id",
                        },
                        addons: {
                            [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: true,
                        },
                        datatype: Datatype.UUID,
                        locked: true,
                        source: SchemaSource.GENERATOR,
                        internalNote: "",
                        defaultValue: null,
                    },
                ],
                defaultSchemas: [
                    {
                        id: "USER_SCHEMA",
                        identifiers: {
                            singular: {
                                label: "User",
                                snake: "user",
                                camel: "user",
                                pascal: "User",
                                kebab: "user",
                            },
                            plural: {
                                label: "Users",
                                snake: "users",
                                camel: "users",
                                pascal: "Users",
                                kebab: "users",
                            },
                        },
                        locked: true,
                        removable: false,
                        source: SchemaSource.GENERATOR,
                        internalNote: "",
                        attributes: [
                            {
                                id: "UUID-Attribute",
                                identifiers: {
                                    label: "ID",
                                    snake: "id",
                                    camel: "id",
                                    pascal: "Id",
                                    kebab: "id",
                                },
                                addons: {
                                    [ATTRIBUTE_ADDON_REQUIRED.identifier]: true,
                                    [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: true,
                                    [ATTRIBUTE_ADDON_UNIQUE.identifier]: true,
                                },
                                datatype: Datatype.STRING,
                                locked: true,
                                source: SchemaSource.GENERATOR,
                                internalNote: "The uniqie ID of the user",
                                defaultValue: null,
                            },
                            {
                                id: "Email-Attribute",
                                identifiers: {
                                    label: "Email",
                                    snake: "email",
                                    camel: "email",
                                    pascal: "Email",
                                    kebab: "email",
                                },
                                addons: {
                                    [ATTRIBUTE_ADDON_REQUIRED.identifier]: true,
                                    [ATTRIBUTE_ADDON_UNIQUE.identifier]: true,
                                },
                                datatype: Datatype.STRING,
                                locked: true,
                                source: SchemaSource.GENERATOR,
                                internalNote: "The email of the user",
                                defaultValue: null,
                            },
                        ],
                        relations: [],
                        configuration: {},
                    },
                ],
            },
        },
    ],
];

// // // //

const storyCollection = storiesOf("Pages/WebRuntime", module);

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        return (
            <Story>
                <WebRuntime generator={story[1]}>
                    {({ generator, project, setProject, clearProject }) => (
                        <RuntimeProvider>
                            {({ generateCode }) => (
                                <React.Fragment>
                                    <ProjectEditor
                                        generator={generator}
                                        project={project}
                                        onClickGenerate={() => {
                                            generateCode({
                                                project,
                                                generator,
                                            });
                                        }}
                                        onResetProject={clearProject}
                                        onChange={(updatedProject: Project) => {
                                            setProject(updatedProject);
                                        }}
                                    />
                                </React.Fragment>
                            )}
                        </RuntimeProvider>
                    )}
                </WebRuntime>
            </Story>
        );
    });
});
